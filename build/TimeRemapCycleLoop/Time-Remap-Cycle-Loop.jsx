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
})();var showErrorAlert = function showErrorAlert(line, description) {
  alert("".concat(line, "\n").concat(description));
};var __Error__ = function __Error__(line, description) {
  showErrorAlert(line, description);
};var isCompItem = function isCompItem(item) {
  return item instanceof CompItem;
};
var isAVLayer = function isAVLayer(layer) {
  return layer instanceof AVLayer;
};var defaultOptions = {
  cycle: false
};
var errorName = "timeRemapping";
var timeRemapping = function timeRemapping(layer) {
  var options = arguments.length > 1 && ((arguments[1] !== undefined)) ? ((arguments[1])) : ((defaultOptions));

  if (!isAVLayer(layer)) {
    __Error__($.line, "".concat(errorName, "\ngetItemWithPathArray\nThis layer is not an AV layer."));

    return;
  }

  if (!layer.canSetTimeRemapEnabled || (!layer.source)) {
    __Error__($.line, "".concat(errorName, "\nTime remapping cannot be set for this layer."));

    return;
  }

  var thisComp = layer.containingComp;
  var frameRate = thisComp.frameRate;
  var oneFrameTime = 1 / frameRate;
  var trStartTime = layer.inPoint;
  var trEndTime = layer.outPoint - oneFrameTime;
  var trReStartTime = layer.outPoint;
  layer.timeRemapEnabled = true;
  var timeRemapProp = layer.property("ADBE Time Remapping");
  var trStartValue = timeRemapProp.valueAtTime(trStartTime, true);
  var trEndValue = timeRemapProp.valueAtTime(trEndTime, true);
  var trReStartValue = trStartValue;

  if (options.cycle) {
    timeRemapProp.setValuesAtTimes([trStartTime, trEndTime, trReStartTime], [trStartValue, trEndValue, trReStartValue]);
  } else {
    timeRemapProp.setValuesAtTimes([trStartTime, trEndTime], [trStartValue, trEndValue]);
  }

  var startTime = layer.startTime;

  try {
    if (trStartTime !== startTime) {
      timeRemapProp.removeKey(1);
    }
  } catch (e) {
    __Error__($.line, "".concat(errorName, "\nRemove Start Key Error\n").concat(e));
  }

  var endTime = layer.startTime + layer.source.duration;
  var endKeyIndex = timeRemapProp.nearestKeyIndex(endTime);
  var difference = Math.abs(trReStartTime - timeRemapProp.keyTime(endKeyIndex));

  try {
    if (options.cycle) {
      if (difference > oneFrameTime / 10) {
        timeRemapProp.removeKey(endKeyIndex);
      }
    } else {
      timeRemapProp.removeKey(endKeyIndex);
    }
  } catch (e) {
    __Error__($.line, "".concat(errorName, "\nRemove End Key Error\n").concat(e));
  }
};var timeRemapCycleLoop = function timeRemapCycleLoop() {
  var type = arguments.length > 0 && ((arguments[0] !== undefined)) ? ((arguments[0])) : (("cycle"));
  app.beginUndoGroup("Time-Remap-Loop");
  var activeComp = app.project.activeItem;

  if (!isCompItem(activeComp)) {
    alert("The selected item is not a composition.");
    return;
  }

  var layers = activeComp.selectedLayers;
  layers.forEach(function (layer) {
    if (!isAVLayer(layer)) {
      alert("The selected layers include those that are not AV layers.");
      return;
    }

    if (!layer.canSetTimeRemapEnabled || (!layer.source)) {
      alert("Selected layers include layers that cannot be time remapping.");
      return;
    }

    timeRemapping(layer, {
      cycle: true
    });
    var timeRemapProp = layer.property("ADBE Time Remapping");

    if (!timeRemapProp.canSetExpression) {
      alert("The expression cannot be set.");
      return;
    }

    timeRemapProp.expression = "loopOut(type = \"".concat(type, "\", numKeyframes = 0)");
  });
  app.endUndoGroup();
};

timeRemapCycleLoop();}());