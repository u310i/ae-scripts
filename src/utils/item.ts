import { times } from "./general";
import {
  isAVLayer,
  isCompItem,
  isFolderItem,
  isFootageItem,
  isFileSource,
  isSolidSource,
  isObject
} from "./typeCheck";
import { getLayers, getItems } from "./getEntity";

export const createFolderItem = (
  parent: FolderItem,
  name: string
): FolderItem => {
  return parent.items.addFolder(name);
};

export const createCompItem = (
  parent: FolderItem,
  params: {
    name?: string;
    width?: number;
    height?: number;
    pixelAspect?: number;
    duration?: number;
    frameRate?: number;
  } = {}
): CompItem => {
  const name = params.name || "comp";
  const width = params.width || 1280;
  const height = params.height || 720;
  const pixelAspect = params.pixelAspect || 1.0;
  const duration = params.duration || 30.0;
  const frameRate = params.frameRate || 30.0;
  return parent.items.addComp(
    name,
    width,
    height,
    pixelAspect,
    duration,
    frameRate
  );
};

export const deepCompCopy = (
  comp: CompItem,
  replaceLayers?: AVLayer[]
): undefined => {
  if (!isCompItem(comp)) {
    $L.error($.line, "deepCompCopy");
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
