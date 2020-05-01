import "./init.ts";
import { times } from "./utils/utils";
import {
  findItemWithName,
  findLayerWithName,
  findPropertyWithName
} from "./utils/getEntity";

import { getItemWithPathArray } from "./utils/getEntityWithPath";
import {
  isCompItem,
  isFolderItem,
  isFootageItem,
  isAVLayer,
  isTextLayer,
  isFileSource,
  isSolidSource,
  isProperty,
  isPropertyGroup,
  isMaskPropertyGroup,
  isTextDocument,
  isShape,
  isMarkerValue,
  isObject,
  isArray,
  isFunction,
  isNumber,
  isUndefined,
  isBoolean
} from "./utils/typeCheck";

const item = getItemWithPathArray(["aaa", "foo1", "parent1"]);
if (item instanceof CompItem) {
  const layerName = "child02";
  const layer = item.layer(layerName);
  // alert(layer instanceof Layer ? "true" : "false");
  if (layer instanceof TextLayer) {
    const prop = layer.property("Source Text");
    if (prop instanceof Property) {
      const textDocument = prop.value;
      if (textDocument instanceof TextDocument) {
        // textDocument.fontSize = 500;
        // property.setValue(textDocument);
        // alert("text set");
      }
    }
  }
  if (layer instanceof AVLayer) {
    // alert("av layer");
    const group = layer.property("Masks");
    if (group instanceof PropertyGroup) {
      const maskGroup = group.property("Mask 1");
      if (maskGroup instanceof MaskPropertyGroup) {
        const prop = maskGroup.property("Mask Path");
        if (prop instanceof Property) {
          const shape = prop.value;
          if (shape instanceof Shape) {
            // alert("true");
          }
        }
      }
    }
  }
}
