import { getActiveItem } from "../../utils/GetEntity/getEntity";
import {
  getSelectedItems,
  getSelectedLayersFromActive
} from "../../utils/GetEntity/getSelectedEntity";
import { times } from "../../utils/Javascript/general";
import { isCompItem } from "../../utils/typeCheck";

export const removeAllMarkers = (markerProp: Property) => {
  times(
    markerProp.numKeys,
    i => {
      markerProp.removeKey(i);
    },
    true
  );
};

type ExtractedMarkers = [number, PropertyValue][];

export const getMarkers = (markerProp: Property): ExtractedMarkers => {
  const markers: ExtractedMarkers = [];

  times(markerProp.numKeys, i => {
    markers.push([markerProp.keyTime(i), markerProp.keyValue(i)]);
  });
  return markers;
};

export const setMarkers = (
  sourceProp: Property,
  targetProp: Property
): void => {
  const markers = getMarkers(sourceProp);
  markers.forEach((_, i) => {
    targetProp.setValueAtTime(markers[i][0], markers[i][1]);
  });
};

export const getTopLayerMarkers = (item: CompItem): ExtractedMarkers | null => {
  const sourceLayer = item.layer(1);
  if (sourceLayer.property("marker") === null) {
    alert("There are no markers.");
    return null;
  }
  const sourceMarkers = sourceLayer.property("marker") as Property;
  if (sourceMarkers.numKeys === 0) {
    alert("There are 0 markers.");
    return null;
  }

  return getMarkers(sourceMarkers);
};
