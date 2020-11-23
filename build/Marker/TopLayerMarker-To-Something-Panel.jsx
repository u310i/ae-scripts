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
})();if (!Array.prototype.every) {
  Array.prototype.every = function (callbackfn, thisArg) {

    var T, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    } // 1. O は、this を引数として ToObject に渡し、実行した結果です。


    var O = Object(this); // 2. lenValue は、"length" を引数として O の Get 内部メソッドを実行した結果です。
    // 3. len を ToUint32(lenValue) とします。

    var len = O.length >>> 0; // 4. IsCallable(callbackfn) が false の場合、TypeError 例外がスローされます。

    if (typeof callbackfn !== "function") {
      throw new TypeError();
    } // 5. thisArg が与えられた場合、T は thisArg となり、さもなくば T は undefined となります。


    if (arguments.length > 1) {
      T = thisArg;
    } // 6. k を 0 とします。


    k = 0; // 7. k < len が成り立つ間、繰り返します。

    while (k < len) {
      var kValue; // a. Pk を ToString(k) とします。
      //    これは in 演算子の左オペランドについて暗黙的です。
      // b. kPresent は、Pk を引数として O の HasProperty 内部メソッドを実行した結果です。
      //   このステップは c と組み合わせられます。
      // c. kPresent が true の場合、続きます。

      if (k in O) {
        // i. kValue は、Pk を引数として O の Get 内部メソッドを実行した結果です。
        kValue = O[k]; // ii. testResult は、this 値としての T と、kValue、k、0 を含む引数リストを
        //     ともなって、callbackfn の Call 内部メソッドを実行した結果です。

        var testResult = callbackfn.call(T, kValue, k, O); // iii. ToBoolean(testResult) が false の場合、false を返します。

        if (!testResult) {
          return false;
        }
      }

      k++;
    }

    return true;
  };
}var dialog = globalThis; // DIALOG
// ======

dialog.text = "TopLayerMarker-To-Something-Panel";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16; // methodGroup
// ======

var methodGroup = dialog.add("group", undefined, {
  name: "methodGroup"
});
methodGroup.orientation = "row";
methodGroup.alignChildren = ["left", "center"];
methodGroup.spacing = 10;
methodGroup.margins = 0;
var topLayerMarkerToCompMarkerRadio = methodGroup.add("radiobutton", undefined, undefined, {
  name: "topLayerMarkerToCompMarkerRadio"
});
topLayerMarkerToCompMarkerRadio.text = "topLayerMarkerToCompMarkerRadio";
var topLayerMarkerToTopLayerRadio = methodGroup.add("radiobutton", undefined, undefined, {
  name: "topLayerMarkerToTopLayerRadio"
});
topLayerMarkerToTopLayerRadio.text = "topLayerMarkerToTopLayerRadio"; // setButton
// ======

var setButton = dialog.add("button", undefined, undefined, {
  name: "setButton"
});
setButton.text = "set source"; // idGroup
// ======

var idGroup = dialog.add("group", undefined, {
  name: "idGroup"
});
idGroup.orientation = "row";
idGroup.alignChildren = ["left", "center"];
idGroup.spacing = 10;
idGroup.margins = 0;
var idDescription = idGroup.add("statictext", undefined, undefined, {
  name: "idDescription"
});
idDescription.text = "ID: ";
var idText = idGroup.add("edittext", undefined, undefined, {
  name: "idText"
});
idText.text = "";
idText.preferredSize.width = 80; // confirmGroup
// ======

var confirmGroup = dialog.add("group", undefined, {
  name: "confirmGroup"
});
confirmGroup.orientation = "row";
confirmGroup.alignChildren = ["left", "center"];
confirmGroup.spacing = 10;
confirmGroup.margins = 0;
confirmGroup.alignment = ["right", "top"];
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
};var getSelectedItems = function getSelectedItems() {
  var items = app.project.selection;
  return items[0] ? (items) : (null);
};var extractTopLayerMarkers = function extractTopLayerMarkers(item) {
  var sourceLayer = item.layer(1);

  if (sourceLayer.property("marker") === null) {
    alert("There are no markers.");
    return null;
  }

  var sourceMarkers = sourceLayer.property("marker");

  if (sourceMarkers.numKeys === 0) {
    alert("There are 0 markers.");
    return null;
  }

  var extractedMarkers = [];
  times(sourceMarkers.numKeys, function (i) {
    extractedMarkers.push([sourceMarkers.keyTime(i), sourceMarkers.keyValue(i)]);
  });
  return extractedMarkers;
};var topLayerMarkerToCompMarker = function topLayerMarkerToCompMarker(sourceItem, targetItems) {
  var extractedMarkers = extractTopLayerMarkers(sourceItem);
  if (!extractedMarkers) return;
  app.beginUndoGroup("TopLayerMarkerToTopLayer");
  targetItems.forEach(function (item) {
    if (!isCompItem(item)) {
      alert("No composition is selected.");
      return;
    }

    extractedMarkers.forEach(function (_, i) {
      item.markerProperty.setValueAtTime(extractedMarkers[i][0], extractedMarkers[i][1]);
    });
  });
  app.endUndoGroup();
};var topLayerMarkerToTopLayer = function topLayerMarkerToTopLayer(sourceItem, targetItems) {
  var extractedMarkers = extractTopLayerMarkers(sourceItem);
  if (!extractedMarkers) return;
  app.beginUndoGroup("TopLayerMarkerToTopLayer");
  targetItems.forEach(function (item) {
    if (!isCompItem(item)) {
      alert("No composition is selected.");
      return;
    }

    var targetLayer = item.layer(1);
    var targetMarker = targetLayer.property("marker");
    extractedMarkers.forEach(function (_, i) {
      targetMarker.setValueAtTime(extractedMarkers[i][0], extractedMarkers[i][1]);
    });
  });
  app.endUndoGroup();
};var isCompItems = function isCompItems(items) {
  return items.every(isCompItem);
};

var main = function main() {
  var sourceItem; // event
  // ======

  setButton.onClick = function () {
    var items = getSelectedItems();

    if (!items) {
      return;
    }

    if (!isCompItem(items[0])) {
      alert("No compitem is selected.");
      return;
    }

    sourceItem = items[0];
    idText.text = sourceItem.id.toString();
  };

  ok.onClick = function () {
    var targetItems = getSelectedItems();

    if (!targetItems) {
      return;
    }

    if (!isCompItems(targetItems)) {
      alert("No compitem is selected.");
      return;
    }

    if (topLayerMarkerToCompMarkerRadio.value) {
      topLayerMarkerToCompMarker(sourceItem, targetItems);
    }

    if (topLayerMarkerToTopLayerRadio.value) {
      topLayerMarkerToTopLayer(sourceItem, targetItems);
    }
  }; // ======


  dialog.layout.layout();
  dialog.layout.resize();
};

main();}(this));