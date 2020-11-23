import pref from "./pref";
import { isFolderItem, isCompItem } from "../typeCheck";

export const isFSFile = (data: File | Folder): data is File => {
  return data instanceof File;
};

export const isFSFolder = (data: File | Folder): data is Folder => {
  return data instanceof Folder;
};

export const getFSPath = (name: string): string => {
  return new File($.fileName).path + "/" + encodeURI(name);
};

export const getFSFile = (fileName: string): File => {
  return new File(getFSPath(fileName));
};

export const getExistingFile = (fileName: string): File | null => {
  const file = getFSFile(fileName);
  if (!file.exists) {
    alert(`${$.line}\ngetFSFile / File is not exists / name: ${fileName}`);
    return null;
  }
  return file;
};

export const getFSFolder = (folderName: string): Folder => {
  return new Folder(getFSPath(folderName));
};

export const getExistingFSFolder = (folderName: string): Folder | null => {
  const folder = getFSFolder(folderName);
  if (!folder.exists) {
    alert(
      `${$.line}\ngetFSFolder / Folder is not exists / name: ${folderName}`
    );
    return null;
  }
  return folder;
};

export const getFSFolderContents = (
  folder: Folder,
  callback?: (file: File | Folder) => boolean
): Array<File | Folder> | null => {
  const files = folder.getFiles().filter(file => {
    return callback ? callback(file) : true;
  });
  return files.length !== 0 ? files : null;
};

export const writeTextFile = (
  textFileName: string,
  content: string,
  options: {
    mode?: "w" | "a";
    ln?: boolean;
  } = {}
): boolean | null => {
  const mode = options.mode || "w";
  const ln = options.ln || true;
  if (!pref.isSecurityPrefSet()) return null;
  const file = new File(getFSPath(textFileName));
  if (!file) return null;
  const parentFolder = file.parent;
  if (!parentFolder.exists) return null;
  file.encoding = "utf-8";
  file.lineFeed = "Unix";
  file.open(mode);
  const result = ln ? file.writeln(content) : file.write(content);
  file.close();
  return result;
};

export const deleteFSFile = (name: string): boolean | null => {
  if (!pref.isSecurityPrefSet()) return null;
  const file = new File(getFSPath(name));
  return file.remove();
};

type ImportFileType = "comp" | "footage" | "comp_cropped_layers" | "project";

type ImportFileOptions = {
  type?: ImportFileType;
  sequence?: boolean;
  forceAlphabetical?: boolean;
  parent?: FolderItem;
  callback?: (file: File) => boolean;
};

export const importFSFile = (
  file: File,
  options: ImportFileOptions = {}
): Item | null => {
  if (!file.exists) {
    alert(`${$.line}\nimportFSFile / file is not exists / name: ${file.name}`);
    return null;
  }

  const type =
    options.type === "comp"
      ? "COMP"
      : options.type === "footage"
      ? "FOOTAGE"
      : options.type === "comp_cropped_layers"
      ? "COMP_CROPPED_LAYERS"
      : options.type === "project"
      ? "PROJECT"
      : "FOOTAGE";

  const io = new ImportOptions(file);

  if (options.callback && !options.callback(io.file)) {
    alert(
      `${$.line}\nimportFSFile / file is not match on callback / ${io.file.name}`
    );
    return null;
  }
  io.sequence = !!options.sequence;
  io.forceAlphabetical = !!options.forceAlphabetical;
  if (!io.canImportAs(ImportAsType[type])) {
    alert(
      `importFSFile / ${ImportAsType[type]} type is can not import / ${io.file.name}`
    );
    return null;
  }
  io.importAs = ImportAsType[type];
  const item = app.project.importFile(io);
  if (options.parent) item.parentFolder = options.parent;
  return item;
};

export const importFSFileWithName = (
  fileName: string,
  options: ImportFileOptions = {}
): Item | null => {
  const file = getExistingFile(fileName);
  if (!file) return null;
  return importFSFile(file, options);
};

// const importFileList = importFiles(`foo/images`);
export const importFSFilesWithName = (
  folderName: string,
  options: ImportFileOptions = {}
): Item[] | null => {
  const folder = getExistingFSFolder(getFSPath(folderName));
  if (!folder) return null;
  const files = getFSFolderContents(folder, file => {
    if (isFSFile(file)) {
      return options.callback ? options.callback(file) : true;
    }
    return false;
  }) as File[];
  if (!files || files.length === 0) {
    alert(`importFSFilesWithName / files is not exists / ${folderName}`);
    return null;
  }

  const items = [] as Item[];
  files.forEach(file => {
    const { callback, ...importFileOptions } = options;
    const item = importFSFile(file, importFileOptions);
    if (!item) return;
    items.push(item);
  });
  if (items.length === 0) {
    alert(`importFSFilesWithName / items is not exists / ${folderName}`);
    return null;
  }
  return items;
};
