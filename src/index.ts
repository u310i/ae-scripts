import "./init";
import {
  getSelectedItemIndex,
  importFiles,
  deepCompCopy,
  isCompItem,
  isFolderItem,
  isFootageItem,
  isObject,
  times,
  getItemFromPathArr
} from "./utils/utils";

import { findFolder, getFolderFromPathArr } from "./utils/debug";

import duplicateFolder from "./utils/duplicateFolder/duplicateFolder";

const func = (): void => {
  duplicateFolder(getFolderFromPathArr(["aaa", "foo1"]), {
    name: "test",
    copieNum: 3,
    parent: getFolderFromPathArr(["bbb"])
  });
};

func();

// alert(getSelectedItemIndex().toString());

// const item = getItemFromPathArr(["aaa", "foo1", "solid1"]);
