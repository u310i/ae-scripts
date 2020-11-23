import { getActiveItem, getActiveCompItem } from "./getEntity";

export const getSelectedItems = (): $T.ADBE.AnyItem[] | null => {
  const items = app.project.selection;
  return items[0] ? (items as $T.ADBE.AnyItem[]) : null;
};

export const getSelectedLayers = (
  compItem: CompItem
): $T.ADBE.AnyLayer[] | null => {
  const layers = compItem.selectedLayers as $T.ADBE.AnyLayer[];
  return layers[0] ? layers : null;
};

export const getSelectedProperties = (
  compItem: CompItem
): $T.ADBE.AnyProperty[] | null => {
  const properties = compItem.selectedProperties as
    | $T.ADBE.AnyProperty[]
    | null;
  return properties && properties[0] ? properties : null;
};

export const getSelectedPropertiesFromActive = ():
  | $T.ADBE.AnyProperty[]
  | null => {
  const compItem = getActiveCompItem();
  return compItem && getSelectedProperties(compItem);
};

export const getSelectedLayersFromActive = (): $T.ADBE.AnyLayer[] | null => {
  const compItem = getActiveCompItem();
  return compItem && getSelectedLayers(compItem);
};
