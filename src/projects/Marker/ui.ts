import globalThis from "globalThis";

export const dialog: Panel = globalThis;

// DIALOG
// ======
dialog.text = "Copy-Marker";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// methodGroup
// ======
export const methodGroup = dialog.add("group", undefined, {
  name: "methodGroup"
});
methodGroup.orientation = "column";
methodGroup.alignChildren = ["left", "center"];
methodGroup.spacing = 10;
methodGroup.margins = 0;

export const layersToCompRadio = methodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "Layers-To-Comp"
  }
);
layersToCompRadio.text = "Layers-To-Comp";

export const topLayerToAnotherCompRadio = methodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "TopLayer-To-AnotherComp"
  }
);
topLayerToAnotherCompRadio.text = "TopLayer-To-AnotherComp";

export const topLayerToAnotherCompTopLayerRadio = methodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "TopLayer-To-AnotherComp-TopLayer"
  }
);
topLayerToAnotherCompTopLayerRadio.text = "TopLayer-To-AnotherComp-TopLayer";

export const removeAllCompMarkers = methodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "TopLayer-To-AnotherComp-TopLayer"
  }
);
removeAllCompMarkers.text = "Remove-AllCompMarkers";

// setButton
// ======
export const setButton = dialog.add("button", undefined, undefined, {
  name: "setButton"
});
setButton.text = "set source";

// setNameGroup
// ======
export const setNameGroup = dialog.add("group", undefined, {
  name: "setNameGroup"
});
setNameGroup.orientation = "row";
setNameGroup.alignChildren = ["left", "center"];
setNameGroup.spacing = 10;
setNameGroup.margins = 0;

export const setNameDedscription = setNameGroup.add(
  "statictext",
  undefined,
  undefined,
  {
    name: "setNameDedscription"
  }
);
setNameDedscription.text = "name: ";

export const nameText = setNameGroup.add("statictext", undefined, undefined, {
  name: "edittext"
});
nameText.text = "";
(nameText.preferredSize as Dimension).width = 80;
nameText.enabled = false;

// confirmGroup
// ======
export const confirmGroup = dialog.add("group", undefined, {
  name: "confirmGroup"
});
confirmGroup.orientation = "row";
confirmGroup.alignChildren = ["left", "center"];
confirmGroup.spacing = 10;
confirmGroup.margins = 0;
confirmGroup.alignment = ["left", "top"];
(confirmGroup.preferredSize as Dimension).height = 40;

export const ok = confirmGroup.add("button", undefined, undefined, {
  name: "ok"
});
ok.text = "Select target and OK";
ok.justify = "left";
ok.alignment = ["left", "center"];
