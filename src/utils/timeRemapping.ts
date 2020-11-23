import { __Error__ } from "./initialize";
import { isAVLayer } from "./typeCheck";

const defaultOptions = { cycle: false };

const errorName = "timeRemapping";

export const timeRemapping = (
  layer: AVLayer,
  options: {
    cycle: boolean;
  } = defaultOptions
) => {
  if (!isAVLayer(layer)) {
    __Error__(
      $.line,
      `${errorName}\ngetItemWithPathArray\nThis layer is not an AV layer.`
    );
    return;
  }

  if (!layer.canSetTimeRemapEnabled || !layer.source) {
    __Error__(
      $.line,
      `${errorName}\nTime remapping cannot be set for this layer.`
    );
    return;
  }

  const thisComp = layer.containingComp;

  const frameRate = thisComp.frameRate;
  const oneFrameTime = 1 / frameRate;

  const trStartTime = layer.inPoint;
  const trEndTime = layer.outPoint - oneFrameTime;
  const trReStartTime = layer.outPoint;

  layer.timeRemapEnabled = true;
  const timeRemapProp = layer.property("ADBE Time Remapping") as Property;

  const trStartValue = timeRemapProp.valueAtTime(trStartTime, true);
  const trEndValue = timeRemapProp.valueAtTime(trEndTime, true);
  const trReStartValue = trStartValue;

  if (options.cycle) {
    timeRemapProp.setValuesAtTimes(
      [trStartTime, trEndTime, trReStartTime],
      [trStartValue, trEndValue, trReStartValue]
    );
  } else {
    timeRemapProp.setValuesAtTimes(
      [trStartTime, trEndTime],
      [trStartValue, trEndValue]
    );
  }

  const startTime = layer.startTime;
  try {
    if (trStartTime !== startTime) {
      timeRemapProp.removeKey(1);
    }
  } catch (e) {
    __Error__($.line, `${errorName}\nRemove Start Key Error\n${e}`);
  }

  const endTime = layer.startTime + layer.source.duration;
  const endKeyIndex = timeRemapProp.nearestKeyIndex(endTime);

  const difference = Math.abs(
    trReStartTime - timeRemapProp.keyTime(endKeyIndex)
  );

  try {
    if (options.cycle) {
      if (difference > oneFrameTime / 10) {
        timeRemapProp.removeKey(endKeyIndex);
      }
    } else {
      timeRemapProp.removeKey(endKeyIndex);
    }
  } catch (e) {
    __Error__($.line, `${errorName}\nRemove End Key Error\n${e}`);
  }
};
