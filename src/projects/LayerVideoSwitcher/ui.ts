import globalThis from "globalThis";

export const dialog: Panel = globalThis;

// DIALOG
// ======
dialog.text = "Add-Comment";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// fileDialogButtonGroup
// ======
export const fileDialogButtonGroup = dialog.add("group", undefined, {
  name: "fileDialogButtonGroup"
});
fileDialogButtonGroup.orientation = "row";
fileDialogButtonGroup.alignChildren = ["left", "center"];
fileDialogButtonGroup.spacing = 10;
fileDialogButtonGroup.margins = 0;

export const importButton = fileDialogButtonGroup.add(
  "button",
  undefined,
  undefined,
  {
    name: "importButton"
  }
);
importButton.text = "import";

export const newButton = fileDialogButtonGroup.add(
  "button",
  undefined,
  undefined,
  {
    name: "newButton"
  }
);
newButton.text = "new";

export const pathInput = dialog.add("edittext", undefined, undefined, {
  name: "numInput"
});
pathInput.text = "";
(pathInput.preferredSize as Dimension).width = 240;

// fileNameGroup
// ======
export const fileNameGroup = dialog.add("group", undefined, {
  name: "fileNameGroup"
});
fileNameGroup.orientation = "row";
fileNameGroup.alignChildren = ["left", "center"];
fileNameGroup.spacing = 10;
fileNameGroup.margins = 0;

export const fileNameInput = fileNameGroup.add(
  "edittext",
  undefined,
  undefined,
  {
    name: "fileName"
  }
);
fileNameInput.text = "";
(fileNameInput.preferredSize as Dimension).width = 160;

export const extensionText = fileNameGroup.add(
  "statictext",
  undefined,
  undefined,
  {
    name: "extensionText"
  }
);
extensionText.text = ".json";

// optionGroup
// ======
export const optionGroup = dialog.add("group", undefined, {
  name: "optionGroup"
});
optionGroup.orientation = "row";
optionGroup.alignChildren = ["left", "center"];
optionGroup.spacing = 10;
optionGroup.margins = 0;

export const invertCheck = optionGroup.add("checkbox", undefined, undefined, {
  name: "invertCheck"
});
invertCheck.text = "invert";

export const toggleCheck = optionGroup.add("checkbox", undefined, undefined, {
  name: "toggleCheck"
});
toggleCheck.text = "toggle";

// buttonGroup
// ======
export const buttonGroup = dialog.add("group", undefined, {
  name: "buttonGroup"
});
buttonGroup.orientation = "row";
buttonGroup.alignChildren = ["left", "center"];
buttonGroup.spacing = 10;
buttonGroup.margins = 0;

export const addButton = buttonGroup.add("button", undefined, undefined, {
  name: "addButton"
});
addButton.text = "add";

export const switchButton = buttonGroup.add("button", undefined, undefined, {
  name: "switchButton"
});
switchButton.text = "switch";
