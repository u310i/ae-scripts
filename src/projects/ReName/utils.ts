import {
  getSelectedItems,
  getSelectedLayersFromActive
} from "../../utils/GetEntity/getSelectedEntity";
import { isFunction } from "../../utils/typeCheck";

export const addString = (
  entity: "item" | "layer",
  propName: "name" | "comment",
  text: string | ((prev: string) => string | null)
): void => {
  app.beginUndoGroup("Add-Comment");

  const isName = propName === "name";
  const isComment = propName === "comment";

  if (entity === "item") {
    const items = getSelectedItems();
    items &&
      items.forEach(item => {
        if (isName) {
          const newName = isFunction(text) ? text(item.name) : text;
          if (newName) {
            item.name = newName;
          }
        }
        if (isComment) {
          const newComment = isFunction(text) ? text(item.comment) : text;
          if (newComment) {
            item.comment = newComment;
          }
        }
      });
  }
  if (entity === "layer") {
    const layers = getSelectedLayersFromActive();
    layers &&
      layers.forEach(layer => {
        if (isName) {
          const newName = isFunction(text) ? text(layer.name) : text;
          if (newName) {
            layer.name = newName;
          }
        }
        if (isComment) {
          const newComment = isFunction(text) ? text(layer.comment) : text;
          if (newComment) {
            layer.comment = newComment;
          }
        }
      });
  }

  app.endUndoGroup();
};
