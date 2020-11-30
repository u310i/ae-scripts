import globalThis from "globalThis";
import "../../polyfill/json";
import "../../polyfill/array/forEach";
import {
  getItemAncestors,
  getLayerPath,
  LayerPath
} from "../../utils/GetEntity/getEntityPath";
import { times } from "../../utils/Javascript/general";
import {
  isCompItem,
  isFolderItem,
  isCompItems,
  isNumber,
  isString
} from "../../utils/typeCheck";
import {
  findItemWithName,
  findLayerWithName
} from "../../utils/GetEntity/getEntity";

const getItemFromPath = (path: string[]): CompItem | null => {
  let parent: FolderItem = app.project.rootFolder;
  let comp: CompItem | null = null;
  times(
    path.length,
    i => {
      let item: $T.ADBE.AnyItem | null = null;

      const itemName = path[i - 1];
      if (!isString(itemName)) {
        return true;
      }
      item = findItemWithName(itemName, parent);

      if (i === 1) {
        if (!isCompItem(item)) {
          return true;
        }
        comp = item;
        return true;
      }

      if (item) {
        if (!isFolderItem(item)) {
          return true;
        }
        parent = item;
        return;
      }
      return true;
    },
    true
  );
  return comp;
};

// DIALOG
// ======
const dialog = new Window("dialog");
dialog.text = "Correction-CompDuration";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;

const saveDuration = dialog.add("button", undefined, undefined, {
  name: "saveDuration"
});
saveDuration.text = "saveDuration";

const setDuration = dialog.add("button", undefined, undefined, {
  name: "setDuration"
});
setDuration.text = "setDuration";

type DurationData = {
  duration: number;
  path: string[];
};

saveDuration.onClick = () => {
  const file = File.saveDialog("Save", "*.json");
  file.encoding = "utf-8";
  file.lineFeed = "Unix";

  let durationDataSet: DurationData[] = [];
  times(app.project.numItems, index => {
    const item = app.project.item(index);

    if (!isCompItem(item)) return;

    let ancestors: string[] = [];
    getItemAncestors(item, parent => {
      ancestors.push(parent.name);
    });
    const path = [item.name, ...ancestors];
    const duration = item.duration;

    durationDataSet.push({
      duration: duration,
      path: path
    });
  });

  let result = false;
  file.open("w");
  result = file.write(JSON.stringify(durationDataSet));
  file.close();

  if (result) {
    alert("success");
  } else {
    alert("It was not saved correctly.");
  }
};

setDuration.onClick = () => {
  const file = File.openDialog("Import", "*.json");
  file.encoding = "utf-8";
  file.lineFeed = "Unix";

  file.open("r");
  const readFile = file.read();
  file.close();

  const durationDataSet = JSON.parse(readFile) as DurationData[];

  app.beginUndoGroup("Correction-CompDuration");

  durationDataSet.forEach(({ path, duration }) => {
    const item = getItemFromPath(path);
    if (!item) return;
    item.duration = 9999.0;
    item.duration = duration;
  });

  app.endUndoGroup();

  alert("success");
};

dialog.show();
