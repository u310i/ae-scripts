import { findItem, getItemFromPathArr } from "./utils";

export const findFolder = (name: string, parent?: FolderItem): FolderItem => {
  return findItem(name, parent) as FolderItem;
};

export const getFolderFromPathArr = (
  pathArr: string[],
  parent?: FolderItem
): FolderItem => {
  return getItemFromPathArr(pathArr, parent) as FolderItem;
};
