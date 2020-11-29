import "../../../polyfill/array/forEach";
import * as win from "./ui";
import { getAllItems } from "../../../utils/GetEntity/getEntity";
import { getSelectedItems } from "../../../utils/GetEntity/getSelectedEntity";
import { unselectAllItems } from "../../../utils/item";
import { isCompItem } from "../../../utils/typeCheck";

const main = () => {
  // initialize
  win.numInput.text = "5";

  win.okButton.onClick = () => {
    let items = getSelectedItems();
    if (!items || !items[0]) {
      items = getAllItems();
    }

    const num = parseInt(win.numInput.text, 10);
    unselectAllItems();
    items.forEach(item => {
      if (!isCompItem(item)) return;
      const frames = item.duration * item.frameRate;
      if (frames === 1) return;
      if (frames % num !== 0) {
        item.selected = true;
      }
    });
    win.dialog.close();
  };

  win.dialog.show();
};

main();
