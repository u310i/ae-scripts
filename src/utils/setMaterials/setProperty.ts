import { findPropertyWithName } from "../getEntity";
import {
  isProperty,
  isPropertyGroup,
  isMaskPropertyGroup,
  isAVLayer,
  isFunction,
  isCompItem
} from "../typeCheck";

import {
  isMaterials,
  setTextDocument,
  setShape,
  setMarker,
  isBasicMaterialValue
} from "./utils";

const setProperty = (
  materials: $T.Mat.Materials,
  parent: $T.ADBE.AnyLayer | PropertyGroup | MaskPropertyGroup
): void => {
  Object.keys(materials).forEach(key => {
    const material = materials[key];
    if (isAVLayer(parent)) {
      switch (key) {
        case "replaceSource":
          if (isFunction(parent[key]) && isCompItem(material)) {
            parent.replaceSource(material, false);
          } else {
            $L.error(
              $.line,
              `setProperty / maby material is not CompItem / key is ${key}`
            );
          }
          return;
      }
    }
    const property = findPropertyWithName(key, parent);
    if (!property) {
      $L.error($.line, `setProperty / property is not found / key is ${key}`);
      return;
    }
    if (isPropertyGroup(property) || isMaskPropertyGroup(property)) {
      if (isMaterials(material)) {
        setProperty(material, property);
      }
      return;
    }

    if (isProperty(property)) {
      if (property.propertyValueType === PropertyValueType.NO_VALUE) {
        $L.error(
          $.line,
          `setProperty / property is NO_VALUE / material is ${material}`
        );
        return;
      }
      if (setTextDocument(property, material)) return;
      if (setShape(property, material)) return;
      if (setMarker(property, material)) return;
      if (isBasicMaterialValue(material)) {
        property.setValue(material);
      }
    }
  });
};

export default setProperty;
