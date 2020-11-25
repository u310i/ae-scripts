import "../../polyfill/array/forEach";
import * as win from "./ui";
import { getSelectedItems } from "../../utils/GetEntity/getSelectedEntity";
import { times } from "../../utils/Javascript/general";
import { isAVItem, isAVLayer } from "../../utils/typeCheck";

const main = () => {
  // event
  // ======

  let sourceItem: AVItem;

  win.setButton.onClick = () => {
    const items = getSelectedItems();

    if (!items) {
      return;
    }

    if (!isAVItem(items[0])) {
      alert("No avitem is selected.");
      return;
    }

    sourceItem = items[0];
    win.nameText.text = sourceItem.name;
  };

  win.ok.onClick = () => {
    const items = getSelectedItems();
    if (!items) {
      return;
    }
    const targetItem = items[0];

    if (!isAVItem(targetItem)) {
      alert("No avitem is selected.");
      return;
    }
    if (!isAVItem(sourceItem)) {
      alert("No avitem is selected.");
      return;
    }

    const compItems = sourceItem.usedIn;

    compItems.forEach((compItem, i) => {
      times(compItem.numLayers, i => {
        const layer = compItem.layer(i);
        if (!isAVLayer(layer)) return;
        if (layer.source !== sourceItem) return;
        layer.replaceSource(targetItem, false);
      });
    });
  };

  // ======

  win.dialog.layout.layout();
  win.dialog.layout.resize();
};

main();
