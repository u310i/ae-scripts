import "../../polyfill/array/forEach";
import pref from "../../utils/System/pref";
import * as win from "./ui";
import jsonFormat from "json-format";

import { getSelectedItems } from "../../utils/GetEntity/getSelectedEntity";
import { unselectAllItems } from "../../utils/item";
import { LayerPath } from "../../utils/GetEntity/getEntityPath";
import { getLayersSwitcher, SwitchList, getLayerFromPath } from "./utils";
import { times } from "../../utils/Javascript/general";

type JsonObjType = {
  name?: string;
  switchList: SwitchList;
};

const insertFileInput = (file: File) => {
  if (!file) return;
  file.encoding = "utf-8";
  file.lineFeed = "Unix";

  const fileName = file.name
    .split(".")
    .slice(0, -1)
    .join(".");

  win.pathInput.text = file.path;
  win.fileNameInput.text = fileName;
};

const main = () => {
  if (!pref.isSecurityPrefSet()) {
    alert(
      "You need to allow the script to write files and access the network."
    );
  }

  win.importButton.onClick = () => {
    const file = File.openDialog("Import", "*.json");
    insertFileInput(file);
  };

  win.newButton.onClick = () => {
    const file = File.saveDialog("Save", "*.json");
    insertFileInput(file);
  };

  win.addButton.onClick = () => {
    if (!win.pathInput.text || !win.fileNameInput.text) {
      alert("Please specify the file.");
      return;
    }

    const file = new File(
      win.pathInput.text + "/" + win.fileNameInput.text + ".json"
    );
    file.encoding = "utf-8";
    file.lineFeed = "Unix";

    file.open("r");
    const content = file.read();
    file.close();

    let jsonObj: JsonObjType = { switchList: [] };
    if (content) {
      try {
        jsonObj = JSON.parse(content) as JsonObjType;
      } catch (e) {
        alert(e);
        return;
      }
    }

    const newLayersSwitcher = getLayersSwitcher();
    if (!newLayersSwitcher) {
      return;
    }

    jsonObj.switchList = jsonObj.switchList.concat(newLayersSwitcher);

    const parentFolder = file.parent;
    if (!parentFolder.exists) {
      alert("There is no parent folder.");
      return;
    }

    let result = true;
    file.open("w");
    result = file.write(jsonFormat(jsonObj));
    file.close();

    if (result) {
    } else {
      alert("It was not saved correctly.");
    }
  };

  win.switchButton.onClick = () => {
    if (!win.pathInput.text || !win.fileNameInput.text) {
      alert("Please specify the file.");
      return;
    }

    const file = new File(
      win.pathInput.text + "/" + win.fileNameInput.text + ".json"
    );
    file.encoding = "utf-8";
    file.lineFeed = "Unix";

    file.open("r");
    const content = file.read();
    file.close();

    let jsonObj: JsonObjType = { switchList: [] };
    if (content) {
      try {
        jsonObj = JSON.parse(content) as JsonObjType;
      } catch (e) {
        alert(e);
        return;
      }
    } else {
      alert("The file does not exist.");
    }

    jsonObj.switchList.forEach((layerSwitch, i) => {
      const layer = getLayerFromPath(layerSwitch.path);
      if (!layer) {
        return;
      }

      if (win.toggleCheck.value) {
        layer.enabled = !layer.enabled;
      } else {
        if (win.invertCheck.value) {
          layer.enabled = !layerSwitch.enabled;
        } else {
          layer.enabled = layerSwitch.enabled;
        }
      }
    });
  };

  // ======
  win.dialog.layout.layout();
  win.dialog.layout.resize();
};

main();
