import "../../polyfill/array/forEach";
import { timeRemapping } from "../../utils/timeRemapping";
import { isAVLayer, isCompItem } from "../../utils/typeCheck";

type LoopType = "cycle" | "offset" | "pingpong" | "continue";

const timeRemapCycleLoop = (type: LoopType = "cycle") => {
  app.beginUndoGroup("Time-Remap-Loop");

  const activeComp = app.project.activeItem;

  if (!isCompItem(activeComp)) {
    alert("The selected item is not a composition.");
    return;
  }
  const layers = activeComp.selectedLayers;

  layers.forEach(layer => {
    if (!isAVLayer(layer)) {
      alert(`The selected layers include those that are not AV layers.`);
      return;
    }

    if (!layer.canSetTimeRemapEnabled || !layer.source) {
      alert("Selected layers include layers that cannot be time remapping.");
      return;
    }

    timeRemapping(layer, { cycle: true });

    const timeRemapProp = layer.property("ADBE Time Remapping") as Property;
    if (!timeRemapProp.canSetExpression) {
      alert("The expression cannot be set.");
      return;
    }

    timeRemapProp.expression = `loopOut(type = "${type}", numKeyframes = 0)`;
  });

  app.endUndoGroup();
};

timeRemapCycleLoop();
