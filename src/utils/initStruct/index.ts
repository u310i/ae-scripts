import { __Error__ } from "../initialize";
import { times } from "../Javascript/general";
import { sequenceLayers } from "../layer";
import { createCompItem, createFolderItem } from "../item";
import {
  getItems,
  getLayers,
  findItemWithName,
  findCompItemWithName,
  findFolderItemWithName,
  findLayerWithName,
  findPropertyWithName
} from "../GetEntity/getEntity";
import {
  isFolderItem,
  isCompItem,
  isNumber,
  isFootageItem,
  isFileSource
} from "../typeCheck";
import {
  importFSFilesWithName,
  importFSFile,
  importFSFileWithName,
  isFSFolder,
  isFSFile,
  getExistingFSFolder,
  getFSFolderContents
} from "../System/fileSys";
import duplicateFolder from "../DuplicateFolder";
import constants from "../../constants";
import { genFade } from "../keyframe";

// import struct from "./struct";
// initGenStruct(struct);

const createFade = (
  fadeObj:
    | { in?: { duration: number }; out?: { duration: number } }
    | undefined,
  layer: $T.ADBE.AnyLayer
) => {
  if (fadeObj) {
    if (fadeObj.in) {
      genFade(layer, "in", fadeObj.in.duration);
    }
    if (fadeObj.out) {
      genFade(layer, "out", fadeObj.out.duration);
    }
  }
};

const templateRootName = "1_templates";
const sceneRootName = "2_scene";

export default ($$struct: $T.Struct.Struct): void => {
  if (findItemWithName(templateRootName) || findItemWithName(sceneRootName)) {
    __Error__($.line, `initGenStruct / Folder already exists`);
    return;
  }
  const $$partsStruct = $$struct.parts;
  if ($$partsStruct.length === 0) {
    __Error__($.line, `initGenStruct / not exist struct $$partsStruct`);
    return;
  }

  const rootFolder = app.project.rootFolder;
  const templatesFolder = createFolderItem(rootFolder, templateRootName);
  const sceneFolder = createFolderItem(rootFolder, sceneRootName);

  const $$compData = $$struct.compData;
  const width = $$compData.width || constants.compData.width;
  const height = $$compData.height || constants.compData.height;

  const $sceneComp = createCompItem(sceneFolder, {
    width,
    height,
    name: "$" + "scene"
  });

  /**
   * iterate parts
   */
  $$partsStruct.forEach(($$partStruct, partIndex) => {
    if (!$$partStruct.project) {
      __Error__(
        $.line,
        `initGenStruct / not found project / partIndex: ${partIndex}`
      );
      return;
    }
    if ($$partStruct.cuts.length === 0) {
      __Error__(
        $.line,
        `initGenStruct / not found cut / project: ${$$partStruct.project}`
      );
      return;
    }
    const partName = `part_${partIndex + 1}`;

    const templatePartFolder = createFolderItem(templatesFolder, partName);
    const projectName = `${$$partStruct.project}.aep`;
    const templatePartAEPFolder = importFSFileWithName(projectName, {
      type: "project",
      parent: templatePartFolder
    });
    if (!templatePartAEPFolder || !isFolderItem(templatePartAEPFolder)) return;

    const partCompName = "$" + partName;
    const newPartFolder = createFolderItem(sceneFolder, partName);
    const $partComp = createCompItem(newPartFolder, {
      width,
      height,
      name: partCompName
    });

    /**
     * iterate cuts
     */
    $$partStruct.cuts.forEach(($$cutStruct, cutIndex) => {
      if (!$$cutStruct.name) {
        __Error__(
          $.line,
          `initGenStruct / not found cut name / project: ${$$partStruct.project}`
        );
        return;
      }
      const templateMainFolder = findFolderItemWithName(
        "main",
        templatePartAEPFolder
      );
      if (!templateMainFolder) return;

      const templateCutFolder = findFolderItemWithName(
        $$cutStruct.name,
        templateMainFolder
      );
      if (!templateCutFolder) return;

      const _newCutFolders = duplicateFolder(templateCutFolder, {
        suffix: false,
        parent: newPartFolder
      });
      if (!_newCutFolders || !isFolderItem(_newCutFolders[0])) {
        __Error__(
          $.line,
          `initGenStruct / not found _newCutFolders / cut name: ${$$cutStruct.name}`
        );
        return;
      }
      const newCutFolder = _newCutFolders[0];
      newCutFolder.name = `${cutIndex + 1}_${newCutFolder.name}`;

      const sceneCutMainComp = findCompItemWithName("main", newCutFolder);
      if (!sceneCutMainComp) return;

      /**
       * inject cut layer to part comp
       */
      const cutMainLayer = $partComp.layers.add(sceneCutMainComp);
      cutMainLayer.name = cutIndex + 1 + "_" + $$cutStruct.name;

      createFade($$cutStruct.fade, cutMainLayer);

      const replaceSourceFolder = findFolderItemWithName(
        "replace",
        newCutFolder
      );
      if (!replaceSourceFolder) return;
      const replaceSourceImagesFolder = findFolderItemWithName(
        "images",
        replaceSourceFolder
      );
      if (!replaceSourceImagesFolder) return;

      const $$replaceStruct = $$cutStruct.replace;

      if (
        $$replaceStruct.images.length !== replaceSourceImagesFolder.numItems
      ) {
        __Error__(
          $.line,
          `initGenStruct / number is not match images of cutFolder and replaceStruct / cut name: ${$$cutStruct.name}`
        );
        return;
      }

      const replaceTargetImageFSFolder = getExistingFSFolder("replace/images");
      if (!replaceTargetImageFSFolder) return;
      const replaceTargetImageFSFiles = getFSFolderContents(
        replaceTargetImageFSFolder
      );
      if (
        !replaceTargetImageFSFiles ||
        replaceTargetImageFSFiles.length === 0
      ) {
        __Error__(
          $.line,
          `initGenStruct / not found image replaceTargetImageFSFiles /  / name: ${$$cutStruct.name}`
        );
        return;
      }

      /**
       * iterate imageFolder
       */
      getItems(replaceSourceImagesFolder).forEach((item, index) => {
        if (!isFootageItem(item) || !isFileSource(item.mainSource)) {
          __Error__(
            $.line,
            `initGenStruct / item is not found on replaceSourceImagesFolder / name: ${item.name}`
          );
          return;
        }

        const newImageIndex = parseInt(item.comment);
        if (!isNumber(newImageIndex)) {
          __Error__(
            $.line,
            `initGenStruct / image name is not number on replaceSourceImagesFolder / name: ${item.name}`
          );
          return;
        }
        const $replaceImageObj = $$replaceStruct.images[newImageIndex - 1];
        if (!$replaceImageObj || !$replaceImageObj.name) {
          __Error__(
            $.line,
            `initGenStruct / not found image name from replaceObj / name: ${item.name}`
          );
          return;
        }

        const replaceTargetImageFSFile = replaceTargetImageFSFiles.find(
          fileOrFolder => fileOrFolder.name === $replaceImageObj.name
        );
        if (replaceTargetImageFSFile === undefined) {
          __Error__(
            $.line,
            `initGenStruct / not found image replaceTargetImageFSFile / name: ${item.name}`
          );
          return;
        }
        if (isFSFolder(replaceTargetImageFSFile)) {
          const innerFSFiles = replaceTargetImageFSFile.getFiles();
          if (innerFSFiles.length !== 0) {
            const innerFSFile = innerFSFiles[0];
            if (isFSFile(innerFSFile)) {
              item.replaceWithSequence(innerFSFile, false);
            }
          }
        } else {
          item.replace(replaceTargetImageFSFile);
        }
      }); // iterate imageFolder
    }); // iterate cuts

    sequenceLayers($partComp, {
      fromBottom: true,
      injectStartBlank: (index, length) => {
        return $$partStruct.cuts[index].startBlank;
      }
    });
    $partComp.duration = $partComp.layer(1).outPoint;
    const partLayer = $sceneComp.layers.add($partComp);
    createFade($$partStruct.fade, partLayer);
  }); // iterate parts

  sequenceLayers($sceneComp, {
    fromBottom: true,
    injectStartBlank: (index, length) => {
      return $$struct.parts[index].startBlank;
    }
  });
  $sceneComp.duration = $sceneComp.layer(1).outPoint;

  const $containerComp = createCompItem(sceneFolder, {
    width,
    height,
    name: "$container"
  });

  const sceneLayer = $containerComp.layers.add($sceneComp);
  sceneLayer.startTime = $$struct.startBlank || 0;
  const duration = sceneLayer.outPoint + ($$struct.endBlank || 0);
  $containerComp.duration = duration;

  createFade($$struct.fade, sceneLayer);

  const bgLayer = $containerComp.layers.addSolid(
    $$compData.backgroundColor || constants.colors.black,
    "background",
    width,
    height,
    constants.compData.pixelAspect,
    duration
  );
  bgLayer.moveToEnd();

  const $rootComp = createCompItem(app.project.rootFolder, {
    width,
    height,
    name: "$root"
  });
  const rootCompLayer = $rootComp.layers.add($containerComp);
  $rootComp.duration = rootCompLayer.outPoint;
};
