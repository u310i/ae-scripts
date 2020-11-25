import { times } from "../../utils/Javascript/general";
import { isCompItem } from "../../utils/typeCheck";
import { getMarkers, getTopLayerMarkers, removeAllMarkers } from "./utils";

export const removeAllCompMarkers = (items: CompItem[]) => {
  items.forEach(item => {
    removeAllMarkers(item.markerProperty);
  });
};

export const layersToComp = (items: CompItem[]) => {
  items.forEach(item => {
    times(item.numLayers, i => {
      const layer = item.layer(i);
      const markerProp = layer.property("marker") as Property;
      if (markerProp.numKeys === 0) {
        return;
      }

      const markers = getMarkers(markerProp);

      markers.forEach((_, i) => {
        item.markerProperty.setValueAtTime(markers[i][0], markers[i][1]);
      });
    });
  });
};

export const topLayerToAnotherComp = (
  sourceItem: CompItem,
  targetItems: CompItem[]
) => {
  const markers: [number, PropertyValue][] | null = getTopLayerMarkers(
    sourceItem
  );

  if (!markers) return;

  targetItems.forEach(item => {
    if (!isCompItem(item)) {
      alert("No composition is selected.");
      return;
    }

    markers.forEach((_, i) => {
      item.markerProperty.setValueAtTime(markers[i][0], markers[i][1]);
    });
  });
};

export const topLayerToAnotherCompTopLayer = (
  sourceItem: CompItem,
  targetItems: CompItem[]
) => {
  const markers: [number, PropertyValue][] | null = getTopLayerMarkers(
    sourceItem
  );

  if (!markers) return;

  targetItems.forEach(item => {
    if (!isCompItem(item)) {
      alert("No composition is selected.");
      return;
    }
    const targetLayer = item.layer(1);
    const targetMarker = targetLayer.property("marker") as Property;

    markers.forEach((_, i) => {
      targetMarker.setValueAtTime(markers[i][0], markers[i][1]);
    });
  });
};
