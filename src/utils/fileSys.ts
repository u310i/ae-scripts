import pref from "./pref";
import { isFolderItem, isCompItem } from "./typeCheck";

const isFile = (data: File | Folder): data is File => {
  return data instanceof File;
};

const isFolder = (data: File | Folder): data is Folder => {
  return data instanceof Folder;
};

const getPath = (name: string): string => {
  return new File($.fileName).path + "/" + encodeURI(name);
};

const getFile = (fileName: string): File => {
  return new File(getPath(fileName));
};

const getExistingFile = (fileName: string): File | null => {
  const file = getFile(fileName);
  if (!file.exists) {
    $L.error($.line, `getFile / File is not exists / name: ${fileName}`);
    return null;
  }
  return file;
};

const getFolder = (folderName: string): Folder => {
  return new Folder(getPath(folderName));
};

const getExistingFolder = (folderName: string): Folder | null => {
  const folder = getFolder(folderName);
  if (!folder.exists) {
    $L.error($.line, `getFolder / Folder is not exists / name: ${folderName}`);
    return null;
  }
  return folder;
};

const getFolderContents = (
  folder: Folder,
  callback?: (file: File | Folder) => boolean
): Array<File | Folder> | null => {
  const files = folder.getFiles().filter(file => {
    return callback ? callback(file) : true;
  });
  return files.length !== 0 ? files : null;
};

const writeTextFile = (
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
  const file = new File(getPath(textFileName));
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

const deleteFile = (name: string): boolean | null => {
  if (!pref.isSecurityPrefSet()) return null;
  const file = new File(getPath(name));
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

export const importFile = (
  file: File,
  options: ImportFileOptions = {}
): Item | null => {
  if (!file.exists) {
    $L.error($.line, `importFile / file is not exists / name: ${file.name}`);
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
    $L.error(
      $.line,
      `importFile / file is not match on callback / ${io.file.name}`
    );
    return null;
  }
  io.sequence = !!options.sequence;
  io.forceAlphabetical = !!options.forceAlphabetical;
  if (!io.canImportAs(ImportAsType[type])) {
    $L.error(
      $.line,
      `importFile / ${ImportAsType[type]} type is can not import / ${io.file.name}`
    );
    return null;
  }
  io.importAs = ImportAsType[type];
  const item = app.project.importFile(io);
  if (options.parent) item.parentFolder = options.parent;
  return item;
};

export const importFileWithName = (
  fileName: string,
  options: ImportFileOptions = {}
): Item | null => {
  const file = getExistingFile(fileName);
  if (!file) return null;
  return importFile(file, options);
};

// const importFileList = importFiles(`foo/images`);
export const importFilesWithName = (
  folderName: string,
  options: ImportFileOptions = {}
): Item[] | null => {
  const folder = getExistingFolder(getPath(folderName));
  if (!folder) return null;
  const files = getFolderContents(folder, file => {
    if (isFile(file)) {
      return options.callback ? options.callback(file) : true;
    }
    return false;
  }) as File[];
  if (!files || files.length === 0) {
    $L.error(
      $.line,
      `importFilesWithName / files is not exists / ${folderName}`
    );
    return null;
  }

  const items = [] as Item[];
  files.forEach(file => {
    const { callback, ...importFileOptions } = options;
    const item = importFile(file, importFileOptions);
    if (!item) return;
    items.push(item);
  });
  if (items.length === 0) {
    $L.error(
      $.line,
      `importFilesWithName / items is not exists / ${folderName}`
    );
    return null;
  }
  return items;
};

export default {
  isFile,
  isFolder,
  getPath,
  getFile,
  getExistingFile,
  getFolder,
  getExistingFolder,
  getFolderContents,
  writeTextFile,
  deleteFile
};
