import {
  getItemAncestors,
  getItemWithPathArray,
  getLayerOrPropertyWithPathArray,
  getSomethingWithPathArray,
  Member,
  Members
} from "./getEntityWithPathArray";

// e.g. return ["parentFolder", "innerFolder", "comp"]
export const getItemAncestorsName = (
  item: Item,
  root: FolderItem = app.project.rootFolder
): string[] | null => {
  const itemAncestors = getItemAncestors(item, root);
  if (!itemAncestors) return null;
  return itemAncestors.map(v => v.name);
};

export const getItemWithPath = (
  path: string,
  parent: FolderItem = app.project.rootFolder,
  options: {
    createFolder?: boolean;
    stopAtComp?: boolean;
    stopAtFootage?: boolean;
    callback?: (item: $T.ADBE.AnyItem | null, length: number) => void;
  } = {}
): $T.ADBE.AnyItem | null => {
  const pathArray = path.split("/");
  return getItemWithPathArray(pathArray, parent, options);
};

export const getLayerOrPropertyWithPath = (
  path: string,
  parent: Members,
  options: {
    stopAtProperty?: boolean;
    callback?: (member: Member, length: number) => void;
  } = {}
): CompItem | Member => {
  const pathArray = path.split("/");
  return getLayerOrPropertyWithPathArray(pathArray, parent, options);
};

// const thing = getSomethingWithPath(
//   "1_templates/simple/short/parent/text/Text/Source Text"
// );
export const getSomethingWithPath = (
  path: string,
  parent:
    | FolderItem
    | CompItem
    | $T.ADBE.AnyLayer
    | PropertyGroup
    | MaskPropertyGroup = app.project.rootFolder
): $T.ADBE.AnyItem | $T.ADBE.AnyLayer | $T.ADBE.AnyProperty | null => {
  const pathArray = path.split("/");
  return getSomethingWithPathArray(pathArray, parent);
};
