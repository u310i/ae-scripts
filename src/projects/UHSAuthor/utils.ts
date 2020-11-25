import { setMarkers } from "../Marker/utils";

export const setMarker = (sourceComp: CompItem, targetComp: CompItem) => {
  if (sourceComp.markerProperty) {
    setMarkers(sourceComp.markerProperty, targetComp.markerProperty);
    setMarkers(
      sourceComp.markerProperty,
      targetComp.layer(1).property("marker") as Property
    );
  } else {
    setMarkers(
      sourceComp.layer(1).property("marker") as Property,
      targetComp.layer(1).property("marker") as Property
    );
  }
};
