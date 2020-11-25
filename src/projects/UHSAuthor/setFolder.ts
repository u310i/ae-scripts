import { getChildItem } from "../../utils/GetEntity/getEntity";
import { getSelectedItems } from "../../utils/GetEntity/getSelectedEntity";
import { isFolderItem } from "../../utils/typeCheck";
import { setFolderResult } from "./ui";

const inputBlank = () => {
  setFolderResult.text = "";
};

export const setFolder = (item?: FolderItem | undefined) => {
  let tempFolder: $T.ADBE.AnyItem | null = null;
  let rootFolder: $T.ADBE.AnyItem | null = null;

  if (item) {
    rootFolder = item;
  } else {
    rootFolder = app.project.rootFolder;
  }

  tempFolder = getChildItem(rootFolder, item => {
    return item.name === "*" && isFolderItem(item);
  });
  if (!tempFolder) {
    inputBlank();
    alert("【*】フォルダがありません。");
    return;
  }
  const asteriskFolder = tempFolder as FolderItem;

  tempFolder = getChildItem(asteriskFolder, item => {
    return item.name === "@" && isFolderItem(item);
  });
  if (!tempFolder) {
    inputBlank();
    alert("【@】フォルダがありません。");
    return;
  }
  const atFolder = tempFolder as FolderItem;

  tempFolder = getChildItem(rootFolder, item => {
    return item.name === "work" && isFolderItem(item);
  });
  if (!tempFolder) {
    inputBlank();
    alert("【work】フォルダがありません。");
    return;
  }
  const workFolder = tempFolder as FolderItem;

  tempFolder = getChildItem(workFolder, item => {
    return item.name === "_sozai" && isFolderItem(item);
  });
  if (!tempFolder) {
    inputBlank();
    alert("【_sozai】フォルダがありません。");
    return;
  }
  const sozaiFolder = tempFolder as FolderItem;

  tempFolder = getChildItem(sozaiFolder, item => {
    return item.name === "01_コンポ" && isFolderItem(item);
  });
  if (!tempFolder) {
    inputBlank();
    alert("【01_コンポ】フォルダがありません。");
    return;
  }
  const compFolder = tempFolder as FolderItem;

  tempFolder = getChildItem(sozaiFolder, item => {
    return item.name === "02_余白" && isFolderItem(item);
  });
  if (!tempFolder) {
    inputBlank();
    alert("【02_余白】フォルダがありません。");
    return;
  }
  const marginFolder = tempFolder as FolderItem;

  return {
    at: atFolder,
    comp: compFolder,
    margin: marginFolder
  };
};
