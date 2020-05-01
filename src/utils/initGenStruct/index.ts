import { times } from "../utils";
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
} from "../getEntity";
import {
  isFolderItem,
  isCompItem,
  isNumber,
  isFootageItem,
  isFileSource
} from "../typeCheck";
import fileSys, {
  importFilesWithName,
  importFile,
  importFileWithName
} from "../fileSys";
import duplicateFolder from "../duplicateFolder";
import constants from "../../constants";
import { genFade } from "../keyframe";

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

export default ($struct: $T.Struct.Struct): void => {
  if (findItemWithName("1_templates") || findItemWithName("2_scene")) {
    $L.error($.line, `initGenStruct / Folder already exists`);
    return;
  }
  const $parts = $struct.parts;
  if ($parts.length === 0) {
    $L.error($.line, `initGenStruct / not exist struct $parts`);
    return;
  }
  const rootFolder = app.project.rootFolder;
  const templatesFolder = createFolderItem(rootFolder, "1_templates");
  const sceneFolder = createFolderItem(rootFolder, "2_scene");

  const compData = $struct.compData;
  const width = compData.width || constants.compData.width;
  const height = compData.height || constants.compData.height;

  const $sceneComp = createCompItem(sceneFolder, {
    width,
    height,
    name: "$" + "scene"
  });

  /**
   * iterate parts
   */
  $parts.forEach(($partStruct, partIndex) => {
    if (!$partStruct.project) {
      $L.error(
        $.line,
        `initGenStruct / not found project / partIndex: ${partIndex}`
      );
      return;
    }
    if ($partStruct.cuts.length === 0) {
      $L.error(
        $.line,
        `initGenStruct / not found cut / project: ${$partStruct.project}`
      );
      return;
    }
    const partName = `part_${partIndex + 1}`;

    const templatePartFolderItem = createFolderItem(templatesFolder, partName);
    const templatePartAEPFolderItem = importFileWithName(
      `${$partStruct.project}.aep`,
      {
        type: "project",
        parent: templatePartFolderItem
      }
    );
    if (!templatePartAEPFolderItem || !isFolderItem(templatePartAEPFolderItem))
      return;

    const scenePartFolderItem = createFolderItem(sceneFolder, partName);
    const $partComp = createCompItem(scenePartFolderItem, {
      width,
      height,
      name: "$" + partName
    });

    /**
     * iterate cuts
     */
    $partStruct.cuts.forEach(($cutStruct, cutIndex) => {
      if (!$cutStruct.name) {
        $L.error(
          $.line,
          `initGenStruct / not found cut name / project: ${$partStruct.project}`
        );
        return;
      }
      const templateMainFolderItem = findFolderItemWithName(
        "main",
        templatePartAEPFolderItem
      );
      if (!templateMainFolderItem) return;

      const templateCutFolderItem = findFolderItemWithName(
        $cutStruct.name,
        templateMainFolderItem
      );
      if (!templateCutFolderItem) return;

      const _sceneCutFolderItems = duplicateFolder(templateCutFolderItem, {
        suffix: false,
        parent: scenePartFolderItem
      });
      if (!_sceneCutFolderItems || !isFolderItem(_sceneCutFolderItems[0])) {
        $L.error(
          $.line,
          `initGenStruct / not found _sceneCutFolderItems / cut name: ${$cutStruct.name}`
        );
        return;
      }
      const sceneCutFolderItem = _sceneCutFolderItems[0];
      sceneCutFolderItem.name = `${cutIndex + 1}_${sceneCutFolderItem.name}`;

      const sceneCutMainComp = findCompItemWithName("main", sceneCutFolderItem);
      if (!sceneCutMainComp) return;

      /**
       * inject cut layer to part comp
       */
      const cutMainLayer = $partComp.layers.add(sceneCutMainComp);
      cutMainLayer.name = cutIndex + 1 + "_" + $cutStruct.name;

      createFade($cutStruct.fade, cutMainLayer);

      const replaceFolderItem = findFolderItemWithName(
        "replace",
        sceneCutFolderItem
      );
      if (!replaceFolderItem) return;
      const imagesFolderItem = findFolderItemWithName(
        "images",
        replaceFolderItem
      );
      if (!imagesFolderItem) return;

      const $replaceObj = $cutStruct.replace;

      if ($replaceObj.images.length !== imagesFolderItem.numItems) {
        $L.error(
          $.line,
          `initGenStruct / not match number cutFolder's images and replaceObj's images / cut name: ${$cutStruct.name}`
        );
        return;
      }

      const replaceTargetImagesFolder = fileSys.getExistingFolder(
        "replace/images"
      );
      if (!replaceTargetImagesFolder) return;
      const replaceTargetList = fileSys.getFolderContents(
        replaceTargetImagesFolder
      );
      if (!replaceTargetList || replaceTargetList.length === 0) {
        $L.error(
          $.line,
          `initGenStruct / not found image replaceTargetList /  / name: ${$cutStruct.name}`
        );
        return;
      }

      /**
       * iterate imageFolder
       */
      getItems(imagesFolderItem).forEach((item, index) => {
        if (!isFootageItem(item) || !isFileSource(item.mainSource)) {
          $L.error(
            $.line,
            `initGenStruct / imagesFolderItem's item is not found / name: ${item.name}`
          );
          return;
        }

        const newImageIndex = parseInt(item.name);
        if (!isNumber(newImageIndex)) {
          $L.error(
            $.line,
            `initGenStruct / imagesFolderItem's image name is not number / name: ${item.name}`
          );
          return;
        }
        const $replaceImageObj = $replaceObj.images[newImageIndex - 1];
        if (!$replaceImageObj) {
          $L.error(
            $.line,
            `initGenStruct / not found image name from replaceObj / name: ${item.name}`
          );
          return;
        }

        const replaceTarget = replaceTargetList.find(
          fileOrFolder => fileOrFolder.name === $replaceImageObj.name
        );
        if (replaceTarget === undefined) {
          $L.error(
            $.line,
            `initGenStruct / not found image replaceTarget / name: ${item.name}`
          );
          return;
        }
        if (fileSys.isFolder(replaceTarget)) {
          const innerFileAndFolderList = replaceTarget.getFiles();
          if (innerFileAndFolderList.length !== 0) {
            const innerFileAndFolder = innerFileAndFolderList[0];
            if (fileSys.isFile(innerFileAndFolder)) {
              item.replaceWithSequence(innerFileAndFolder, false);
            }
          }
        } else {
          item.replace(replaceTarget);
        }
      }); // iterate imageFolder
    }); // iterate cuts

    sequenceLayers($partComp, {
      fromBottom: true,
      injectStartBlank: (index, length) => {
        return $partStruct.cuts[index].startBlank;
      }
    });
    $partComp.duration = $partComp.layer(1).outPoint;
    const partLayer = $sceneComp.layers.add($partComp);
    createFade($partStruct.fade, partLayer);
  }); // iterate parts

  sequenceLayers($sceneComp, {
    fromBottom: true,
    injectStartBlank: (index, length) => {
      return $struct.parts[index].startBlank;
    }
  });
  $sceneComp.duration = $sceneComp.layer(1).outPoint;

  const $containerComp = createCompItem(sceneFolder, {
    width,
    height,
    name: "$container"
  });

  const sceneLayer = $containerComp.layers.add($sceneComp);
  sceneLayer.startTime = $struct.startBlank || 0;
  const duration = sceneLayer.outPoint + ($struct.endBlank || 0);
  $containerComp.duration = duration;

  createFade($struct.fade, sceneLayer);

  const bgLayer = $containerComp.layers.addSolid(
    compData.backgroundColor || constants.colors.black,
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
