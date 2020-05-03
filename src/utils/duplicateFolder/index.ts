import {
  isCompItem,
  isFolderItem,
  isFootageItem,
  isFileSource,
  isSolidSource
} from "../typeCheck";

import { importFSFile } from "../fileSys";

import {
  matchSuffixNum,
  getMaxSuffixNumItemName,
  createFoldersWithSuffixNum,
  createFolderFromStruct,
  replaceLayerIfInsideTarget
} from "./utils";

import { createFolderStruct } from "../item";

// duplicateFolder(app.project.item(2) as FolderItem, {
//   name: "test",
//   copieNum: 1,
//   parent: app.project.item(10) as FolderItem
// });

const errorName = "duplicateFolder";

export default (
  sourceFolder: FolderItem,
  options: {
    name?: string;
    copieNum?: number;
    parent?: FolderItem;
    suffix?: boolean;
  } = {}
): FolderItem[] | undefined => {
  if (!isFolderItem(sourceFolder)) {
    $L.error($.line, `${errorName} / not found sourceFolder`);
    return undefined;
  }
  const copieNum = options.copieNum || 1;
  const parentFolder = options.parent || sourceFolder.parentFolder;

  let newRootFolders: FolderItem[] | undefined;
  let name = sourceFolder.name;
  const comment = sourceFolder.comment;
  let baseName: string;
  if (options.name) {
    baseName = options.name;
  } else {
    if (options.suffix) {
      const match = matchSuffixNum(name);
      if (!match) {
        $L.error($.line, `${errorName} / not match matchSuffixNum(name)`);
        return;
      }
      baseName = name.slice(0, match.index).trimEnd();
    } else {
      baseName = name;
    }
  }

  let maxNumItemName: string = baseName;
  if (options.suffix) {
    maxNumItemName = getMaxSuffixNumItemName(
      baseName,
      parentFolder,
      isFolderItem
    );
  }

  newRootFolders = createFoldersWithSuffixNum(maxNumItemName, {
    parent: parentFolder,
    number: copieNum,
    suffix: options.suffix,
    comment
  });

  if (!newRootFolders) {
    $L.error($.line, `${errorName} / not found newRootFolders`);
    return;
  }
  const struct = createFolderStruct(sourceFolder);

  $I.undo && app.beginUndoGroup("Duplicate Folder");

  // new folderList iterate
  newRootFolders.forEach(newFolder => {
    const compList: CompItem[] = [];
    createFolderFromStruct(newFolder, struct, {
      av: (parent, item) => {
        let newItem;
        if (isCompItem(item)) {
          newItem = item.duplicate();
          compList.push(newItem);
        }
        if (isFootageItem(item)) {
          if (isFileSource(item.mainSource)) {
            const file = item.mainSource.file;
            if (!file.exists) {
              $L.error($.line, `${errorName} / not found file`);
              return;
            }
            newItem = importFSFile(file, {
              type: "footage",
              sequence: !item.mainSource.isStill
            });
            if (!newItem) return;
            newItem.comment = item.comment;
          }
          if (isSolidSource(item.mainSource)) {
            const solidData = {
              color: item.mainSource.color,
              name: item.name,
              width: item.width,
              height: item.height
            };
            newItem = app.project.importPlaceholder(
              "placeholderTempName",
              4,
              4,
              30.0,
              1.0
            );
            newItem.replaceWithSolid(
              solidData.color,
              "solidTempName",
              solidData.width,
              solidData.height,
              1.0
            );
            newItem.comment = item.comment;
          }
        }

        if (!newItem) {
          $L.error($.line, `${errorName} / `);
          return;
        }
        newItem.parentFolder = parent;
        newItem.name = item.name;
      }
    });

    // Memoization
    type AVItem = CompItem | FootageItem;
    const memoList: { source: AVItem; target: AVItem }[] = [];

    compList.forEach(comp => {
      replaceLayerIfInsideTarget(comp, sourceFolder, newFolder, {
        pre: layer => {
          return memoList.some(set => {
            if (layer.source === set.source) {
              layer.replaceSource(set.target, false);
              return true;
            }
          });
        },
        after: (source, target) => {
          memoList.push({ source, target });
        }
      });
    });
    $I.undo && app.endUndoGroup();
  });
  return newRootFolders;
};
