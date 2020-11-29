import "../../polyfill/array/some";
import { __Error__ } from "../initialize";
import { times } from "../Javascript/general";
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
  isAnyItem,
  isTextLayer,
  isShapeLayer
} from "../typeCheck";
import {} from "../System/fileSys";

export const getActiveItem = (): $T.ADBE.AnyItem | null => {
  const item = app.project.activeItem;
  return (item as $T.ADBE.AnyItem) || null;
};

export const getActiveCompItem = (): CompItem | null => {
  const item = getActiveItem();
  return item instanceof CompItem ? item : null;
};

export const getChildItems = (
  folder: FolderItem = app.project.rootFolder,
  callback?: (item: $T.ADBE.AnyItem) => boolean
): $T.ADBE.AnyItem[] => {
  const items: $T.ADBE.AnyItem[] = [];
  times(folder.numItems, index => {
    const item = folder.item(index) as $T.ADBE.AnyItem;
    if (callback && !callback(item)) return;
    items.push(item);
  });
  return items;
};

export const getChildItem = (
  folder: FolderItem = app.project.rootFolder,
  callback: (item: $T.ADBE.AnyItem) => boolean
): $T.ADBE.AnyItem | null => {
  let item: $T.ADBE.AnyItem | null = null;
  times(folder.numItems, index => {
    const target = folder.item(index) as $T.ADBE.AnyItem;
    if (callback && !callback(target)) return;
    item = target;
    return true;
  });
  return item;
};

export const findItemWithName = (
  name: string,
  parent: FolderItem = app.project.rootFolder
): $T.ADBE.AnyItem | null => {
  let item: $T.ADBE.AnyItem | null = null;
  getChildItems(parent).some(current => {
    if (current.name === name) {
      item = current;
      return true;
    }
    return false;
  });
  return item;
};

export const findFolderItemWithName = (
  name: string,
  parent: FolderItem = app.project.rootFolder
): FolderItem | null => {
  const item = findItemWithName(name, parent);
  if (!isFolderItem(item)) {
    __Error__(
      $.line,
      `findFolderItemWithName / not found FolderItem / name: ${name} / parent: ${
        parent.name
      } / item: ${item ? item.name : "null"}`
    );
    return null;
  }
  return item;
};

export const findCompItemWithName = (
  name: string,
  parent: FolderItem = app.project.rootFolder
): CompItem | null => {
  const item = findItemWithName(name, parent);
  if (!isCompItem(item)) {
    __Error__(
      $.line,
      `findCompItemWithName / not found CompItem / name: ${name} / parent: ${
        parent.name
      } / item: ${item ? item.name : "null"}`
    );
    return null;
  }
  return item;
};

export const findFootageItemWithName = (
  name: string,
  parent: FolderItem = app.project.rootFolder
): FootageItem | null => {
  const item = findItemWithName(name, parent);
  if (!isFootageItem(item)) {
    __Error__(
      $.line,
      `findFootageItemWithName / not found FootageItem / name: ${name} / parent: ${
        parent.name
      } / item: ${item ? item.name : "null"}`
    );
    return null;
  }
  return item;
};

export const findLayerWithName = (
  name: string,
  comp: CompItem
): $T.ADBE.AnyLayer | null => {
  const layer = comp.layer(name) as $T.ADBE.AnyLayer | null;
  return layer ? layer : null;
};

export const findAVLayerWithName = (
  name: string,
  comp: CompItem
): AVLayer | null => {
  const layer = findLayerWithName(name, comp);
  if (!isAVLayer(layer)) {
    __Error__(
      $.line,
      `findAVLayerWithName / not found AVLayer / name: ${name} / comp: ${
        comp.name
      } / layer: ${layer ? layer.name : "null"}`
    );
    return null;
  }
  return layer;
};

export const findTextLayerWithName = (
  name: string,
  comp: CompItem
): TextLayer | null => {
  const layer = findLayerWithName(name, comp);
  if (!isTextLayer(layer)) {
    __Error__(
      $.line,
      `findTextLayerWithName / not found TextLayer / name: ${name} / comp: ${
        comp.name
      } / layer: ${layer ? layer.name : "null"}`
    );
    return null;
  }
  return layer;
};

export const findPropertyWithName = (
  name: string,
  parent: $T.ADBE.AnyLayer | PropertyGroup | MaskPropertyGroup
): $T.ADBE.AnyProperty | null => {
  const property = parent.property(name) as $T.ADBE.AnyProperty | null;
  return property ? property : null;
};

export const getLayers = (
  comp: CompItem,
  options: {
    fromBottom?: boolean;
    callback?: (layer: $T.ADBE.AnyLayer) => boolean;
  } = {}
): $T.ADBE.AnyLayer[] => {
  const layers: $T.ADBE.AnyLayer[] = [];
  times(comp.numLayers, index => {
    const layer = comp.layer(index) as $T.ADBE.AnyLayer;
    if (options.callback && options.callback(layer)) return;
    layers.push(layer);
  });
  return options.fromBottom ? layers.reverse() : layers;
};

export const getAllItems = (callback?: (item: $T.ADBE.AnyItem) => boolean) => {
  const items: $T.ADBE.AnyItem[] = [];
  times(app.project.numItems, i => {
    const item = app.project.item(i) as $T.ADBE.AnyItem;
    if (callback && callback(item)) return;
    items.push(item);
  });
  return items;
};
