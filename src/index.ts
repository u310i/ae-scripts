import "./init";
import {
  getSelectedItemIndex,
  importFiles,
  deepCompCopy,
  isCompItem,
  isFolderItem,
  isFootageItem,
  isObject,
  times
} from "./utils/utils";

import duplicateFolder from "./utils/duplicateFolder/index";

const func = (): void => {
  duplicateFolder(app.project.item(2) as FolderItem, {
    name: "test",
    copieNum: 1,
    parent: app.project.item(10) as FolderItem
  });
};

func();
// alert(getSelectedItemIndex().toString());
