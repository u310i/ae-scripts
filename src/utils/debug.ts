import {} from "./utils";
import {} from "./getEntity";
import fileSys from "./fileSys";
import {
  // Item
  isAnyItem,
  isCompItem,
  isFolderItem,
  isFootageItem,
  // Layer
  isAnyLayer,
  isAVLayer,
  isTextLayer,
  isCameraLayer,
  isLightLayer,
  isShapeLayer,
  // Source
  isFileSource,
  isSolidSource,
  isAnySource,
  isPlaceholderSource,
  // Property
  isAnyProperty,
  isProperty,
  isPropertyGroup,
  isMaskPropertyGroup,
  // Value
  isPropertyValue,
  isBasicPropertyValue,
  isTextDocument,
  isShape,
  isMarkerValue,
  // built-in
  isUndefined,
  isObject,
  isArray,
  isFunction,
  isNumber,
  isString,
  isBoolean
} from "./typeCheck";

export const alertType = (value: any): void => {
  if (isUndefined(value) || value === null) {
    if (isUndefined(value)) alert("undefined");
    if (value === null) alert("null");
    return;
  }
  // alert(value.toString());
  if (value === false) alert("false");
  // if (isObject(value)) alert("object");
  if (isArray(value)) alert("array");
  if (isFunction(value)) alert("function");
  if (isNumber(value)) alert("number");
  if (isString(value)) alert("string");
  if (isBoolean(value)) alert("boolean");

  // if (isAnyItem(value)) alert("AnyItem: " + value.name);
  if (isCompItem(value)) alert("CompItem: " + value.name);
  if (isFolderItem(value)) alert("FolderItem: " + value.name);
  if (isFootageItem(value)) alert("FootageItem: " + value.name);

  // if (isAnySource(value)) alert("AnySource");
  if (isFileSource(value)) alert("FileSource: " + value.file.toString());
  if (isSolidSource(value)) alert("SolidSource");
  if (isPlaceholderSource(value)) alert("PlaceholderSource");

  // if (isAnyLayer(value)) alert("AnyLayer: " + value.name);
  if (isAVLayer(value)) alert("AVLayer: " + value.name);
  if (isCameraLayer(value)) alert("CameraLayer: " + value.name);
  if (isLightLayer(value)) alert("LightLayer: " + value.name);
  if (isShapeLayer(value)) alert("ShapeLayer: " + value.name);
  if (isTextLayer(value)) alert("TextLayer: " + value.name);

  // if (isAnyProperty(value)) alert("AnyProperty: " + value.name);
  if (isProperty(value)) alert("Property: " + value.name);
  if (isPropertyGroup(value)) alert("PropertyGroup: " + value.name);
  if (isMaskPropertyGroup(value)) alert("MaskPropertyGroup: " + value.name);

  // if (isPropertyValue(value)) alert("PropertyValue");
  if (isBasicPropertyValue(value)) alert("$T.Mat.BasicValue");
  if (isTextDocument(value)) alert("TextDocument");
  if (isShape(value)) alert("Shape");
  if (isMarkerValue(value)) alert("MarkerValue");

  if (fileSys.isFile(value))
    alert("File: " + value.name + " exists: " + value.exists);
  if (fileSys.isFolder(value))
    alert("Folder: " + value.name + " exists: " + value.exists);
};

export const getSelectedItem = (): $T.ADBE.AnyItem | null => {
  const item = app.project.activeItem;
  return (item as $T.ADBE.AnyItem) || null;
};

export const getSelectedLayesr = (compItem: CompItem): Layer[] | null => {
  const layers = compItem.selectedLayers;
  return layers[0] ? layers : null;
};

export const getSelectedProperties = (
  compItem: CompItem
): $T.ADBE.AnyProperty[] | null => {
  const properties = compItem.selectedProperties as
    | $T.ADBE.AnyProperty[]
    | null;
  return properties && properties[0] ? properties : null;
};

export const getSelectedCompProperty = (): $T.ADBE.AnyProperty | null => {
  const item = getSelectedItem();
  let property: $T.ADBE.AnyProperty | null = null;
  if (item instanceof CompItem) {
    const properties = getSelectedProperties(item);
    property = properties && properties[0];
  }
  return property;
};

export const alertSelectedCompPropertyMatchName = (): void => {
  const item = getSelectedItem();
  if (item instanceof CompItem) {
    const properties = getSelectedProperties(item);
    const property = properties && properties[0];
    property && alert(property.name + ": " + property.matchName);
  }
};
