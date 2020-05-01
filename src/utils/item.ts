import { times } from "./utils";
import { isAVLayer, isCompItem } from "./typeCheck";
import { getLayers } from "./getEntity";

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
