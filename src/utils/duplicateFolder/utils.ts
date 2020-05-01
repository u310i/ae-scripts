import { times } from "../utils";
import { getItems, getLayers } from "../getEntity";
import { getItemAncestorsName } from "../getEntityWithPath";
import { getItemWithPathArray } from "../getEntityWithPathArray";
import { createFolderItem } from "../item";
import {
  isCompItem,
  isFolderItem,
  isFootageItem,
  isAVLayer,
  isObject
} from "../typeCheck";

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

  getItems(parent).forEach(item => {
    if (!typeChecker(item)) return;

    const regexp = new RegExp("^" + matchName + "\\s*[0-9]*$");
    if (!regexp.test(item.name)) {
      $L.error($.line, "getMaxSuffixNumItemName");
      return;
    }

    const matchArr = matchSuffixNum(item.name);
    if (!matchArr) {
      $L.error($.line, "getMaxSuffixNumItemName");
      return;
    }

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
  number: number,
  suffix: boolean = true
): FolderItem[] | undefined => {
  const match = matchSuffixNum(name);
  if (!match) {
    $L.error($.line, "createFoldersWithSuffixNum");
    return;
  }

  const newFolders: FolderItem[] = [];
  times(number, i => {
    let newFolderName: string;
    if (match[0] === "") {
      newFolderName = suffix ? name + i : name;
    } else {
      const baseName = name.slice(0, match.index);
      const suffixNumStr = match[0];
      const suffixNum = parseInt(suffixNumStr, 10);
      newFolderName = suffix ? baseName + (suffixNum + i) : baseName;
    }
    newFolders.push(createFolderItem(parent, newFolderName));
  });
  return newFolders;
};

type FolderStructType = {
  [key: string]: CompItem | FootageItem | FolderStructType;
};

export const createFolderStruct = (root: FolderItem): FolderStructType => {
  const struct: FolderStructType = {};

  getItems(root).forEach(item => {
    if (isFolderItem(item)) {
      struct[item.name] = createFolderStruct(item);
    } else {
      struct[item.name] = item;
    }
  });

  return struct;
};

type FolderStructTypeTest = {
  [key: string]: string | FolderStructTypeTest;
};
export const createFolderStructTest = (
  root: FolderItem
): FolderStructTypeTest => {
  const struct: FolderStructTypeTest = {};
  getItems(root).forEach(item => {
    if (isFolderItem(item)) {
      struct[item.name] = createFolderStructTest(item);
    } else {
      struct[item.name] = isCompItem(item)
        ? "comp"
        : isFootageItem(item)
        ? "footage"
        : "err";
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
    if (!isFolderItem(item) && !isObject(item)) {
      callbacks.av && callbacks.av(parent, item as any);
    } else {
      const newFolder = createFolderItem(parent, key);
      createFolderFromStruct(newFolder, item as any, callbacks);
      callbacks.folder && callbacks.folder(newFolder);
    }
  });
};

type AVItem = CompItem | FootageItem;
export const replaceLayerIfInsideTarget = (
  comp: CompItem,
  sourceFolder: FolderItem,
  targetFolder: FolderItem,
  callbacks: {
    pre?: (sourceLayer: AVLayer) => boolean | void;
    after?: (sourceItem: AVItem, newSource: AVItem) => void;
  } = {}
): void => {
  // new comp's layer iterate
  getLayers(comp).forEach(layer => {
    if (
      isAVLayer(layer) &&
      (isCompItem(layer.source) || isFootageItem(layer.source))
    ) {
      if (callbacks.pre && callbacks.pre(layer)) {
        return;
      }
      const itemAncestorsNameList = getItemAncestorsName(
        layer.source,
        sourceFolder
      );

      if (itemAncestorsNameList) {
        itemAncestorsNameList.push(layer.source.name);
        // alert(itemAncestorsNameList.join(" / "));
        const newSource = getItemWithPathArray(
          itemAncestorsNameList,
          targetFolder
        ) as AVItem;
        if (!newSource) {
          $L.error($.line, "replaceLayerIfInsideTarget / not found newSource");
          return;
        }

        callbacks.after && callbacks.after(layer.source, newSource);
        // 作成したコンポジションのレイヤーがフォルダー内のものであれば置き換え
        layer.replaceSource(newSource, false);
      }
    }
  });
};
