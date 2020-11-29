(function(){'use strict';/*
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
})();// DIALOG
// ======
var dialog = new Window("dialog");
dialog.text = "Check-Duration";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;
var numInput = dialog.add("edittext", undefined, undefined, {
  name: "numInput"
});
numInput.preferredSize.width = 60;
var okButton = dialog.add("button", undefined, undefined, {
  name: "ok"
});
okButton.text = "Button";var times = function times(step, callback) {
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
};var isCompItem = function isCompItem(item) {
  return item instanceof CompItem;
};var getAllItems = function getAllItems(callback) {
  var items = [];
  times(app.project.numItems, function (i) {
    var item = app.project.item(i);
    if (callback && (callback(item))) return;
    items.push(item);
  });
  return items;
};var getSelectedItems = function getSelectedItems() {
  var items = app.project.selection;
  return items[0] ? (items) : (null);
};var unselectAllItems = function unselectAllItems() {
  getAllItems().forEach(function (item) {
    if (item.selected) item.selected = false;
  });
};var main = function main() {
  // initialize
  numInput.text = "5";

  okButton.onClick = function () {
    var items = getSelectedItems();

    if (!items || (!items[0])) {
      items = getAllItems();
    }

    var num = parseInt(numInput.text, 10);
    unselectAllItems();
    items.forEach(function (item) {
      if (!isCompItem(item)) return;
      var frames = item.duration * item.frameRate;
      if (frames === 1) return;

      if (frames % num !== 0) {
        item.selected = true;
      }
    });
    dialog.close();
  };

  dialog.show();
};

main();}());