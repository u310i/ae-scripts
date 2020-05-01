import "./init.ts";
import { alertType } from "./utils/debug";
import { times } from "./utils/utils";
import { sequenceLayers } from "./utils/layer";
import {
  findItemWithName,
  findLayerWithName,
  findPropertyWithName
} from "./utils/getEntity";
import { getSomethingWithPath } from "./utils/getEntityWithPath";
import {
  isFolderItem,
  isCompItem,
  isNumber,
  isFootageItem,
  isFileSource,
  isProperty
} from "./utils/typeCheck";
import fileSys, {
  importFilesWithName,
  importFile,
  importFileWithName
} from "./utils/fileSys";
import setMaterials from "./utils/setMaterials";
import duplicateFolder from "./utils/duplicateFolder";
import { genFade } from "./utils/keyframe";
import initGenStruct from "./utils/initGenStruct";
import struct from "./struct";
import constants from "./constants";

const fn = () => {
  initGenStruct(struct);
};

fn();

// const file = new File("aaaaa");
// alertType(file);

// const partLayer = getSomethingWithPath("$root/$part_1") as $T.ADBE.AnyLayer;
// genFade(partLayer, "in", 1);
// genFade(partLayer, "out", 2);

// const members = (app.project.activeItem as CompItem).selectedProperties;
// alertType(members[0]);

// const root = app.project.rootFolder;
// const item = root.item(100);
// alert(item.name);

// const sourceFolder = getSomethingWithPath("main/short") as FolderItem;
// duplicateFolder(sourceFolder, {
//   name: "end",
//   suffix: false
// });

// const thing = getSomethingWithPath(
//   "1_templates/simple/short/parent/text/Text/Source Text"
// );

// alertType(thing);
