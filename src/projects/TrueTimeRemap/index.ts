import "../../polyfill/array/forEach";
import { timeRemapping } from "../../utils/timeRemapping";
import { isAVLayer, isCompItem } from "../../utils/typeCheck";

const trueTimeRemap = () => {
  app.beginUndoGroup("True-Time-Remap");

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

    timeRemapping(layer, { cycle: false });
  });

  app.endUndoGroup();
};

trueTimeRemap();
