import { isProperty } from "./typeCheck";
import constants from "../constants";

// const partLayer = getSomethingWithPath("$root/$part_1") as $T.ADBE.AnyLayer;
// genFade(partLayer, "in", 1);
// genFade(partLayer, "out", 2);
export const genFade = (
  layer: $T.ADBE.AnyLayer,
  type: "in" | "out",
  duration: number,
  ease: {
    in?: {
      speed: number;
      influence: number;
    };
    out?: {
      speed: number;
      influence: number;
    };
  } = {}
): void => {
  const easeInProps = ease.in || constants.beziers.ease;
  const easeOutProps = ease.out || constants.beziers.ease;

  const easeIn = new KeyframeEase(easeInProps.speed, easeInProps.influence);
  const easeOut = new KeyframeEase(easeOutProps.speed, easeOutProps.influence);
  const linear = new KeyframeEase(0, 0.1);

  let inPoint: number;
  let outPoint: number;

  const isIN = type === "in";
  if (isIN) {
    inPoint = layer.inPoint;
    outPoint = inPoint + duration;
  } else {
    outPoint = layer.outPoint;
    inPoint = outPoint - duration;
  }
  const opacity = layer
    .property("ADBE Transform Group")
    .property("ADBE Opacity");

  if (!isProperty(opacity)) {
    $L.error(
      $.line,
      `genFade / not found Property / layer name: ${layer.name}`
    );
    return;
  }
  const startKeyIndex = opacity.addKey(inPoint);
  const endKeyIndex = opacity.addKey(outPoint);
  opacity.setValueAtKey(startKeyIndex, isIN ? 0 : 100);
  opacity.setValueAtKey(endKeyIndex, isIN ? 100 : 0);
  opacity.setTemporalEaseAtKey(startKeyIndex, [linear], [easeIn]);
  opacity.setTemporalEaseAtKey(endKeyIndex, [easeOut], [linear]);
};
