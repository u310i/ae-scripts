import "../../polyfill/array/forEach";
import "../../polyfill/array/every";
import * as win from "./ui";
import { getSelectedItems } from "../../utils/GetEntity/getSelectedEntity";
import { times } from "../../utils/Javascript/general";
import { isAVItem, isAVLayer, isCompItem } from "../../utils/typeCheck";
import { topLayerMarkerToCompMarker } from "./utils/topLayerMarkerToCompMarker";
import { topLayerMarkerToTopLayer } from "./utils/topLayerMarkerToTopLayer";

const isCompItems = (items: any): items is CompItem[] => {
  return items.every(isCompItem);
};

const main = () => {
  let sourceItem: CompItem;

  // event
  // ======
  win.setButton.onClick = () => {
    const items = getSelectedItems();

    if (!items) {
      return;
    }

    if (!isCompItem(items[0])) {
      alert("No compitem is selected.");
      return;
    }
    sourceItem = items[0];

    win.idText.text = sourceItem.id.toString();
  };

  win.ok.onClick = () => {
    const targetItems = getSelectedItems();
    if (!targetItems) {
      return;
    }

    if (!isCompItems(targetItems)) {
      alert("No compitem is selected.");
      return;
    }

    if (win.topLayerMarkerToCompMarkerRadio.value) {
      topLayerMarkerToCompMarker(sourceItem, targetItems);
    }

    if (win.topLayerMarkerToTopLayerRadio.value) {
      topLayerMarkerToTopLayer(sourceItem, targetItems);
    }
  };

  // ======

  win.dialog.layout.layout();
  win.dialog.layout.resize();
};

main();
