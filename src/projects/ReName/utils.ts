import {
  getSelectedItems,
  getSelectedLayersFromActive
} from "../../utils/GetEntity/getSelectedEntity";
import { isFunction } from "../../utils/typeCheck";

export const addString = (
  entity: "item" | "layer",
  source: "name" | "comment",
  target: "name" | "comment",
  text: string | ((prev: string) => string | null)
): void => {
  app.beginUndoGroup("Add-Comment");

  const entities =
    entity === "item"
      ? getSelectedItems()
      : entity === "layer"
      ? getSelectedLayersFromActive()
      : null;

  entities &&
    entities.forEach((entity: $T.ADBE.AnyItem | $T.ADBE.AnyLayer) => {
      entity[target] = isFunction(text)
        ? text(entity[source]) || entity[target]
        : text;
    });

  app.endUndoGroup();
};
