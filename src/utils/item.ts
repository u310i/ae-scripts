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
import { getLayers, getItems } from "./GetEntity/getEntity";

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
  const duration = params.duration || 30.0;
  const frameRate = params.frameRate || 30.0;
  return parent.items.addComp(
    name,
    width,
    height,
    pixelAspect,
    duration,
    frameRate
  );
};
