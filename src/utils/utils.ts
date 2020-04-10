import fileSystem from "./fileSystem";

export const getSelectedItemIndex = (): number => {
  let index = 0;
  const selectItem = app.project.activeItem;
  if (!selectItem) {
    alert("not selected");
    return 0;
  }
  times(app.project.numItems, i => {
    if (app.project.item(i).name === selectItem.name) {
      index = i;
    }
  });
  return index;
};

export const findItem = (
  name: string,
  parent: FolderItem = app.project.rootFolder
): Item | undefined => {
  let item: Item | undefined;
  times(parent.numItems, i => {
    const current = parent.item(i);
    if (current.name === name) {
      item = current;
      return true;
    }
  });
  return item;
};

export const getItemFromPathArr = (
  pathArr: string[],
  parent: FolderItem = app.project.rootFolder
): Item | undefined => {
  const isTarget = pathArr.length === 1;
  const item = findItem(pathArr[0], parent);
  if (!item) {
    return;
  }
  if (isTarget) {
    return item;
  } else {
    if (isFolderItem(item)) {
      return getItemFromPathArr(pathArr.slice(1), item);
    } else {
      return;
    }
  }
};

// const importFileList = importFiles("foo/images");
export const importFiles = (
  folderName: string,
  options: {
    sequence?: boolean;
  } = {}
): FootageItem[] | null => {
  const files = fileSystem.getFiles(new Folder(fileSystem.getPath(folderName)));
  if (files === null) return null;
  const footageItems = [] as Item[];
  files.forEach(file => {
    const importOptions = new ImportOptions(file);
    importOptions.sequence = !!options.sequence;
    const fileItem = app.project.importFile(importOptions);
    footageItems.push(fileItem);
  });
  return footageItems as FootageItem[];
};

export const times = (
  step: number,
  callback: (index: number) => boolean | undefined | void
): void => {
  for (let i = 1; i <= step; i++) {
    if (callback(i)) break;
  }
};

export const isCompItem = (item: any): item is CompItem => {
  return item instanceof CompItem;
};

export const isFolderItem = (item: any): item is FolderItem => {
  return item instanceof FolderItem;
};

export const isFootageItem = (item: any): item is FootageItem => {
  return item instanceof FootageItem;
};

export const isObject = (data: any) => {
  return Object.prototype.toString.call(data) === "[object Object]";
};

// export const findLayer = (
//   name: string,
//   Comp: CompItem
// ): Item | undefined => {
//   let layer: Layer | undefined;
//   times(Comp.numLayers, i => {
//     const current = Comp.item(i);
//     if (current.name === name) {
//       layer = current;
//       return true;
//     }
//   });
//   return layer;
// };

// const comp = app.project.activeItem as CompItem;
// deepCompCopy(comp);
export const deepCompCopy = (
  comp: CompItem,
  replaceLayers?: AVLayer[]
): undefined => {
  if (!isCompItem(comp)) return;

  const newComp = comp.duplicate();

  replaceLayers?.forEach(layer => {
    layer.replaceSource(newComp, false);
  });

  const replaceLayerLists = [] as { comp: CompItem; layers: AVLayer[] }[];

  times(newComp.numLayers, i => {
    const currentLayer = newComp.layer(i);
    if (
      currentLayer instanceof AVLayer &&
      currentLayer.source &&
      currentLayer.source instanceof CompItem
    ) {
      const currentComp = currentLayer.source;
      const compIndex = replaceLayerLists.findIndex(
        set => set.comp === currentComp
      );

      if (compIndex === -1) {
        replaceLayerLists.push({
          comp: currentComp,
          layers: [currentLayer]
        });
      } else {
        replaceLayerLists[compIndex].layers.push(currentLayer);
      }
    }
  });

  replaceLayerLists.forEach(set => {
    deepCompCopy(set.comp, set.layers);
  });
};

export const unselectAllItems = (): void => {
  times(app.project.numItems, i => {
    const current = app.project.item(i);
    if (current.selected) current.selected = false;
  });
};
