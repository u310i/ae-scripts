import globalThis from "globalThis";

export const dialog: Panel = globalThis;

// DIALOG
// ======
dialog.text = "UHS_Author";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;

// setFolderGroup
// ======
export const setFolderGroup = dialog.add("group", undefined, {
  name: "setFolderGroup"
});
setFolderGroup.orientation = "row";
setFolderGroup.alignChildren = ["left", "center"];
setFolderGroup.spacing = 10;
setFolderGroup.margins = 0;

export const setFolderButton = setFolderGroup.add(
  "button",
  undefined,
  undefined,
  {
    name: "setFolderButton"
  }
);
setFolderButton.text = "set Root Folder";

export const setFolderResult = setFolderGroup.add(
  "statictext",
  undefined,
  undefined,
  {
    name: "setFolderResult"
  }
);
setFolderResult.text = "default";
setFolderResult.enabled = false;

// replaceMethodGroup
// ======
export const replaceMethodGroup = dialog.add("group", undefined, {
  name: "replaceMethodGroup"
});
replaceMethodGroup.orientation = "row";
replaceMethodGroup.alignChildren = ["left", "center"];
replaceMethodGroup.spacing = 10;
replaceMethodGroup.margins = 0;

export const simpleReplaceRadio = replaceMethodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "simpleReplaceRadio"
  }
);
simpleReplaceRadio.text = "simple";

export const advancedReplaceRadio = replaceMethodGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "advancedReplaceRadio"
  }
);
advancedReplaceRadio.text = "advanced";

// replaceNameGroup
// ======
export const replaceNameGroup = dialog.add("group", undefined, {
  name: "replaceNameGroup"
});
replaceNameGroup.orientation = "row";
replaceNameGroup.alignChildren = ["left", "center"];
replaceNameGroup.spacing = 10;
replaceNameGroup.margins = 0;

export const searchInputDesc = replaceNameGroup.add(
  "statictext",
  undefined,
  undefined,
  {
    name: "searchInputDesc"
  }
);
searchInputDesc.text = "search";

export const searchInputText = replaceNameGroup.add(
  "edittext",
  undefined,
  undefined,
  {
    name: "search"
  }
);
searchInputText.text = "";
(searchInputText.preferredSize as Dimension).width = 240;

// replaceInputGroup
// ======
export const replaceInputGroup = dialog.add("group", undefined, {
  name: "replaceInputGroup"
});
replaceInputGroup.orientation = "row";
replaceInputGroup.alignChildren = ["left", "center"];
replaceInputGroup.spacing = 10;
replaceInputGroup.margins = 0;

export const replaceInputDesc = replaceInputGroup.add(
  "statictext",
  undefined,
  undefined,
  {
    name: "replaceInputDesc"
  }
);
replaceInputDesc.text = "replace";

export const replaceInputText = replaceInputGroup.add(
  "edittext",
  undefined,
  undefined,
  {
    name: "search"
  }
);
replaceInputText.text = "";
(replaceInputText.preferredSize as Dimension).width = 240;

// createButtonGroup
// ======
export const createButtonGroup = dialog.add("group", undefined, {
  name: "createButtonGroup"
});
createButtonGroup.orientation = "column";
createButtonGroup.alignChildren = ["left", "center"];
createButtonGroup.spacing = 10;
createButtonGroup.margins = 0;

export const createMarginCompButton = createButtonGroup.add(
  "button",
  undefined,
  undefined,
  {
    name: "createMarginCompButton"
  }
);
createMarginCompButton.text = "02_余白";

export const create01CompButton = createButtonGroup.add(
  "button",
  undefined,
  undefined,
  {
    name: "create01CompButton"
  }
);
create01CompButton.text = "01_コンポ";

export const createAt1CompButton = createButtonGroup.add(
  "button",
  undefined,
  undefined,
  {
    name: "createAtCompButton"
  }
);
createAt1CompButton.text = "@コンポ";
