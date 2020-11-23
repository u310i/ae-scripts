import "./preProcess.ts";
import postProcess from "./postProcess";
import { alertType } from "./utils/System/debug";
import { times } from "./utils/Javascript/general";
import { sequenceLayers } from "./utils/layer";
import {
  findItemWithName,
  findLayerWithName,
  findPropertyWithName,
  findCompItemWithName
} from "./utils/GetEntity/getEntity";
import { getSomethingWithPath } from "./utils/GetEntity/getEntityWithPath";
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
} from "./utils/System/fileSys";
import setMaterials from "./utils/SetMaterials";
import duplicateFolder from "./utils/DuplicateFolder";
import { genFade } from "./utils/keyframe";
import initGenStruct from "./utils/InitStruct";
import struct from "./struct";
import constants from "./constants";
import {
  createFolderStruct,
  visualizeStruct
} from "./utils/DuplicateFolder/utils";
import {
  getRQItemStatus,
  RQItemStatusKeys,
  addRenderQueue
} from "./utils/render";

const aerenderPath = `/c/Program\ Files/Adobe/Adobe\ After\ Effects\ 2020/Support\ Files/aerender`;
// 'C:\Program Files\Adobe\Adobe After Effects 2020\Support Files\aerender' -help
// & 'C:\Program Files\Adobe\Adobe After Effects 2020\Support Files\aerender' -project 'D:\Documents\Projects\myProjects\AE_Scripts\dist\testInitFolderStruct.aep'

// memo: afterfx.exe -r E:\Projects\myProjects\adobe\ae-scripts\dist\bundle.jsx

export const main = () => {
  // generateProps

  // const item = app.project.activeItem;
  // if (item === null) {
  //   alert("null desu");
  // } else {
  //   const a = prompt("prompt", "");
  //   alert(item.name + ": " + a);
  // }
  alert("default");

  /**
  // projectA
  initGenStruct(struct);

  const renderComp = findCompItemWithName("$root");
  if (!renderComp) return;
  addRenderQueue(renderComp);

  postProcess(renderComp);
  */
};
