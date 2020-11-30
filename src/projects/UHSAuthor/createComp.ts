import { getChildItem } from "../../utils/GetEntity/getEntity";
import { getSelectedItems } from "../../utils/GetEntity/getSelectedEntity";
import { isFolderItem, isCompItem, isCompItems } from "../../utils/typeCheck";
import * as win from "./ui";
import { renameWithSimpleGlob } from "../ReName/rename";
import { createCompItem } from "../../utils/item";
import { setMarker } from "./utils";

export const createMarginComp = (folder: FolderItem): void => {
  const targetItems = getSelectedItems();
  if (!targetItems || !isCompItems(targetItems)) {
    alert("【01_余白】コンポジションを選択してください。");
    return;
  }

  targetItems.forEach(comp => {
    let name: string = "";
    if (win.simpleReplaceRadio.value) {
      name = comp.name.replace(
        win.searchInputText.text,
        win.replaceInputText.text
      );
    }
    if (win.advancedReplaceRadio.value) {
      name = renameWithSimpleGlob(
        comp.name,
        win.searchInputText.text,
        win.replaceInputText.text
      );
    }

    const compProps = {
      name: name + "_余白",
      width: comp.width,
      height: comp.height,
      duration: comp.duration
    };

    const newComp = createCompItem(folder, compProps);
    newComp.bgColor = comp.bgColor;

    const triggerName = newComp.name.split("_")[2];

    const sizeName =
      compProps.width === 1200 && compProps.height === 1000
        ? "全画面"
        : compProps.width === 1200 && compProps.height === 600
        ? "半画面"
        : "※画面サイズエラー";
    newComp.comment = `${triggerName}_${sizeName}_余白`;

    newComp.layers.add(comp);

    setMarker(comp, newComp);

    comp.selected = false;
    newComp.selected = true;
  });
};

export const create01Comp = (folder: FolderItem): void => {
  const targetItems = getSelectedItems();
  if (!targetItems || !isCompItems(targetItems)) {
    alert("【01_コンポ】コンポジションを選択してください。");
    return;
  }

  targetItems.forEach(comp => {
    const name = comp.name.replace("_余白", "");

    const compProps = {
      name: name,
      width: comp.width - 200,
      height: comp.height - 200,
      duration: comp.duration
    };

    const newComp = createCompItem(folder, compProps);
    newComp.bgColor = comp.bgColor;

    newComp.comment = comp.comment.replace("_余白", "");

    const layer = newComp.layers.add(comp);
    layer.position.setValue([compProps.width / 2, compProps.height / 2, 0]);

    setMarker(comp, newComp);

    comp.selected = false;
    newComp.selected = true;
  });
};

export const createAtComp = (folder: FolderItem): void => {
  const targetItems = getSelectedItems();
  if (!targetItems || !isCompItems(targetItems)) {
    alert("【@コンポ】コンポジションを選択してください。");
    return;
  }

  targetItems.forEach(comp => {
    const name = "@" + comp.name;

    const compProps = {
      name: name,
      width: 1000,
      height: 800,
      duration: comp.duration
    };

    const newComp = createCompItem(folder, compProps);
    newComp.bgColor = comp.bgColor;

    const commentArray = comp.comment.split("_");
    newComp.comment = commentArray[0] + commentArray.slice(1).join("_");

    const layer = newComp.layers.add(comp);
    layer.position.setValue([comp.width / 2, comp.height / 2, 0]);

    setMarker(comp, newComp);

    comp.selected = false;
    newComp.selected = true;
  });
};
