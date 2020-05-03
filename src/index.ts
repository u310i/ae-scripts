import "./preProcess.ts";
import postProcess from "./postProcess";
import { alertType } from "./utils/debug";
import { times } from "./utils/general";
import { sequenceLayers } from "./utils/layer";
import {
  findItemWithName,
  findLayerWithName,
  findPropertyWithName,
  findCompItemWithName
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
import {
  importFSFilesWithName,
  importFSFile,
  importFSFileWithName,
  getFSPath,
  getFSFile
} from "./utils/fileSys";
import setMaterials from "./utils/setMaterials";
import duplicateFolder from "./utils/duplicateFolder";
import { genFade } from "./utils/keyframe";
import initGenStruct from "./utils/initStruct";
import struct from "./struct";
import constants from "./constants";
import { createFolderStruct, visualizeStruct } from "./utils/item";
import {
  getRQItemStatus,
  RQItemStatusKeys,
  addRenderQueue
} from "./utils/render";

const aerenderPath = `/c/Program\ Files/Adobe/Adobe\ After\ Effects\ 2020/Support\ Files/aerender`;
// 'C:\Program Files\Adobe\Adobe After Effects 2020\Support Files\aerender' -help
// & 'C:\Program Files\Adobe\Adobe After Effects 2020\Support Files\aerender' -project 'D:\Documents\Projects\myProjects\AE_Scripts\dist\testInitFolderStruct.aep'
const fn = () => {
  // initGenStruct(struct);

  const renderComp = findCompItemWithName("$root");
  if (!renderComp) return;
  addRenderQueue(renderComp);

  postProcess(renderComp);
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
