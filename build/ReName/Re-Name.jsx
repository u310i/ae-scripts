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
})();var isPanel = globalThis instanceof Panel;
var dialog = isPanel ? (globalThis) : (new Window("dialog")); // dialog
// ======

dialog.text = "Re-Name";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 5;
dialog.margins = 16; // targetEntityRadioGroup
// ======

var targetEntityRadioGroup = dialog.add("group", undefined, {
  name: "targetEntityRadioGroup"
});
targetEntityRadioGroup.orientation = "row";
targetEntityRadioGroup.alignChildren = ["left", "center"];
targetEntityRadioGroup.spacing = 10;
targetEntityRadioGroup.margins = 0;
var itemRadio = targetEntityRadioGroup.add("radiobutton", undefined, undefined, {
  name: "itemRadio"
});
itemRadio.text = "project Item";
var layerRadio = targetEntityRadioGroup.add("radiobutton", undefined, undefined, {
  name: "layerRadio"
});
layerRadio.text = "Layer"; // targetPropRadioGroup
// ======

var targetPropRadioGroup = dialog.add("group", undefined, {
  name: "targetPropRadioGroup"
});
targetPropRadioGroup.orientation = "row";
targetPropRadioGroup.alignChildren = ["left", "center"];
targetPropRadioGroup.spacing = 10;
targetPropRadioGroup.margins = 0;
var nameRadio = targetPropRadioGroup.add("radiobutton", undefined, undefined, {
  name: "nameRadio"
});
nameRadio.text = "name";
var commentRadio = targetPropRadioGroup.add("radiobutton", undefined, undefined, {
  name: "commentRadio"
});
commentRadio.text = "comment";
var nameToCommentRadio = targetPropRadioGroup.add("radiobutton", undefined, undefined, {
  name: "nameToCommentRadio"
});
nameToCommentRadio.text = "NameToComment";
var commentToNameRadio = targetPropRadioGroup.add("radiobutton", undefined, undefined, {
  name: "commentToNameRadio"
});
commentToNameRadio.text = "CommentToName"; // methodRadioGroup
// ======

var methodRadioGroup = dialog.add("group", undefined, {
  name: "methodType"
});
methodRadioGroup.orientation = "row";
methodRadioGroup.alignChildren = ["left", "center"];
methodRadioGroup.spacing = 10;
methodRadioGroup.margins = 0;
var insertRadio = methodRadioGroup.add("radiobutton", undefined, undefined, {
  name: "insertRadio"
});
insertRadio.text = "insert";
var replaceRadio = methodRadioGroup.add("radiobutton", undefined, undefined, {
  name: "replaceRadio"
});
replaceRadio.text = "replace"; // insertRadioGroup
// ======

var insertRadioGroup = dialog.add("group", undefined, {
  name: "insertType"
});
insertRadioGroup.orientation = "row";
insertRadioGroup.alignChildren = ["left", "center"];
insertRadioGroup.spacing = 10;
insertRadioGroup.margins = 0;
insertRadioGroup.indent = 20;
var insertAllRadio = insertRadioGroup.add("radiobutton", undefined, undefined, {
  name: "insertAllRadio"
});
insertAllRadio.text = "all";
insertAllRadio.value = true;
var insertHeadRadio = insertRadioGroup.add("radiobutton", undefined, undefined, {
  name: "insertHeadRadio"
});
insertHeadRadio.text = "head";
var insertTailRadio = insertRadioGroup.add("radiobutton", undefined, undefined, {
  name: "insertTailRadio"
});
insertTailRadio.text = "tail"; // replaceRadioGroup
// ======

var replaceRadioGroup = dialog.add("group", undefined, {
  name: "replaceType"
});
replaceRadioGroup.orientation = "row";
replaceRadioGroup.alignChildren = ["left", "center"];
replaceRadioGroup.spacing = 10;
replaceRadioGroup.margins = 0;
replaceRadioGroup.indent = 20;
var replaceSimpleRadio = replaceRadioGroup.add("radiobutton", undefined, undefined, {
  name: "replaceSimpleRadio"
});
replaceSimpleRadio.text = "simple";
var replaceGlobRadio = replaceRadioGroup.add("radiobutton", undefined, undefined, {
  name: "replaceGlobRadio"
});
replaceGlobRadio.text = "advanced (glob)"; // searchGroup
// ======

var searchGroup = dialog.add("group", undefined, {
  name: "searchGroup"
});
searchGroup.orientation = "column";
searchGroup.alignChildren = ["left", "center"];
searchGroup.spacing = 0;
searchGroup.margins = 0;
var searchDesc = searchGroup.add("statictext", undefined, undefined, {
  name: "searchDesc"
});
searchDesc.text = "search:";
var searchInput = searchGroup.add("edittext", undefined, undefined, {
  name: "search"
});
searchInput.preferredSize.width = 240; // insertGroup
// ======

var insertGroup = dialog.add("group", undefined, {
  name: "insertGroup"
});
insertGroup.orientation = "column";
insertGroup.alignChildren = ["left", "center"];
insertGroup.spacing = 0;
insertGroup.margins = 0;
var inputDesc = insertGroup.add("statictext", undefined, undefined, {
  name: "inputDesc"
});
inputDesc.text = "insert string:";
var insertInput = insertGroup.add("edittext", undefined, undefined, {
  name: "insert"
});
insertInput.preferredSize.width = 240; // confirmGroup
// ======

var confirmGroup = dialog.add("group", undefined, {
  name: "confirmGroup"
});
confirmGroup.orientation = "row";
confirmGroup.alignChildren = ["left", "center"];
confirmGroup.spacing = 10;
confirmGroup.margins = 0;
confirmGroup.alignment = ["left", "top"];
confirmGroup.preferredSize.height = 40;
var ok = confirmGroup.add("button", undefined, undefined, {
  name: "ok"
});
ok.text = "OK";
ok.justify = "left";
ok.alignment = ["left", "center"];var isFunction = function isFunction(data) {
  return typeof data === "function";
};var getActiveItem = function getActiveItem() {
  var item = app.project.activeItem;
  return item || (null);
};
var getActiveCompItem = function getActiveCompItem() {
  var item = getActiveItem();
  return item instanceof CompItem ? (item) : (null);
};var getSelectedItems = function getSelectedItems() {
  var items = app.project.selection;
  return items[0] ? (items) : (null);
};
var getSelectedLayers = function getSelectedLayers(compItem) {
  var layers = compItem.selectedLayers;
  return layers[0] ? (layers) : (null);
};
var getSelectedLayersFromActive = function getSelectedLayersFromActive() {
  var compItem = getActiveCompItem();
  return compItem && (getSelectedLayers(compItem));
};var addString = function addString(entity, source, target, text) {
  app.beginUndoGroup("Add-Comment");
  var entities = entity === "item" ? (getSelectedItems()) : (entity === "layer" ? (getSelectedLayersFromActive()) : (null));
  entities && (entities.forEach(function (entity) {
    entity[target] = isFunction(text) ? (text(entity[source]) || (entity[target])) : (text);
  }));
  app.endUndoGroup();
};var escapeRegex = function escapeRegex(str) {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};
var escapeGlob = function escapeGlob(str) {
  return str.replace(/[-\/\\^$+.()|[\]{}]/g, "\\$&");
};
var simpleGlobToRegexp = function simpleGlobToRegexp(glob) {
  var escapedString = escapeGlob(glob);
  var offsetIncrement = 0;
  var regexpString = escapedString.replace(/(\*|\?+)/g, function (match, string, offset) {
    // Since offset is performed on the replaced string, the increment of the replaced string is added to offset.
    var trueOffset = offset - offsetIncrement;

    if (match === "*") {
      if (trueOffset - offsetIncrement > 0 && (escapedString.substr(trueOffset - 1 - offsetIncrement, 1) === "\\")) {
        offsetIncrement += 1;
        return "\\*";
      }

      offsetIncrement += 3;
      return "(.*)";
    }

    if (/\?+/.test(match)) {
      if (trueOffset > 0 && (escapedString.substr(trueOffset - 1, 1) === "\\")) {
        if (match.length > 1) {
          offsetIncrement += 3;
          return "\\?(".concat(match.substr(1).replace(/\?/g, "."), ")");
        }

        offsetIncrement += 1;
        return "\\?";
      }

      offsetIncrement += 2;
      return "(".concat(match.replace(/\?/g, "."), ")");
    }

    return "";
  });
  return new RegExp(regexpString);
};
var renameWithSimpleGlob = function renameWithSimpleGlob(targetString, glob, replaceStr) {
  var regexp = simpleGlobToRegexp(glob);
  var newString = targetString.replace(regexp, replaceStr);
  return newString;
};var main = function main() {
  // initialize
  // ======
  itemRadio.value = true;
  nameRadio.value = true;
  insertRadio.value = true;
  replaceSimpleRadio.value = true;
  searchGroup.enabled = false;
  replaceRadioGroup.enabled = false; // event
  // ======

  insertRadio.onActivate = function () {
    searchGroup.enabled = false;
    insertRadioGroup.enabled = true;
    replaceRadioGroup.enabled = false;
  };

  replaceRadio.onActivate = function () {
    searchGroup.enabled = true;
    insertRadioGroup.enabled = false;
    replaceRadioGroup.enabled = true;
  };

  ok.onClick = function () {
    var addStringCallback;
    var replaceText = insertInput.text;
    var searchText = searchInput.text;

    if (insertRadio.value) {
      if (insertAllRadio.value) {
        addStringCallback = function addStringCallback() {
          return replaceText;
        };
      }

      if (insertHeadRadio.value) {
        addStringCallback = function addStringCallback(prev) {
          return replaceText + prev;
        };
      }

      if (insertTailRadio.value) {
        addStringCallback = function addStringCallback(prev) {
          return prev + replaceText;
        };
      }
    }

    if (replaceRadio.value) {
      if (replaceSimpleRadio.value) {
        addStringCallback = function addStringCallback(prev) {
          var regexp = new RegExp(escapeRegex(searchText));
          return prev.replace(regexp, replaceText);
        };
      }

      if (replaceGlobRadio.value) {
        addStringCallback = function addStringCallback(prev) {
          var newString = renameWithSimpleGlob(prev, searchText, replaceText);
          return newString;
        };
      }
    }

    if (addStringCallback !== undefined) {
      var entity = itemRadio.value ? ("item") : (layerRadio.value ? ("layer") : (null));
      if (!entity) return;
      var source = nameRadio.value || (nameToCommentRadio.value) ? ("name") : (commentRadio.value || (commentToNameRadio.value) ? ("comment") : (null));
      if (!source) return;
      var target = nameRadio.value || (commentToNameRadio.value) ? ("name") : (commentRadio.value || (nameToCommentRadio.value) ? ("comment") : (null));
      if (!target) return;
      addString(entity, source, target, addStringCallback);
    }

    !isPanel && (dialog.close());
  }; // ======


  dialog.layout.layout();
  !isPanel && (dialog.show());
};

main();}(this));