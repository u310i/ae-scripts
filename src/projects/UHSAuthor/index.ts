import "../../polyfill/array/forEach";
import "../../polyfill/array/every";
import * as win from "./ui";
import { getSelectedItems } from "../../utils/GetEntity/getSelectedEntity";
import { isFolderItem } from "../../utils/typeCheck";
import { setFolder } from "./setFolder";

import { createMarginComp, create01Comp, createAtComp } from "./createComp";

let atFolder: FolderItem;
let compFolder: FolderItem;
let marginFolder: FolderItem;

const main = () => {
  // initialize
  win.advancedReplaceRadio.value = true;
  win.searchInputText.text = "work_*";
  win.replaceInputText.text = "E504_BAR狙え_$1";

  // main
  let folders = setFolder();
  if (!folders) {
    alert("ルートフォルダがありません。");
    return;
  }
  atFolder = folders.at;
  compFolder = folders.comp;
  marginFolder = folders.margin;

  // setFolderButton
  win.setFolderButton.onClick = () => {
    const items = getSelectedItems();

    const rootFolder =
      !items || !items[0] || !isFolderItem(items[0]) ? undefined : items[0];

    folders = setFolder(rootFolder);
    if (!folders) return;
    atFolder = folders.at;
    compFolder = folders.comp;
    marginFolder = folders.margin;

    win.setFolderResult.text = "ok";
  };

  // createMarginCompButton
  win.createMarginCompButton.onClick = () => {
    app.beginUndoGroup("UHS-Author");

    createMarginComp(marginFolder);

    app.endUndoGroup();
  };

  // create01CompButton
  win.create01CompButton.onClick = () => {
    app.beginUndoGroup("UHS-Author");

    create01Comp(compFolder);

    app.endUndoGroup();
  };

  // createAt1CompButton
  win.createAt1CompButton.onClick = () => {
    app.beginUndoGroup("UHS-Author");

    createAtComp(atFolder);

    app.endUndoGroup();
  };

  // ======

  win.dialog.layout.layout();
  win.dialog.layout.resize();
};

main();
