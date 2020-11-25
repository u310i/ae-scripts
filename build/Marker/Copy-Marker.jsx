(function (globalThis) {
  'use strict';

  globalThis = globalThis && Object.prototype.hasOwnProperty.call(globalThis, 'default') ? globalThis['default'] : globalThis;

  /*
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
  })();

  if (!Array.prototype.every) {
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
  }

  var dialog = globalThis; // DIALOG
  // ======

  dialog.text = "Copy-Marker";
  dialog.orientation = "column";
  dialog.alignChildren = ["left", "top"];
  dialog.spacing = 10;
  dialog.margins = 16; // methodGroup
  // ======

  var methodGroup = dialog.add("group", undefined, {
    name: "methodGroup"
  });
  methodGroup.orientation = "column";
  methodGroup.alignChildren = ["left", "center"];
  methodGroup.spacing = 10;
  methodGroup.margins = 0;
  var layersToCompRadio = methodGroup.add("radiobutton", undefined, undefined, {
    name: "Layers-To-Comp"
  });
  layersToCompRadio.text = "Layers-To-Comp";
  var topLayerToAnotherCompRadio = methodGroup.add("radiobutton", undefined, undefined, {
    name: "TopLayer-To-AnotherComp"
  });
  topLayerToAnotherCompRadio.text = "TopLayer-To-AnotherComp";
  var topLayerToAnotherCompTopLayerRadio = methodGroup.add("radiobutton", undefined, undefined, {
    name: "TopLayer-To-AnotherComp-TopLayer"
  });
  topLayerToAnotherCompTopLayerRadio.text = "TopLayer-To-AnotherComp-TopLayer";
  var removeAllCompMarkers = methodGroup.add("radiobutton", undefined, undefined, {
    name: "TopLayer-To-AnotherComp-TopLayer"
  });
  removeAllCompMarkers.text = "Remove-AllCompMarkers"; // setButton
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
    name: "edittext"
  });
  nameText.text = "";
  nameText.preferredSize.width = 80;
  nameText.enabled = false; // confirmGroup
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
  ok.alignment = ["left", "center"];

  var times = function times(step, callback) {
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
  };

  var isCompItem = function isCompItem(item) {
    return item instanceof CompItem;
  };

  var getSelectedItems = function getSelectedItems() {
    var items = app.project.selection;
    return items[0] ? (items) : (null);
  };

  var removeAllMarkers = function removeAllMarkers(markerProp) {
    times(markerProp.numKeys, function (i) {
      markerProp.removeKey(i);
    }, true);
  };
  var getMarkers = function getMarkers(markerProp) {
    var markers = [];
    times(markerProp.numKeys, function (i) {
      markers.push([markerProp.keyTime(i), markerProp.keyValue(i)]);
    });
    return markers;
  };
  var getTopLayerMarkers = function getTopLayerMarkers(item) {
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

    return getMarkers(sourceMarkers);
  };

  var removeAllCompMarkers$1 = function removeAllCompMarkers(items) {
    items.forEach(function (item) {
      removeAllMarkers(item.markerProperty);
    });
  };
  var layersToComp = function layersToComp(items) {
    items.forEach(function (item) {
      times(item.numLayers, function (i) {
        var layer = item.layer(i);
        var markerProp = layer.property("marker");

        if (markerProp.numKeys === 0) {
          return;
        }

        var markers = getMarkers(markerProp);
        markers.forEach(function (_, i) {
          item.markerProperty.setValueAtTime(markers[i][0], markers[i][1]);
        });
      });
    });
  };
  var topLayerToAnotherComp = function topLayerToAnotherComp(sourceItem, targetItems) {
    var markers = getTopLayerMarkers(sourceItem);
    if (!markers) return;
    targetItems.forEach(function (item) {
      if (!isCompItem(item)) {
        alert("No composition is selected.");
        return;
      }

      markers.forEach(function (_, i) {
        item.markerProperty.setValueAtTime(markers[i][0], markers[i][1]);
      });
    });
  };
  var topLayerToAnotherCompTopLayer = function topLayerToAnotherCompTopLayer(sourceItem, targetItems) {
    var markers = getTopLayerMarkers(sourceItem);
    if (!markers) return;
    targetItems.forEach(function (item) {
      if (!isCompItem(item)) {
        alert("No composition is selected.");
        return;
      }

      var targetLayer = item.layer(1);
      var targetMarker = targetLayer.property("marker");
      markers.forEach(function (_, i) {
        targetMarker.setValueAtTime(markers[i][0], markers[i][1]);
      });
    });
  };

  var isCompItems = function isCompItems(items) {
    return items.every(isCompItem);
  };

  var main = function main() {
    // initialize
    // ======
    layersToCompRadio.value = true;
    setButton.enabled = false;
    setNameGroup.enabled = false; // event
    // ======

    layersToCompRadio.onActivate = function () {
      setButton.enabled = false;
      setNameGroup.enabled = false;
    };

    layersToCompRadio.onDeactivate = function () {
      setButton.enabled = true;
      setNameGroup.enabled = true;
    };

    removeAllCompMarkers.onActivate = function () {
      setButton.enabled = false;
      setNameGroup.enabled = false;
    };

    removeAllCompMarkers.onDeactivate = function () {
      setButton.enabled = true;
      setNameGroup.enabled = true;
    };

    topLayerToAnotherCompRadio.onActivate = function () {
      setButton.enabled = true;
      setNameGroup.enabled = true;
    };

    topLayerToAnotherCompTopLayerRadio.onActivate = function () {
      setButton.enabled = true;
      setNameGroup.enabled = true;
    };

    var sourceItem;

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
      nameText.text = sourceItem.name;
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

      app.beginUndoGroup("Copy-Marker");

      if (layersToCompRadio.value) {
        layersToComp(targetItems);
      }

      if (topLayerToAnotherCompRadio.value) {
        topLayerToAnotherComp(sourceItem, targetItems);
      }

      if (topLayerToAnotherCompTopLayerRadio.value) {
        topLayerToAnotherCompTopLayer(sourceItem, targetItems);
      }

      if (removeAllCompMarkers.value) {
        removeAllCompMarkers$1(targetItems);
      }

      app.endUndoGroup();
    }; // ======


    dialog.layout.layout();
    dialog.layout.resize();
  };

  main();

}(this));
//# sourceMappingURL=Copy-Marker.jsx.map
