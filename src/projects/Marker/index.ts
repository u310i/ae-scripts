import "../../polyfill/array/forEach";
import "../../polyfill/array/every";
import * as win from "./ui";
import { getSelectedItems } from "../../utils/GetEntity/getSelectedEntity";
import { times } from "../../utils/Javascript/general";
import { isAVItem, isAVLayer, isCompItem } from "../../utils/typeCheck";
import {
  layersToComp,
  topLayerToAnotherComp,
  topLayerToAnotherCompTopLayer,
  removeAllCompMarkers
} from "./method";

const isCompItems = (items: any): items is CompItem[] => {
  return items.every(isCompItem);
};

const main = () => {
  // initialize
  // ======
  win.layersToCompRadio.value = true;
  win.setButton.enabled = false;
  win.setNameGroup.enabled = false;

  // event
  // ======

  win.layersToCompRadio.onActivate = () => {
    win.setButton.enabled = false;
    win.setNameGroup.enabled = false;
  };
  win.layersToCompRadio.onDeactivate = () => {
    win.setButton.enabled = true;
    win.setNameGroup.enabled = true;
  };

  win.removeAllCompMarkers.onActivate = () => {
    win.setButton.enabled = false;
    win.setNameGroup.enabled = false;
  };
  win.removeAllCompMarkers.onDeactivate = () => {
    win.setButton.enabled = true;
    win.setNameGroup.enabled = true;
  };

  win.topLayerToAnotherCompRadio.onActivate = () => {
    win.setButton.enabled = true;
    win.setNameGroup.enabled = true;
  };

  win.topLayerToAnotherCompTopLayerRadio.onActivate = () => {
    win.setButton.enabled = true;
    win.setNameGroup.enabled = true;
  };

  let sourceItem: CompItem;
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

    win.nameText.text = sourceItem.name;
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

    app.beginUndoGroup("Copy-Marker");

    if (win.layersToCompRadio.value) {
      layersToComp(targetItems);
    }

    if (win.topLayerToAnotherCompRadio.value) {
      topLayerToAnotherComp(sourceItem, targetItems);
    }

    if (win.topLayerToAnotherCompTopLayerRadio.value) {
      topLayerToAnotherCompTopLayer(sourceItem, targetItems);
    }

    if (win.removeAllCompMarkers.value) {
      removeAllCompMarkers(targetItems);
    }

    app.endUndoGroup();
  };

  // ======

  win.dialog.layout.layout();
  win.dialog.layout.resize();
};

main();
