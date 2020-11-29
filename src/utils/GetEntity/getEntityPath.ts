import {} from "./getEntity";
import {} from "./getSelectedEntity";
import {} from "../item";
import {} from "../typeCheck";
import {} from "../System/fileSys";

// e.g. return [innerFolder, parentFolder]
export const getItemAncestors = (
  item: Item,
  callback: (item: FolderItem) => void,
  root: FolderItem = app.project.rootFolder
): null => {
  const parent = item.parentFolder;
  if (parent === root || parent === app.project.rootFolder) {
    return null;
  } else {
    callback(parent);
    return getItemAncestors(parent, callback, root);
  }
};

export type LayerPath = string[];
export const getLayerPath = (
  item: CompItem,
  layer: $T.ADBE.AnyLayer
): LayerPath | null => {
  const ancestors: string[] = [];
  getItemAncestors(item, parent => {
    ancestors.push(parent.name);
  });
  if (!ancestors) {
    return null;
  }

  const path: LayerPath = [layer.name, item.name, ...ancestors];
  return path;
};
