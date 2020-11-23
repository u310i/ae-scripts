import globalThis from "globalThis";

export const isPanel = globalThis instanceof Panel;

export const dialog: Panel | Window = isPanel
  ? globalThis
  : new Window("dialog");

// dialog
// ======
dialog.text = "Re-Name";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 5;
dialog.margins = 16;

// targetEntytyRadioGroup
// ======
export const targetEntytyRadioGroup = dialog.add("group", undefined, {
  name: "targetEntytyRadioGroup"
});
targetEntytyRadioGroup.orientation = "row";
targetEntytyRadioGroup.alignChildren = ["left", "center"];
targetEntytyRadioGroup.spacing = 10;
targetEntytyRadioGroup.margins = 0;

export const itemRadio = targetEntytyRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "itemRadio"
  }
);
itemRadio.text = "project Item";

export const layerRadio = targetEntytyRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "layerRadio"
  }
);
layerRadio.text = "Layer";

// targetPropRadioGroup
// ======
export const targetPropRadioGroup = dialog.add("group", undefined, {
  name: "targetPropRadioGroup"
});
targetPropRadioGroup.orientation = "row";
targetPropRadioGroup.alignChildren = ["left", "center"];
targetPropRadioGroup.spacing = 10;
targetPropRadioGroup.margins = 0;

export const nameRadio = targetPropRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "nameRadio"
  }
);
nameRadio.text = "name";

export const commentRadio = targetPropRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "commentRadio"
  }
);
commentRadio.text = "comment";

// methodRadioGroup
// ======
export const methodRadioGroup = dialog.add("group", undefined, {
  name: "methodType"
});
methodRadioGroup.orientation = "row";
methodRadioGroup.alignChildren = ["left", "center"];
methodRadioGroup.spacing = 10;
methodRadioGroup.margins = 0;

export const insertRadio = methodRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "insertRadio"
  }
);
insertRadio.text = "insert";

export const replaceRadio = methodRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "replaceRadio"
  }
);
replaceRadio.text = "replace";

// insertRadioGroup
// ======
export const insertRadioGroup = dialog.add("group", undefined, {
  name: "insertType"
});
insertRadioGroup.orientation = "row";
insertRadioGroup.alignChildren = ["left", "center"];
insertRadioGroup.spacing = 10;
insertRadioGroup.margins = 0;
insertRadioGroup.indent = 20;

export const insertAllRadio = insertRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "insertAllRadio"
  }
);
insertAllRadio.text = "all";
insertAllRadio.value = true;

export const insertHeadRadio = insertRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "insertHeadRadio"
  }
);
insertHeadRadio.text = "head";

export const insertTailRadio = insertRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "insertTailRadio"
  }
);
insertTailRadio.text = "tail";

// replaceRadioGroup
// ======
export const replaceRadioGroup = dialog.add("group", undefined, {
  name: "replaceType"
});
replaceRadioGroup.orientation = "row";
replaceRadioGroup.alignChildren = ["left", "center"];
replaceRadioGroup.spacing = 10;
replaceRadioGroup.margins = 0;
replaceRadioGroup.indent = 20;

export const replaceSimpleRadio = replaceRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "replaceSimpleRadio"
  }
);
replaceSimpleRadio.text = "simple";

export const replaceGlobRadio = replaceRadioGroup.add(
  "radiobutton",
  undefined,
  undefined,
  {
    name: "replaceGlobRadio"
  }
);
replaceGlobRadio.text = "advanced (glob)";

// searchGroup
// ======
export const searchGroup = dialog.add("group", undefined, {
  name: "searchGroup"
});
searchGroup.orientation = "column";
searchGroup.alignChildren = ["left", "center"];
searchGroup.spacing = 0;
searchGroup.margins = 0;

export const searchDesc = searchGroup.add("statictext", undefined, undefined, {
  name: "searchDesc"
});
searchDesc.text = "search:";

export const searchInput = searchGroup.add("edittext", undefined, undefined, {
  name: "search"
});
(searchInput.preferredSize as Dimension).width = 300;

// insertGroup
// ======
export const insertGroup = dialog.add("group", undefined, {
  name: "insertGroup"
});
insertGroup.orientation = "column";
insertGroup.alignChildren = ["left", "center"];
insertGroup.spacing = 0;
insertGroup.margins = 0;

export const inputDesc = insertGroup.add("statictext", undefined, undefined, {
  name: "inputDesc"
});
inputDesc.text = "insert string:";

export const insertInput = insertGroup.add("edittext", undefined, undefined, {
  name: "insert"
});
(insertInput.preferredSize as Dimension).width = 300;

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
ok.text = "OK";
ok.justify = "left";
ok.alignment = ["left", "center"];
