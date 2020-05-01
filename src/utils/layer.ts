import { getLayers } from "./getEntity";

export const sequenceLayers = (
  comp: CompItem,
  options: {
    fromBottom?: boolean;
    injectStartBlank?: (index: number, length: number) => number | undefined;
  } = {}
): void => {
  // $I.undo && app.beginUndoGroup("sequenceLayer");
  const layers = getLayers(comp, {
    fromBottom: options.fromBottom
  });

  layers.forEach((layer, index) => {
    const blank = options.injectStartBlank
      ? options.injectStartBlank(index, layers.length) || 0
      : 0;
    if (index === 0) {
      layer.startTime = blank;
    } else {
      layer.startTime = layers[index - 1].outPoint + blank;
    }
  });
  // $I.undo && app.endUndoGroup();
};
