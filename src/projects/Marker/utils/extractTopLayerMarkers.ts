import { getSelectedItems } from "../../../utils/GetEntity/getSelectedEntity";
import { times } from "../../../utils/Javascript/general";
import { isCompItem } from "../../../utils/typeCheck";

type ExtractedMarkers = [number, PropertyValue][];

export const extractTopLayerMarkers = (
  item: CompItem
): ExtractedMarkers | null => {
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

  const extractedMarkers: ExtractedMarkers = [];

  times(sourceMarkers.numKeys, i => {
    extractedMarkers.push([
      sourceMarkers.keyTime(i),
      sourceMarkers.keyValue(i)
    ]);
  });

  return extractedMarkers;
};
