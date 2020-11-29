(function(globalThis){'use strict';globalThis=globalThis&&Object.prototype.hasOwnProperty.call(globalThis,'default')?globalThis['default']:globalThis;/*
 * forEach Polyfill
 *
 * 2015-12-27
 *
 * By Feifei Hang, http://feifeihang.info
 * Public Domain.
 * NO WARRANTY EXPRESSED OR IMPLIED. USE AT YOUR OWN RISK.
 */

(function () {
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = function forEach(callback, thisArg) {
      if (typeof callback !== "function") {
        throw new TypeError(callback + " is not a function");
      }

      var array = this;
      thisArg = thisArg || (this);

      for (var i = 0, l = array.length; i !== l; ++i) {
        callback.call(thisArg, array[i], i, array);
      }
    };
  }
})();// Allow Scripts to Write Files and Access Network
var isSecurityPrefSet = function isSecurityPrefSet() {
  var securitySetting = app.preferences.getPrefAsLong("Main Pref Section", "Pref_SCRIPTING_FILE_NETWORK_SECURITY");
  return securitySetting === 1;
};

var pref = {
  isSecurityPrefSet: isSecurityPrefSet
};var dialog = globalThis; // DIALOG
// ======

dialog.text = "Add-Comment";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16; // fileDialogButtonGroup
// ======

var fileDialogButtonGroup = dialog.add("group", undefined, {
  name: "fileDialogButtonGroup"
});
fileDialogButtonGroup.orientation = "row";
fileDialogButtonGroup.alignChildren = ["left", "center"];
fileDialogButtonGroup.spacing = 10;
fileDialogButtonGroup.margins = 0;
var importButton = fileDialogButtonGroup.add("button", undefined, undefined, {
  name: "importButton"
});
importButton.text = "import";
var newButton = fileDialogButtonGroup.add("button", undefined, undefined, {
  name: "newButton"
});
newButton.text = "new";
var pathInput = dialog.add("edittext", undefined, undefined, {
  name: "numInput"
});
pathInput.text = "";
pathInput.preferredSize.width = 240; // fileNameGroup
// ======

var fileNameGroup = dialog.add("group", undefined, {
  name: "fileNameGroup"
});
fileNameGroup.orientation = "row";
fileNameGroup.alignChildren = ["left", "center"];
fileNameGroup.spacing = 10;
fileNameGroup.margins = 0;
var fileNameInput = fileNameGroup.add("edittext", undefined, undefined, {
  name: "fileName"
});
fileNameInput.text = "";
fileNameInput.preferredSize.width = 160;
var extensionText = fileNameGroup.add("statictext", undefined, undefined, {
  name: "extensionText"
});
extensionText.text = ".json"; // optionGroup
// ======

var optionGroup = dialog.add("group", undefined, {
  name: "optionGroup"
});
optionGroup.orientation = "row";
optionGroup.alignChildren = ["left", "center"];
optionGroup.spacing = 10;
optionGroup.margins = 0;
var invertCheck = optionGroup.add("checkbox", undefined, undefined, {
  name: "invertCheck"
});
invertCheck.text = "invert";
var toggleCheck = optionGroup.add("checkbox", undefined, undefined, {
  name: "toggleCheck"
});
toggleCheck.text = "toggle"; // buttonGroup
// ======

var buttonGroup = dialog.add("group", undefined, {
  name: "buttonGroup"
});
buttonGroup.orientation = "row";
buttonGroup.alignChildren = ["left", "center"];
buttonGroup.spacing = 10;
buttonGroup.margins = 0;
var addButton = buttonGroup.add("button", undefined, undefined, {
  name: "addButton"
});
addButton.text = "add";
var switchButton = buttonGroup.add("button", undefined, undefined, {
  name: "switchButton"
});
switchButton.text = "switch";/*
  change for npm modules.
  by Luiz Estácio.

  json-format v.1.1
  http://github.com/phoboslab/json-format

  Released under MIT license:
  http://www.opensource.org/licenses/mit-license.php
*/
var p = [],
    indentConfig = {
  tab: {
    "char": '\t',
    size: 1
  },
  space: {
    "char": ' ',
    size: 4
  }
},
    configDefault = {
  type: 'tab'
},
    push = function push(m) {
  return '\\' + p.push(m) + '\\';
},
    pop = function pop(m, i) {
  return p[i - 1];
},
    tabs = function tabs(count, indentType) {
  return new Array(count + 1).join(indentType);
};

function JSONFormat(json, indentType) {
  p = [];
  var out = "",
      indent = 0; // Extract backslashes and strings

  json = json.replace(/\\./g, push).replace(/(".*?"|'.*?')/g, push).replace(/\s+/, ''); // Indent and insert newlines

  for (var i = 0; i < json.length; i++) {
    var c = json.charAt(i);

    switch (c) {
      case '{':
      case '[':
        out += c + "\n" + tabs(++indent, indentType);
        break;

      case '}':
      case ']':
        out += "\n" + tabs(--indent, indentType) + c;
        break;

      case ',':
        out += ",\n" + tabs(indent, indentType);
        break;

      case ':':
        out += ": ";
        break;

      default:
        out += c;
        break;
    }
  } // Strip whitespace from numeric arrays and put backslashes 
  // and strings back in


  out = out.replace(/\[[\d,\s]+?\]/g, function (m) {
    return m.replace(/\s/g, '');
  }).replace(/\\(\d+)\\/g, pop) // strings
  .replace(/\\(\d+)\\/g, pop); // backslashes in strings

  return out;
}

var jsonFormat = function jsonFormat(json, config) {
  config = config || (configDefault);
  var indent = indentConfig[config.type];

  if (indent == null) {
    throw new Error('Unrecognized indent type: "' + config.type + '"');
  }

  var indentType = new Array((config.size || (indent.size)) + 1).join(indent["char"]);
  return JSONFormat(JSON.stringify(json), indentType);
};// Production steps of ECMA-262, Edition 5, 15.4.4.17
// Reference: http://es5.github.io/#x15.4.4.17
if (!Array.prototype.some) {
  Array.prototype.some = function (fun, thisArg) {

    if (this == null) {
      throw new TypeError("Array.prototype.some called on null or undefined");
    }

    if (typeof fun !== "function") {
      throw new TypeError();
    }

    var t = Object(this);
    var len = t.length >>> 0;
    var thisArg = arguments.length >= 2 ? (arguments[1]) : (void 0);

    for (var i = 0; i < len; i++) {
      if (i in t && (fun.call(thisArg, t[i], i, t))) {
        return true;
      }
    }

    return false;
  };
}var times = function times(step, callback) {
  var reverse = arguments.length > 2 && ((arguments[2] !== undefined)) ? ((arguments[2])) : ((false));

  if (reverse) {
    for (var i = step; i > 0; i--) {
      if (callback(i)) {
        break;
      } else {
        continue;
      }
    }
  } else {
    for (var _i = 1; _i <= step; _i++) {
      if (callback(_i)) {
        break;
      } else {
        continue;
      }
    }
  }
};var isFolderItem = function isFolderItem(item) {
  return item instanceof FolderItem;
};
var isCompItem = function isCompItem(item) {
  return item instanceof CompItem;
};var getActiveItem = function getActiveItem() {
  var item = app.project.activeItem;
  return item || (null);
};
var getActiveCompItem = function getActiveCompItem() {
  var item = getActiveItem();
  return item instanceof CompItem ? (item) : (null);
};
var getChildItems = function getChildItems() {
  var folder = arguments.length > 0 && ((arguments[0] !== undefined)) ? ((arguments[0])) : ((app.project.rootFolder));
  var callback = arguments.length > 1 ? ((arguments[1])) : ((undefined));
  var items = [];
  times(folder.numItems, function (index) {
    var item = folder.item(index);
    if (callback && (!callback(item))) return;
    items.push(item);
  });
  return items;
};
var findItemWithName = function findItemWithName(name) {
  var parent = arguments.length > 1 && ((arguments[1] !== undefined)) ? ((arguments[1])) : ((app.project.rootFolder));
  var item = null;
  getChildItems(parent).some(function (current) {
    if (current.name === name) {
      item = current;
      return true;
    }

    return false;
  });
  return item;
};
var findLayerWithName = function findLayerWithName(name, comp) {
  var layer = comp.layer(name);
  return layer ? (layer) : (null);
};var getSelectedLayers = function getSelectedLayers(compItem) {
  var layers = compItem.selectedLayers;
  return layers[0] ? (layers) : (null);
};
var getSelectedLayersFromActive = function getSelectedLayersFromActive() {
  var compItem = getActiveCompItem();
  return compItem && (getSelectedLayers(compItem));
};var getItemAncestors = function getItemAncestors(item, callback) {
  var root = arguments.length > 2 && ((arguments[2] !== undefined)) ? ((arguments[2])) : ((app.project.rootFolder));
  var parent = item.parentFolder;

  if (parent === root || (parent === app.project.rootFolder)) {
    return null;
  } else {
    callback(parent);
    return getItemAncestors(parent, callback, root);
  }
};
var getLayerPath = function getLayerPath(item, layer) {
  var ancestors = [];
  getItemAncestors(item, function (parent) {
    ancestors.push(parent.name);
  });

  if (!ancestors) {
    return null;
  }

  var path = [layer.name, item.name].concat(ancestors);
  return path;
};var getLayersSwitcher = function getLayersSwitcher() {
  var activeItem = getActiveCompItem();
  var layers = getSelectedLayersFromActive();

  if (!activeItem || (!layers) || (!layers[0])) {
    alert("Please select a layer.");
    return;
  }

  var layerPathList = [];
  layers.forEach(function (layer, i) {
    if (!layer.hasVideo) {
      return;
    }

    var arrayPath = getLayerPath(activeItem, layer);

    if (!arrayPath) {
      return;
    }

    layerPathList.push({
      enabled: layer.enabled,
      path: arrayPath
    });
  });
  return layerPathList;
};
var getLayerFromPath = function getLayerFromPath(path) {
  var parent = app.project.rootFolder;
  var comp = null;
  var layer = null;
  times(path.length, function (i) {
    var item = null;

    if (i === 1) {
      if (!comp) {
        return true;
      }

      layer = findLayerWithName(path[i - 1], comp);
      return true;
    }

    item = findItemWithName(path[i - 1], parent);

    if (i === 2) {
      if (!isCompItem(item)) {
        return true;
      }

      comp = item;
      return;
    }

    if (item) {
      if (!isFolderItem(item)) {
        return true;
      }

      parent = item;
      return;
    }

    return true;
  }, true);
  return layer;
};var insertFileInput = function insertFileInput(file) {
  if (!file) return;
  file.encoding = "utf-8";
  file.lineFeed = "Unix";
  var fileName = file.name.split(".").slice(0, -1).join(".");
  pathInput.text = file.path;
  fileNameInput.text = fileName;
};

var main = function main() {
  if (!pref.isSecurityPrefSet()) {
    alert("You need to allow the script to write files and access the network.");
  }

  importButton.onClick = function () {
    var file = File.openDialog("Import", "*.json");
    insertFileInput(file);
  };

  newButton.onClick = function () {
    var file = File.saveDialog("Save", "*.json");
    insertFileInput(file);
  };

  addButton.onClick = function () {
    if (!pathInput.text || (!fileNameInput.text)) {
      alert("Please specify the file.");
      return;
    }

    var file = new File(pathInput.text + "/" + fileNameInput.text + ".json");
    file.encoding = "utf-8";
    file.lineFeed = "Unix";
    file.open("r");
    var content = file.read();
    file.close();
    var jsonObj = {
      switchList: []
    };

    if (content) {
      try {
        jsonObj = JSON.parse(content);
      } catch (e) {
        alert(e);
        return;
      }
    }

    var newLayersSwitcher = getLayersSwitcher();

    if (!newLayersSwitcher) {
      return;
    }

    jsonObj.switchList = jsonObj.switchList.concat(newLayersSwitcher);
    var parentFolder = file.parent;

    if (!parentFolder.exists) {
      alert("There is no parent folder.");
      return;
    }

    var result = true;
    file.open("w");
    result = file.write(jsonFormat(jsonObj));
    file.close();

    if (result) ; else {
      alert("It was not saved correctly.");
    }
  };

  switchButton.onClick = function () {
    if (!pathInput.text || (!fileNameInput.text)) {
      alert("Please specify the file.");
      return;
    }

    var file = new File(pathInput.text + "/" + fileNameInput.text + ".json");
    file.encoding = "utf-8";
    file.lineFeed = "Unix";
    file.open("r");
    var content = file.read();
    file.close();
    var jsonObj = {
      switchList: []
    };

    if (content) {
      try {
        jsonObj = JSON.parse(content);
      } catch (e) {
        alert(e);
        return;
      }
    } else {
      alert("The file does not exist.");
    }

    jsonObj.switchList.forEach(function (layerSwitch, i) {
      var layer = getLayerFromPath(layerSwitch.path);

      if (!layer) {
        return;
      }

      if (toggleCheck.value) {
        layer.enabled = !layer.enabled;
      } else {
        if (invertCheck.value) {
          layer.enabled = !layerSwitch.enabled;
        } else {
          layer.enabled = layerSwitch.enabled;
        }
      }
    });
  }; // ======


  dialog.layout.layout();
  dialog.layout.resize();
};

main();}(this));