import { getActiveCompItem, getLayers } from "../../utils/GetEntity/getEntity";
import {
  getSelectedLayersFromActive,
  getSelectedItems
} from "../../utils/GetEntity/getSelectedEntity";
import { getLayerPath, LayerPath } from "../../utils/GetEntity/getEntityPath";
import {
  findItemWithName,
  findLayerWithName
} from "../../utils/GetEntity/getEntity";
import { isCompItem, isFolderItem, isCompItems } from "../../utils/typeCheck";
import { times } from "../../utils/Javascript/general";

export type Switch = { enabled: boolean; path: LayerPath };
export type SwitchList = Switch[];
export const getLayersSwitcher = (): SwitchList | undefined => {
  let layers = getSelectedLayersFromActive();
  if (!layers || !layers[0]) {
    const items = getSelectedItems();
    if (!items || !items[0]) {
      alert("Select a layer or composition.");
      return;
    }
    let itemsLayers: $T.ADBE.AnyLayer[] = [];
    items.forEach(item => {
      if (!isCompItem(item)) {
        alert("Select a layer or composition.");
        return;
      }
      itemsLayers = itemsLayers.concat(getLayers(item));
    });
    layers = itemsLayers;
  }

  let layerPathList: SwitchList = [];

  layers.forEach((layer, i) => {
    if (!layer.hasVideo) {
      return;
    }
    const arrayPath = getLayerPath(layer.containingComp, layer);
    if (!arrayPath) {
      return;
    }
    layerPathList.push({ enabled: layer.enabled, path: arrayPath });
  });

  return layerPathList;
};

export const getLayerFromPath = (path: LayerPath): Layer | null => {
  let parent: FolderItem = app.project.rootFolder;
  let comp: CompItem | null = null;
  let layer: Layer | null = null;
  times(
    path.length,
    i => {
      let item: $T.ADBE.AnyItem | null = null;
      if (i === 1) {
        if (!comp) {
          return true;
        }
        layer = findLayerWithName(path[i - 1], comp);
        return true;
      }

      item = findItemWithName(path[i - 1], parent);

      if (i === 2) {
        if (!isCompItem(item)) {
          return true;
        }
        comp = item;
        return;
      }

      if (item) {
        if (!isFolderItem(item)) {
          return true;
        }
        parent = item;
        return;
      }
      return true;
    },
    true
  );
  return layer;
};
