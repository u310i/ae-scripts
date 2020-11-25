export const isFolderItem = (item: any): item is FolderItem => {
  return item instanceof FolderItem;
};

export const isCompItem = (item: any): item is CompItem => {
  return item instanceof CompItem;
};

export const isFootageItem = (item: any): item is FootageItem => {
  return item instanceof FootageItem;
};

export const isAVItem = (item: any): item is CompItem | FootageItem => {
  return isCompItem(item) || isFootageItem(item);
};

export const isAnyItem = (item: any): item is $T.ADBE.AnyItem => {
  return isCompItem(item) || isFolderItem(item) || isFootageItem(item);
};

export const isAVLayer = (layer: any): layer is AVLayer => {
  return layer instanceof AVLayer;
};

export const isCameraLayer = (layer: any): layer is CameraLayer => {
  return layer instanceof CameraLayer;
};

export const isLightLayer = (layer: any): layer is LightLayer => {
  return layer instanceof LightLayer;
};

export const isShapeLayer = (layer: any): layer is ShapeLayer => {
  return layer instanceof ShapeLayer;
};

export const isTextLayer = (layer: any): layer is TextLayer => {
  return layer instanceof TextLayer;
};

export const isAnyLayer = (layer: any): layer is $T.ADBE.AnyLayer => {
  return (
    isAVLayer(layer) ||
    isCameraLayer(layer) ||
    isLightLayer(layer) ||
    isShapeLayer(layer) ||
    isTextLayer(layer)
  );
};

export const isFileSource = (source: any): source is FileSource => {
  return source instanceof FileSource;
};

export const isSolidSource = (source: any): source is SolidSource => {
  return source instanceof SolidSource;
};

export const isPlaceholderSource = (
  source: any
): source is PlaceholderSource => {
  return source instanceof PlaceholderSource;
};

export const isAnySource = (
  source: any
): source is FileSource | SolidSource | PlaceholderSource => {
  return (
    isFileSource(source) || isSolidSource(source) || isPlaceholderSource(source)
  );
};

export const isProperty = (property: any): property is Property => {
  return property instanceof Property;
};

export const isPropertyGroup = (property: any): property is PropertyGroup => {
  return property instanceof PropertyGroup;
};

export const isMaskPropertyGroup = (
  property: any
): property is MaskPropertyGroup => {
  return property instanceof MaskPropertyGroup;
};

export const isAnyProperty = (
  property: any
): property is $T.ADBE.AnyProperty => {
  return (
    isProperty(property) ||
    isPropertyGroup(property) ||
    isMaskPropertyGroup(property)
  );
};

export const isTextDocument = (value: any): value is TextDocument => {
  return value instanceof TextDocument;
};

export const isShape = (value: any): value is Shape => {
  return value instanceof Shape;
};

export const isMarkerValue = (value: any): value is MarkerValue => {
  return value instanceof MarkerValue;
};

export const isBasicPropertyValue = (
  value: any
): value is $T.Mat.BasicValue => {
  const isBasicPropertyArray =
    isArray(value) &&
    ((value.length === 2 && isNumber(value[0]) && isNumber(value[1])) ||
      (value.length === 3 &&
        isNumber(value[0]) &&
        isNumber(value[1]) &&
        isNumber(value[2])) ||
      (value.length === 4 &&
        isNumber(value[0]) &&
        isNumber(value[1]) &&
        isNumber(value[2]) &&
        isNumber(value[3])));
  return (
    isUndefined(value) ||
    isBoolean(value) ||
    isNumber(value) ||
    isBasicPropertyArray
  );
};

export const isPropertyValue = (value: any): value is PropertyValue => {
  return (
    isTextDocument(value) ||
    isShape(value) ||
    isMarkerValue(value) ||
    isBasicPropertyValue(value)
  );
};

export const isObject = (data: any): data is { [key: string]: any } => {
  return Object.prototype.toString.call(data) === "[object Object]";
};

export const isArray = (data: any): data is any[] => {
  return Array.isArray(data);
};

export const isFunction = (data: any): data is Function => {
  return typeof data === "function";
};

const posinf = Number.POSITIVE_INFINITY;
const neginf = Number.NEGATIVE_INFINITY;

export const isNumber = (data: any): data is number => {
  return typeof data === "number" && data > neginf && data < posinf;
};

export const isUndefined = (data: any): data is undefined => {
  return data === undefined;
};

export const isBoolean = (data: any): data is Boolean => {
  return data === false || data === true;
};

export const isString = (data: any): data is string => {
  return typeof data === "string";
};

export const isCompItems = (items: any): items is CompItem[] => {
  return items.every(isCompItem);
};
