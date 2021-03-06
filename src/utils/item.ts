import { __Error__ } from "./initialize";
import { times } from "./Javascript/general";
import {
  isAVLayer,
  isCompItem,
  isFolderItem,
  isFootageItem,
  isFileSource,
  isSolidSource,
  isObject
} from "./typeCheck";
import { getLayers, getAllItems } from "./GetEntity/getEntity";

export const createFolderItem = (
  parent: FolderItem,
  name: string
): FolderItem => {
  return parent.items.addFolder(name);
};

export const createCompItem = (
  parent: FolderItem,
  params: {
    name?: string;
    width?: number;
    height?: number;
    pixelAspect?: number;
    duration?: number;
    frameRate?: number;
  } = {}
): CompItem => {
  const name = params.name || "comp";
  const width = params.width || 1280;
  const height = params.height || 720;
  const pixelAspect = params.pixelAspect || 1.0;
  const duration = params.duration || 1.0;
  const frameRate = params.frameRate || 30.0;
  const newComp = parent.items.addComp(
    name,
    width,
    height,
    pixelAspect,
    9999.0,
    frameRate
  );
  newComp.duration = duration;
  return newComp;
};

export const unselectAllItems = (): void => {
  getAllItems().forEach(item => {
    if (item.selected) item.selected = false;
  });
};
