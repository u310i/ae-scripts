import { __Error__ } from "../initialize";
import { times } from "../Javascript/general";
import { getItems, getLayers } from "../GetEntity/getEntity";
import { getItemAncestorsName } from "../GetEntity/getEntityWithPath";
import { getItemWithPathArray } from "../GetEntity/getEntityWithPathArray";
import { createFolderItem } from "../item";
import {
  isCompItem,
  isFolderItem,
  isFootageItem,
  isAVLayer,
  isObject,
  isFileSource,
  isSolidSource
} from "../typeCheck";

export const deepCompCopy = (
  comp: CompItem,
  replaceLayers?: AVLayer[]
): undefined => {
  if (!isCompItem(comp)) {
    __Error__($.line, "deepCompCopy");
    return;
  }

  const newComp = comp.duplicate();

  if (replaceLayers) {
    replaceLayers.forEach(layer => {
      layer.replaceSource(newComp, false);
    });
  }

  const replaceLayerLists = [] as { comp: CompItem; layers: AVLayer[] }[];

  getLayers(newComp).forEach((layer, index) => {
    if (isAVLayer(layer) && layer.source && layer.source instanceof CompItem) {
      const currentComp = layer.source;
      const compIndex = replaceLayerLists.findIndex(
        set => set.comp === currentComp
      );

      if (compIndex === -1) {
        replaceLayerLists.push({
          comp: currentComp,
          layers: [layer]
        });
      } else {
        replaceLayerLists[compIndex].layers.push(layer);
      }
    }
  });

  replaceLayerLists.forEach(set => {
    deepCompCopy(set.comp, set.layers);
  });
};

export type FolderStructType = {
  [key: string]: CompItem | FootageItem | FolderStructType | FolderItem;
};

export const createFolderStruct = (
  parent: FolderItem = app.project.rootFolder,
  appendFolder: boolean = false
): FolderStructType => {
  const struct: FolderStructType = {};

  getItems(parent).forEach(item => {
    if (appendFolder) struct["$$parent"] = parent;
    if (isFolderItem(item)) {
      struct[item.name] = createFolderStruct(item);
    } else {
      struct[item.name] = item;
    }
  });

  return struct;
};

// const struct = createFolderStruct(app.project.rootFolder, true);
// alert(JSON.stringify(visualizeStruct(struct), null, "  "));
type VisualizeStruct = { [key: string]: string | VisualizeStruct };
export const visualizeStruct = (struct: FolderStructType): VisualizeStruct => {
  const vizStruct: VisualizeStruct = {};
  Object.keys(struct).forEach(key => {
    const item = struct[key];
    if (key === "$$parent") return;
    if (isFootageItem(item)) {
      if (isFileSource(item.mainSource)) {
        vizStruct[key] = `footage / file`;
      } else if (isSolidSource(item.mainSource)) {
        vizStruct[key] = `footage / solid`;
      } else {
        vizStruct[key] = `footage / not file or solid`;
      }
    } else if (isCompItem(item)) {
      vizStruct[key] = `comp`;
    } else if (isObject(item) && !isFolderItem(item)) {
      vizStruct[key] = visualizeStruct(item);
    }
  });
  return vizStruct;
};

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
      __Error__($.line, "getMaxSuffixNumItemName");
      return;
    }

    const matchArr = matchSuffixNum(item.name);
    if (!matchArr) {
      __Error__($.line, "getMaxSuffixNumItemName");
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
  options: {
    parent?: FolderItem;
    number?: number;
    suffix?: boolean;
    comment?: string;
  } = {}
): FolderItem[] | undefined => {
  const match = matchSuffixNum(name);
  if (!match) {
    __Error__($.line, "createFoldersWithSuffixNum");
    return;
  }
  const parent = options.parent || app.project.rootFolder;
  const number = options.number || 1;
  const suffix = options.suffix || true;
  const comment = options.comment || "";

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
    const newFolder = createFolderItem(parent, newFolderName);
    if (comment) newFolder.comment = comment;
    newFolders.push(newFolder);
  });
  return newFolders;
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
          __Error__($.line, "replaceLayerIfInsideTarget / not found newSource");
          return;
        }

        callbacks.after && callbacks.after(layer.source, newSource);
        // 作成したコンポジションのレイヤーがフォルダー内のものであれば置き換え
        layer.replaceSource(newSource, false);
      }
    }
  });
};
