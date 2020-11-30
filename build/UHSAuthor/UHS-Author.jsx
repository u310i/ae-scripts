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

dialog.text = "UHS_Author";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16; // setFolderGroup
// ======

var setFolderGroup = dialog.add("group", undefined, {
  name: "setFolderGroup"
});
setFolderGroup.orientation = "row";
setFolderGroup.alignChildren = ["left", "center"];
setFolderGroup.spacing = 10;
setFolderGroup.margins = 0;
var setFolderButton = setFolderGroup.add("button", undefined, undefined, {
  name: "setFolderButton"
});
setFolderButton.text = "set Root Folder";
var setFolderResult = setFolderGroup.add("statictext", undefined, undefined, {
  name: "setFolderResult"
});
setFolderResult.text = "default";
setFolderResult.enabled = false; // replaceMethodGroup
// ======

var replaceMethodGroup = dialog.add("group", undefined, {
  name: "replaceMethodGroup"
});
replaceMethodGroup.orientation = "row";
replaceMethodGroup.alignChildren = ["left", "center"];
replaceMethodGroup.spacing = 10;
replaceMethodGroup.margins = 0;
var simpleReplaceRadio = replaceMethodGroup.add("radiobutton", undefined, undefined, {
  name: "simpleReplaceRadio"
});
simpleReplaceRadio.text = "simple";
var advancedReplaceRadio = replaceMethodGroup.add("radiobutton", undefined, undefined, {
  name: "advancedReplaceRadio"
});
advancedReplaceRadio.text = "advanced"; // replaceNameGroup
// ======

var replaceNameGroup = dialog.add("group", undefined, {
  name: "replaceNameGroup"
});
replaceNameGroup.orientation = "row";
replaceNameGroup.alignChildren = ["left", "center"];
replaceNameGroup.spacing = 10;
replaceNameGroup.margins = 0;
var searchInputDesc = replaceNameGroup.add("statictext", undefined, undefined, {
  name: "searchInputDesc"
});
searchInputDesc.text = "search";
var searchInputText = replaceNameGroup.add("edittext", undefined, undefined, {
  name: "search"
});
searchInputText.text = "";
searchInputText.preferredSize.width = 240; // replaceInputGroup
// ======

var replaceInputGroup = dialog.add("group", undefined, {
  name: "replaceInputGroup"
});
replaceInputGroup.orientation = "row";
replaceInputGroup.alignChildren = ["left", "center"];
replaceInputGroup.spacing = 10;
replaceInputGroup.margins = 0;
var replaceInputDesc = replaceInputGroup.add("statictext", undefined, undefined, {
  name: "replaceInputDesc"
});
replaceInputDesc.text = "replace";
var replaceInputText = replaceInputGroup.add("edittext", undefined, undefined, {
  name: "search"
});
replaceInputText.text = "";
replaceInputText.preferredSize.width = 240; // createButtonGroup
// ======

var createButtonGroup = dialog.add("group", undefined, {
  name: "createButtonGroup"
});
createButtonGroup.orientation = "column";
createButtonGroup.alignChildren = ["left", "center"];
createButtonGroup.spacing = 10;
createButtonGroup.margins = 0;
var createMarginCompButton = createButtonGroup.add("button", undefined, undefined, {
  name: "createMarginCompButton"
});
createMarginCompButton.text = "02_余白";
var create01CompButton = createButtonGroup.add("button", undefined, undefined, {
  name: "create01CompButton"
});
create01CompButton.text = "01_コンポ";
var createAt1CompButton = createButtonGroup.add("button", undefined, undefined, {
  name: "createAtCompButton"
});
createAt1CompButton.text = "@コンポ";// Production steps of ECMA-262, Edition 5, 15.4.4.17
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
};
var isCompItems = function isCompItems(items) {
  return items.every(isCompItem);
};var getChildItem = function getChildItem() {
  var folder = arguments.length > 0 && ((arguments[0] !== undefined)) ? ((arguments[0])) : ((app.project.rootFolder));
  var callback = arguments.length > 1 ? ((arguments[1])) : ((undefined));
  var item = null;
  times(folder.numItems, function (index) {
    var target = folder.item(index);
    if (callback && (!callback(target))) return;
    item = target;
    return true;
  });
  return item;
};var getSelectedItems = function getSelectedItems() {
  var items = app.project.selection;
  return items[0] ? (items) : (null);
};var inputBlank = function inputBlank() {
  setFolderResult.text = "";
};

var setFolder = function setFolder(item) {
  var tempFolder = null;
  var rootFolder = null;

  if (item) {
    rootFolder = item;
  } else {
    rootFolder = app.project.rootFolder;
  }

  tempFolder = getChildItem(rootFolder, function (item) {
    return item.name === "*" && (isFolderItem(item));
  });

  if (!tempFolder) {
    inputBlank();
    alert("【*】フォルダがありません。");
    return;
  }

  var asteriskFolder = tempFolder;
  tempFolder = getChildItem(asteriskFolder, function (item) {
    return item.name === "@" && (isFolderItem(item));
  });

  if (!tempFolder) {
    inputBlank();
    alert("【@】フォルダがありません。");
    return;
  }

  var atFolder = tempFolder;
  tempFolder = getChildItem(rootFolder, function (item) {
    return item.name === "work" && (isFolderItem(item));
  });

  if (!tempFolder) {
    inputBlank();
    alert("【work】フォルダがありません。");
    return;
  }

  var workFolder = tempFolder;
  tempFolder = getChildItem(workFolder, function (item) {
    return item.name === "_sozai" && (isFolderItem(item));
  });

  if (!tempFolder) {
    inputBlank();
    alert("【_sozai】フォルダがありません。");
    return;
  }

  var sozaiFolder = tempFolder;
  tempFolder = getChildItem(sozaiFolder, function (item) {
    return item.name === "01_コンポ" && (isFolderItem(item));
  });

  if (!tempFolder) {
    inputBlank();
    alert("【01_コンポ】フォルダがありません。");
    return;
  }

  var compFolder = tempFolder;
  tempFolder = getChildItem(sozaiFolder, function (item) {
    return item.name === "02_余白" && (isFolderItem(item));
  });

  if (!tempFolder) {
    inputBlank();
    alert("【02_余白】フォルダがありません。");
    return;
  }

  var marginFolder = tempFolder;
  return {
    at: atFolder,
    comp: compFolder,
    margin: marginFolder
  };
};var escapeGlob = function escapeGlob(str) {
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
};var createCompItem = function createCompItem(parent) {
  var params = arguments.length > 1 && ((arguments[1] !== undefined)) ? ((arguments[1])) : (({}));
  var name = params.name || ("comp");
  var width = params.width || (1280);
  var height = params.height || (720);
  var pixelAspect = params.pixelAspect || (1.0);
  var duration = params.duration || (1.0);
  var frameRate = params.frameRate || (30.0);
  var newComp = parent.items.addComp(name, width, height, pixelAspect, 9999.0, frameRate);
  newComp.duration = duration;
  return newComp;
};var getMarkers = function getMarkers(markerProp) {
  var markers = [];
  times(markerProp.numKeys, function (i) {
    markers.push([markerProp.keyTime(i), markerProp.keyValue(i)]);
  });
  return markers;
};
var setMarkers = function setMarkers(sourceProp, targetProp) {
  var markers = getMarkers(sourceProp);
  markers.forEach(function (_, i) {
    targetProp.setValueAtTime(markers[i][0], markers[i][1]);
  });
};var setMarker = function setMarker(sourceComp, targetComp) {
  if (sourceComp.markerProperty) {
    setMarkers(sourceComp.markerProperty, targetComp.markerProperty);
    setMarkers(sourceComp.markerProperty, targetComp.layer(1).property("marker"));
  } else {
    setMarkers(sourceComp.layer(1).property("marker"), targetComp.layer(1).property("marker"));
  }
};var createMarginComp = function createMarginComp(folder) {
  var targetItems = getSelectedItems();

  if (!targetItems || (!isCompItems(targetItems))) {
    alert("【01_余白】コンポジションを選択してください。");
    return;
  }

  targetItems.forEach(function (comp) {
    var name = "";

    if (simpleReplaceRadio.value) {
      name = comp.name.replace(searchInputText.text, replaceInputText.text);
    }

    if (advancedReplaceRadio.value) {
      name = renameWithSimpleGlob(comp.name, searchInputText.text, replaceInputText.text);
    }

    var compProps = {
      name: name + "_余白",
      width: comp.width,
      height: comp.height,
      duration: comp.duration
    };
    var newComp = createCompItem(folder, compProps);
    newComp.bgColor = comp.bgColor;
    var triggerName = newComp.name.split("_")[2];
    var sizeName = compProps.width === 1200 && (compProps.height === 1000) ? ("全画面") : (compProps.width === 1200 && (compProps.height === 600) ? ("半画面") : ("※画面サイズエラー"));
    newComp.comment = "".concat(triggerName, "_").concat(sizeName, "_\u4F59\u767D").concat(comp.comment ? ("_".concat(comp.comment)) : (""));
    newComp.layers.add(comp);
    setMarker(comp, newComp);
    comp.selected = false;
    newComp.selected = true;
  });
};
var create01Comp = function create01Comp(folder) {
  var targetItems = getSelectedItems();

  if (!targetItems || (!isCompItems(targetItems))) {
    alert("【01_コンポ】コンポジションを選択してください。");
    return;
  }

  targetItems.forEach(function (comp) {
    var name = comp.name.replace("_余白", "");
    var compProps = {
      name: name,
      width: comp.width - 200,
      height: comp.height - 200,
      duration: comp.duration
    };
    var newComp = createCompItem(folder, compProps);
    newComp.bgColor = comp.bgColor;
    newComp.comment = comp.comment.replace("_余白", "");
    var layer = newComp.layers.add(comp);
    layer.position.setValue([compProps.width / 2, compProps.height / 2, 0]);
    setMarker(comp, newComp);
    comp.selected = false;
    newComp.selected = true;
  });
};
var createAtComp = function createAtComp(folder) {
  var targetItems = getSelectedItems();

  if (!targetItems || (!isCompItems(targetItems))) {
    alert("【@コンポ】コンポジションを選択してください。");
    return;
  }

  targetItems.forEach(function (comp) {
    var name = "@" + comp.name;
    var compProps = {
      name: name,
      width: 1000,
      height: 800,
      duration: comp.duration
    };
    var newComp = createCompItem(folder, compProps);
    newComp.bgColor = comp.bgColor;
    var commentArray = comp.comment.split("_");
    newComp.comment = commentArray[0].toUpperCase() + "_" + commentArray.slice(1).join("_");
    var layer = newComp.layers.add(comp);
    layer.position.setValue([comp.width / 2, comp.height / 2, 0]);
    setMarker(comp, newComp);
    comp.selected = false;
    newComp.selected = true;
  });
};var atFolder;
var compFolder;
var marginFolder;

var main = function main() {
  // initialize
  advancedReplaceRadio.value = true;
  searchInputText.text = "work_*";
  replaceInputText.text = "E504_BAR狙え_$1"; // main
  // let folders = setFolder();
  // if (!folders) {
  //   alert("ルートフォルダがありません。");
  //   return;
  // }
  // atFolder = folders.at;
  // compFolder = folders.comp;
  // marginFolder = folders.margin;
  // setFolderButton

  setFolderButton.onClick = function () {
    var items = getSelectedItems();
    var rootFolder = !items || (!items[0]) || (!isFolderItem(items[0])) ? (undefined) : (items[0]);
    var folders = setFolder(rootFolder);
    if (!folders) return;
    atFolder = folders.at;
    compFolder = folders.comp;
    marginFolder = folders.margin;
    setFolderResult.text = "ok";
  }; // createMarginCompButton


  createMarginCompButton.onClick = function () {
    app.beginUndoGroup("UHS-Author");
    createMarginComp(marginFolder);
    app.endUndoGroup();
  }; // create01CompButton


  create01CompButton.onClick = function () {
    app.beginUndoGroup("UHS-Author");
    create01Comp(compFolder);
    app.endUndoGroup();
  }; // createAt1CompButton


  createAt1CompButton.onClick = function () {
    app.beginUndoGroup("UHS-Author");
    createAtComp(atFolder);
    app.endUndoGroup();
  }; // ======


  dialog.layout.layout();
  dialog.layout.resize();
};

main();}(this));