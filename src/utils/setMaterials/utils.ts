import { findPropertyWithName } from "../GetEntity/getEntity";
import {
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
} from "../typeCheck";

export const isMaterials = (material: any): material is $T.Mat.Materials => {
  return (
    isObject(material) &&
    !material.$$shape &&
    !material.$$text &&
    !material.$$marker
  );
};

export const isBasicMaterialValue = (
  material: any
): material is $T.Mat.BasicValue => {
  let isNumArray: boolean = false;
  if (isArray(material)) {
    isNumArray =
      material.length > 0 &&
      material.length < 5 &&
      material.every(v => isNumber(v));
  }
  return (
    !isObject(material) &&
    (isNumArray ||
      isNumber(material) ||
      isBoolean(material) ||
      isUndefined(material))
  );
};

export const isTextMaterials = (
  material: any
): material is $T.Mat.TextValuesWithID => {
  return (
    isObject(material) &&
    !material.$$shape &&
    !material.$$marker &&
    material.$$text === true
  );
};

export const isShapeMaterials = (
  material: any
): material is $T.Mat.ShapeValuesWithID => {
  return (
    isObject(material) &&
    material.$$shape === true &&
    !material.$$marker &&
    !material.$$text
  );
};

export const isMarkerMaterials = (
  material: any
): material is $T.Mat.MarkerValuesWithID => {
  return (
    isObject(material) &&
    !material.$$shape &&
    material.$$marker === true &&
    !material.$$text
  );
};

export const setTextDocument = (
  property: Property,
  materials: $T.Mat.Material
): boolean => {
  if (isTextDocument(property.value)) {
    const textDocument = property.value;
    if (isTextMaterials(materials)) {
      const { $$text, ...textMaterials } = materials as $T.Mat.TextValuesWithID;
      Object.keys(textMaterials).forEach(key => {
        const typedKey = key as keyof $T.Mat.TextValues;

        switch (typedKey) {
          case "resetCharStyle":
          case "resetParagraphStyle":
            if (textMaterials[typedKey]) {
              isFunction(textDocument[typedKey]) && textDocument[typedKey]();
            }
            return;
        }

        let property: $T.Mat.TextPropType = textMaterials[typedKey];

        if (typedKey === "fontSize" && (property as number) > 1296) {
          property = 1296;
        }

        (textDocument as any)[typedKey] = property;
      });
      property.setValue(textDocument);
      return true;
    }
  }
  return false;
};

export const setShape = (
  property: Property,
  materials: $T.Mat.Material
): boolean => {
  if (isShape(property.value)) {
    const shape = property.value;
    if (isShapeMaterials(materials)) {
      const {
        $$shape,
        ...shapeMaterials
      } = materials as $T.Mat.ShapeValuesWithID;

      Object.keys(shapeMaterials).forEach(key => {
        const typedKey = key as keyof $T.Mat.ShapeValues;

        let property: $T.Mat.ShapePropType = shapeMaterials[typedKey];

        (shape as any)[typedKey] = property;
      });

      property.setValue(shape);
      return true;
    }
  }
  return false;
};

export const setMarker = (
  property: Property,
  materials: $T.Mat.Material
): boolean => {
  if (isMarkerValue(property.value)) {
    const marker = property.value;
    if (isMarkerMaterials(materials)) {
      const {
        $$marker,
        ...markerMaterials
      } = materials as $T.Mat.MarkerValuesWithID;
      Object.keys(markerMaterials).forEach(key => {
        const typedKey = key as keyof $T.Mat.MarkerValues;

        switch (typedKey) {
          case "setParameters":
            if (markerMaterials[typedKey]) {
              const param = markerMaterials[typedKey];
              if (isObject(param)) {
                isFunction(marker[typedKey]) && marker[typedKey](param);
              }
            }
            return;
        }

        let property: $T.Mat.MarkerPropType = markerMaterials[typedKey];

        (marker as any)[typedKey] = property;
      });

      property.setValue(marker);
      return true;
    }
  }
  return false;
};
