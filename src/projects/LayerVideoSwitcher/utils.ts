import { getActiveCompItem } from "../../utils/GetEntity/getEntity";
import { getSelectedLayersFromActive } from "../../utils/GetEntity/getSelectedEntity";
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
  const activeItem = getActiveCompItem();
  const layers = getSelectedLayersFromActive();
  if (!activeItem || !layers || !layers[0]) {
    alert("Please select a layer.");
    return;
  }

  let layerPathList: SwitchList = [];

  layers.forEach((layer, i) => {
    if (!layer.hasVideo) {
      return;
    }
    const arrayPath = getLayerPath(activeItem, layer);
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
