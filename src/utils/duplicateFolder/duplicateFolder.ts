import { isCompItem, isFolderItem, isFootageItem } from "../utils";

// duplicateFolder(app.project.item(2) as FolderItem, {
//   name: "test",
//   copieNum: 1,
//   parent: app.project.item(10) as FolderItem
// });
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
        let newItem;
        if (isCompItem(item)) {
          newItem = item.duplicate();
          compList.push(newItem);
        }
        if (isFootageItem(item)) {
          if (item.mainSource instanceof FileSource) {
            const file = item.file;
            if (!file) return;
            const importOptions = new ImportOptions(file);
            importOptions.sequence = !item.mainSource.isStill;
            newItem = app.project.importFile(importOptions) as FootageItem;
          }
          if (item.mainSource instanceof SolidSource) {
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
          }
        }

        if (!newItem) return;
        newItem.parentFolder = parent;
        newItem.name = item.name;
      }
    });

    // Memoization
    const memoSourceList: Array<AVItem> = [];
    const memoTargetList: Array<AVItem> = [];
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
          memoSourceList[length] = sourceItem as any;
          memoTargetList[length] = targetItem as any;
        }
      });
    });
    app.endUndoGroup();
  });
  return newFolders;
};
