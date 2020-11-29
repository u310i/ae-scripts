// DIALOG
// ======
export const dialog = new Window("dialog");
dialog.text = "Check-Duration";
dialog.orientation = "column";
dialog.alignChildren = ["left", "top"];
dialog.spacing = 10;
dialog.margins = 16;

export const numInput = dialog.add("edittext", undefined, undefined, {
  name: "numInput"
});
(numInput.preferredSize as Dimension).width = 60;

export const okButton = dialog.add("button", undefined, undefined, {
  name: "ok"
});
okButton.text = "Button";
