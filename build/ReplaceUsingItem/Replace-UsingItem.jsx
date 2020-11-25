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
})();var dialog = globalThis; // DIALOG
// ======

dialog.text = "Replace-UsingItem";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16; // setButton
// ======

var setButton = dialog.add("button", undefined, undefined, {
  name: "setButton"
});
setButton.text = "set source"; // setNameGroup
// ======

var setNameGroup = dialog.add("group", undefined, {
  name: "setNameGroup"
});
setNameGroup.orientation = "row";
setNameGroup.alignChildren = ["left", "center"];
setNameGroup.spacing = 10;
setNameGroup.margins = 0;
var setNameDedscription = setNameGroup.add("statictext", undefined, undefined, {
  name: "setNameDedscription"
});
setNameDedscription.text = "name: ";
var nameText = setNameGroup.add("statictext", undefined, undefined, {
  name: "nameText"
});
nameText.text = "";
nameText.preferredSize.width = 80; // confirmGroup
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
ok.text = "Select target and OK";
ok.justify = "left";
ok.alignment = ["left", "center"];var times = function times(step, callback) {
  for (var i = 1; i <= step; i++) {
    if (callback(i)) {
      break;
    } else {
      continue;
    }
  }
};var isCompItem = function isCompItem(item) {
  return item instanceof CompItem;
};
var isFootageItem = function isFootageItem(item) {
  return item instanceof FootageItem;
};
var isAVItem = function isAVItem(item) {
  return isCompItem(item) || (isFootageItem(item));
};
var isAVLayer = function isAVLayer(layer) {
  return layer instanceof AVLayer;
};var getSelectedItems = function getSelectedItems() {
  var items = app.project.selection;
  return items[0] ? (items) : (null);
};var main = function main() {
  // event
  // ======
  var sourceItem;

  setButton.onClick = function () {
    var items = getSelectedItems();

    if (!items) {
      return;
    }

    if (!isAVItem(items[0])) {
      alert("No avitem is selected.");
      return;
    }

    sourceItem = items[0];
    nameText.text = sourceItem.name;
  };

  ok.onClick = function () {
    var items = getSelectedItems();

    if (!items) {
      return;
    }

    var targetItem = items[0];

    if (!isAVItem(targetItem)) {
      alert("No avitem is selected.");
      return;
    }

    if (!isAVItem(sourceItem)) {
      alert("No avitem is selected.");
      return;
    }

    var compItems = sourceItem.usedIn;
    compItems.forEach(function (compItem, i) {
      times(compItem.numLayers, function (i) {
        var layer = compItem.layer(i);
        if (!isAVLayer(layer)) return;
        if (layer.source !== sourceItem) return;
        layer.replaceSource(targetItem, false);
      });
    });
  }; // ======


  dialog.layout.layout();
  dialog.layout.resize();
};

main();}(this));