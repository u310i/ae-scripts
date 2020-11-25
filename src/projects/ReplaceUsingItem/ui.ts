import globalThis from "globalThis";

export const dialog: Panel = globalThis;

// DIALOG
// ======
dialog.text = "Replace-UsingItem";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;

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
  name: "nameText"
});
nameText.text = "";
(nameText.preferredSize as Dimension).width = 80;

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
