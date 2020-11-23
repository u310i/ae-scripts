import { __Error__ } from "../initialize";
import {
  findLayerWithName,
  findPropertyWithName,
  findItemWithName
} from "./getEntity";
import { createFolderItem } from "../item";
import {
  isCompItem,
  isFolderItem,
  isFootageItem,
  isAVLayer,
  isFileSource,
  isSolidSource,
  isProperty,
  isPropertyGroup,
  isObject,
  isAnyLayer,
  isAnyProperty,
  isMaskPropertyGroup,
  isAnyItem
} from "../typeCheck";
import {} from "../System/fileSys";

// e.g. return [parentFolder, innerFolder, comp]
export const getItemAncestors = (
  item: Item,
  root: FolderItem = app.project.rootFolder,
  ancestors: FolderItem[] = []
): FolderItem[] | null => {
  const parent = item.parentFolder;
  if (parent === root) {
    return ancestors.reverse();
  } else if (parent === app.project.rootFolder) {
    return null;
  } else {
    ancestors.push(parent);
    return getItemAncestors(parent, root, ancestors);
  }
};

export const getItemWithPathArray = (
  pathArray: string[],
  parent: FolderItem = app.project.rootFolder,
  options: {
    createFolder?: boolean;
    stopAtComp?: boolean;
    stopAtFootage?: boolean;
    callback?: (item: $T.ADBE.AnyItem | null, length: number) => void;
  } = {}
): $T.ADBE.AnyItem | null => {
  if (!pathArray || pathArray.length === 0) return null;
  const isTarget = pathArray.length === 1;
  const item = findItemWithName(pathArray[0], parent);
  options.callback && options.callback(item, pathArray.length);
  if (!item) {
    if (options.createFolder) {
      const newFolder = createFolderItem(parent, pathArray[0]);
      if (isTarget) return newFolder;
      return getItemWithPathArray(
        pathArray.slice(1),
        newFolder,
        options
      ) as FolderItem;
    }
    __Error__(
      $.line,
      `getItemWithPathArray / not found item / ${pathArray[0]}`
    );
    return null;
  }
  if (isTarget) return item;
  if (isFolderItem(item))
    return getItemWithPathArray(pathArray.slice(1), item, options);
  if (options.stopAtComp && isCompItem(item)) return item;
  if (options.stopAtFootage && isFootageItem(item)) return item;

  __Error__($.line, `getItemWithPathArray / not processed / ${item.name}`);
  return null;
};

export type Member = $T.ADBE.AnyLayer | $T.ADBE.AnyProperty | null;
export type Members =
  | CompItem
  | $T.ADBE.AnyLayer
  | PropertyGroup
  | MaskPropertyGroup;
export const getLayerOrPropertyWithPathArray = (
  pathArray: string[],
  parent: Members,
  options: {
    stopAtProperty?: boolean;
    callback?: (member: Member, length: number) => void;
  } = {}
): CompItem | Member => {
  if (!pathArray || pathArray.length === 0) return null;
  const isTarget = pathArray.length === 1;
  let member: Member = null;

  if (isCompItem(parent)) {
    member = findLayerWithName(pathArray[0], parent);
  }
  if (
    isAnyLayer(parent) ||
    isPropertyGroup(parent) ||
    isMaskPropertyGroup(parent)
  ) {
    member = findPropertyWithName(pathArray[0], parent);
  }
  options.callback && options.callback(member, pathArray.length);

  if (!member) {
    __Error__(
      $.line,
      `getLayerOrPropertyWithPathArray / not found member / ${pathArray[0]}`
    );
    return null;
  }
  if (isTarget) return member;
  if (options.stopAtProperty && isProperty(member)) return member;
  if (
    isAnyLayer(member) ||
    isPropertyGroup(member) ||
    isMaskPropertyGroup(member)
  ) {
    return getLayerOrPropertyWithPathArray(pathArray.slice(1), member, options);
  }
  return null;
};

type SomethingParent =
  | FolderItem
  | CompItem
  | $T.ADBE.AnyLayer
  | PropertyGroup
  | MaskPropertyGroup;
export const getSomethingWithPathArray = (
  pathArray: string[],
  parent: SomethingParent = app.project.rootFolder
): $T.ADBE.AnyItem | $T.ADBE.AnyLayer | $T.ADBE.AnyProperty | null => {
  if (!pathArray || pathArray.length === 0) return null;
  // const isTarget = pathArray.length === 1;
  if (isFolderItem(parent)) {
    let index: number = 0;
    let item: $T.ADBE.AnyItem | null = null;
    item = getItemWithPathArray(pathArray, parent, {
      stopAtComp: true,
      callback: (item, length) => (index = pathArray.length - length)
    });
    if (!item) {
      __Error__(
        $.line,
        `getSomethingWithPathArray / not found something / ${pathArray[0]}`
      );
      return null;
    }
    const isTarget = index === pathArray.length - 1;
    if (isTarget) return item;
    if (isCompItem(item)) {
      return getLayerOrPropertyWithPathArray(pathArray.slice(index + 1), item);
    }

    return item;
  }
  if (
    isCompItem(parent) ||
    isPropertyGroup(parent) ||
    isMaskPropertyGroup(parent)
  )
    return getLayerOrPropertyWithPathArray(pathArray, parent);
  return null;
};
