import { times } from "./utils";
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
} from "./typeCheck";
import fileSys from "./fileSys";

export const getItems = (
  folder: FolderItem,
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

export const findItemWithName = (
  name: string,
  parent: FolderItem = app.project.rootFolder
): $T.ADBE.AnyItem | null => {
  let item: $T.ADBE.AnyItem | null = null;
  getItems(parent).forEach(current => {
    if (current.name === name) {
      if (isAnyItem(current)) item = current;
      return true;
    }
  });
  return item;
};

export const findFolderItemWithName = (
  name: string,
  parent: FolderItem = app.project.rootFolder
): FolderItem | null => {
  const item = findItemWithName(name, parent);
  if (!isFolderItem(item)) {
    $L.error(
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
    $L.error(
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
    $L.error(
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
    $L.error(
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
    $L.error(
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
