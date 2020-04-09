import pathParse from "path-parse";

const isFile = (item: File | Folder): item is File => {
  return item instanceof File;
};

const getPath = (folderName: string): string => {
  return pathParse($.fileName).dir + "/" + folderName;
};

const getFiles = (folder: Folder): File[] | null => {
  const files = folder.getFiles().filter(isFile);
  return files[0] ? files : null;
};

export default {
  isFile,
  getPath,
  getFiles
};
