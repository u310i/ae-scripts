import {
  isCompItem,
  isFolderItem,
  isFootageItem,
  isObject,
  times,
  findItem,
  getItemFromPathArr
} from "../utils";

export const matchSuffixNum = (str: string): RegExpMatchArray | null => {
  return str.match(/[0-9]*$/);
};

export const getMaxSuffixNumItemName = (
  matchName: string,
  parent: FolderItem,
  typeChecker: (item: Item) => boolean
): string => {
  let maxNum: number | undefined;
  let maxNumItemName: string | undefined = matchName;

  times(parent.numItems, i => {
    const item = parent.item(i);

    if (!typeChecker(item)) return;

    const regexp = new RegExp("^" + matchName + "\\s*[0-9]*$");
    if (!regexp.test(item.name)) return;

    const matchArr = matchSuffixNum(item.name);
    if (!matchArr) return;

    const suffixStr = matchArr[0];
    if (suffixStr === "") {
      maxNum = 0;
      maxNumItemName = matchName;
      return;
    }

    const suffixNum = parseInt(suffixStr, 10);
    if (maxNum === undefined) {
      maxNum = suffixNum;
      maxNumItemName = item.name;
      return;
    }
    if (suffixNum > maxNum) {
      maxNum = suffixNum;
      maxNumItemName = item.name;
    }
  });

  return maxNumItemName;
};

export const createFoldersWithSuffixNum = (
  name: string,
  parent: FolderItem,
  number: number
): FolderItem[] | undefined => {
  const match = matchSuffixNum(name);
  if (!match) return;

  const newFolders: FolderItem[] = [];
  times(number, i => {
    let newFolderName: string;
    if (match[0] === "") {
      newFolderName = name + i;
    } else {
      const baseName = name.slice(0, match.index);
      const suffixNumStr = match[0];
      const suffixNum = parseInt(suffixNumStr, 10);
      newFolderName = baseName + (suffixNum + i);
    }
    newFolders.push(parent.items.addFolder(newFolderName));
  });
  return newFolders;
};

type FolderStructType = {
  [key: string]: Item | FolderStructType;
};

export const createFolderStruct = (root: FolderItem): FolderStructType => {
  const struct: FolderStructType = {};
  times(root.numItems, i => {
    const item = root.item(i);
    if (isFolderItem(item)) {
      struct[item.name] = createFolderStruct(item);
    } else {
      struct[item.name] = item;
    }
  });
  return struct;
};

export const createFolderFromStruct = (
  parent: FolderItem,
  struct: FolderStructType,
  callbacks: {
    av?: (parent: FolderItem, item: Item) => void;
    folder?: (parent: FolderItem) => void;
  } = {}
): void => {
  Object.keys(struct).forEach(key => {
    const item = struct[key];
    if (!(item instanceof FolderItem) && !isObject(item)) {
      callbacks.av && callbacks.av(parent, item as any);
    } else {
      const newFolder = parent.items.addFolder(key);
      createFolderFromStruct(newFolder, item as any, callbacks);
      callbacks.folder && callbacks.folder(newFolder);
    }
  });
};

export const existInsideFolder = (
  item: Item,
  root: FolderItem,
  callback?: (parent: FolderItem) => void
): boolean => {
  const parent = item.parentFolder;
  if (parent === root) {
    return true;
  } else if (parent === app.project.rootFolder) {
    return false;
  } else {
    callback && callback(parent);
    return existInsideFolder(parent, root);
  }
};

export const replaceLayerIfInside = (
  comp: CompItem,
  sourceFolder: FolderItem,
  targetFolder: FolderItem,
  callbacks: {
    pre?: (sourceLayer: AVLayer) => boolean | void;
    after?: (sourceItem: Item, targetItem: Item) => void;
  } = {}
): void => {
  // new comp's layer iterate
  times(comp.numLayers, i => {
    const layer = comp.layer(i);
    if (
      layer instanceof AVLayer &&
      (layer.source instanceof CompItem || layer.source instanceof FootageItem)
    ) {
      if (callbacks.pre && callbacks.pre(layer)) return true;

      const pathArr: string[] = [];
      // 置き換え前のcompLayerのソースがsourceFolderの中に存在するかどうかをチェック
      const willReplace = existInsideFolder(
        layer.source,
        // sourceFolder is sourse folder
        sourceFolder,
        parent => {
          pathArr.push(parent.name);
        }
      );
      if (willReplace) {
        pathArr.reverse().push(layer.source.name);
        // ["parentFolder", "innerFolder", "comp"]
        const targetItem = getItemFromPathArr(pathArr, targetFolder) as
          | CompItem
          | FootageItem;
        if (!targetItem) {
          return;
        }
        // 作成したコンポジションのレイヤーがフォルダー内のものであれば置き換え
        layer.replaceSource(targetItem, false);

        callbacks.after && callbacks.after(layer.source, targetItem);
      }
    }
  });
};
