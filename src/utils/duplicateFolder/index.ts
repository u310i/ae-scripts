import { isCompItem, isFolderItem, isFootageItem } from "../utils";

import {
  matchSuffixNum,
  getMaxSuffixNumItemName,
  createFoldersWithSuffixNum,
  createFolderStruct,
  createFolderFromStruct,
  replaceLayerIfInside
} from "./utils";

export default (
  sourceFolder: FolderItem,
  options: {
    name?: string;
    copieNum?: number;
    parent?: FolderItem;
  } = {}
): FolderItem[] | undefined => {
  if (!isFolderItem(sourceFolder)) return undefined;
  const copieNum = options.copieNum || 1;
  const parentFolder = options.parent || sourceFolder.parentFolder;

  let newFolders: FolderItem[] | undefined;
  let name = sourceFolder.name;
  let baseName: string;
  if (options.name) {
    baseName = options.name;
  } else {
    const match = matchSuffixNum(name);
    if (!match) return;
    baseName = name.slice(0, match.index).trimEnd();
  }

  const maxNumItemName = getMaxSuffixNumItemName(
    baseName,
    parentFolder,
    isFolderItem
  );
  //  || sourceFolder;

  newFolders = createFoldersWithSuffixNum(
    maxNumItemName,
    parentFolder,
    copieNum
  );

  if (!newFolders) return;
  const struct = createFolderStruct(sourceFolder);

  app.beginUndoGroup("Duplicate Folder");

  // new folderList iterate
  newFolders.forEach(newFolder => {
    const compList: CompItem[] = [];
    createFolderFromStruct(newFolder, struct, {
      av: (parent, item) => {
        if (isCompItem(item)) {
          const newItem = item.duplicate();
          newItem.parentFolder = parent;
          newItem.name = item.name;
          compList.push(newItem);
        } else if (isFootageItem(item)) {
          const file = item.file;
          if (!file) return;
          const importOptions = new ImportOptions(file);
          importOptions.sequence = !item.mainSource.isStill;
          const newItem = app.project.importFile(importOptions) as FootageItem;
          newItem.parentFolder = parent;
          newItem.name = item.name;
        }
      }
    });

    // Memoization
    const memoSourceList: Array<CompItem | FootageItem> = [];
    const memoTargetList: Array<CompItem | FootageItem> = [];
    compList.forEach(comp => {
      replaceLayerIfInside(comp, sourceFolder, newFolder, {
        pre: sourceLayer => {
          memoSourceList.forEach((item, index) => {
            if (sourceLayer.source === item) {
              sourceLayer.replaceSource(memoTargetList[index], false);
              return true;
            }
          });
        },
        after: (sourceItem, targetItem) => {
          const length = memoSourceList.length;
          memoSourceList[length] = sourceItem;
          memoTargetList[length] = targetItem;
        }
      });
    });
    app.endUndoGroup();
  });
  return newFolders;
};
