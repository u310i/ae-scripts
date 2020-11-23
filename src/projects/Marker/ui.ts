import globalThis from "globalThis";

export const dialog: Panel = globalThis;

// DIALOG
// ======
dialog.text = "TopLayerMarker-To-Something-Panel";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// methodGroup
// ======
export const methodGroup = dialog.add("group", undefined, {
  name: "methodGroup"
});
methodGroup.orientation = "row";
methodGroup.alignChildren = ["left", "center"];
methodGroup.spacing = 10;
methodGroup.margins = 0;

export const topLayerMarkerToCompMarkerRadio = methodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "topLayerMarkerToCompMarkerRadio"
  }
);
topLayerMarkerToCompMarkerRadio.text = "topLayerMarkerToCompMarkerRadio";

export const topLayerMarkerToTopLayerRadio = methodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "topLayerMarkerToTopLayerRadio"
  }
);
topLayerMarkerToTopLayerRadio.text = "topLayerMarkerToTopLayerRadio";

// setButton
// ======
export const setButton = dialog.add("button", undefined, undefined, {
  name: "setButton"
});
setButton.text = "set source";

// idGroup
// ======
export const idGroup = dialog.add("group", undefined, { name: "idGroup" });
idGroup.orientation = "row";
idGroup.alignChildren = ["left", "center"];
idGroup.spacing = 10;
idGroup.margins = 0;

export const idDescription = idGroup.add("statictext", undefined, undefined, {
  name: "idDescription"
});
idDescription.text = "ID: ";

export const idText = idGroup.add("edittext", undefined, undefined, {
  name: "idText"
});
idText.text = "";
(idText.preferredSize as Dimension).width = 80;

// confirmGroup
// ======
export const confirmGroup = dialog.add("group", undefined, {
  name: "confirmGroup"
});
confirmGroup.orientation = "row";
confirmGroup.alignChildren = ["left", "center"];
confirmGroup.spacing = 10;
confirmGroup.margins = 0;
confirmGroup.alignment = ["right", "top"];
(confirmGroup.preferredSize as Dimension).height = 40;

export const ok = confirmGroup.add("button", undefined, undefined, {
  name: "ok"
});
ok.text = "Select target and OK";
ok.justify = "left";
ok.alignment = ["left", "center"];
