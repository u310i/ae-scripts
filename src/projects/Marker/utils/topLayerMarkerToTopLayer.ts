import "../../../polyfill/array/forEach";
import { getActiveItem } from "../../../utils/GetEntity/getEntity";
import { getSelectedItems } from "../../../utils/GetEntity/getSelectedEntity";
import { times } from "../../../utils/Javascript/general";
import { isCompItem } from "../../../utils/typeCheck";
import { extractTopLayerMarkers } from "./extractTopLayerMarkers";

export const topLayerMarkerToTopLayer = (
  sourceItem: CompItem,
  targetItems: CompItem[]
) => {
  const extractedMarkers:
    | [number, PropertyValue][]
    | null = extractTopLayerMarkers(sourceItem);

  if (!extractedMarkers) return;

  app.beginUndoGroup("TopLayerMarkerToTopLayer");

  targetItems.forEach(item => {
    if (!isCompItem(item)) {
      alert("No composition is selected.");
      return;
    }
    const targetLayer = item.layer(1);
    const targetMarker = targetLayer.property("marker") as Property;

    extractedMarkers.forEach((_, i) => {
      targetMarker.setValueAtTime(
        extractedMarkers[i][0],
        extractedMarkers[i][1]
      );
    });
  });

  app.endUndoGroup();
};
