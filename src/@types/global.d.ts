import ".";

declare global {
  export namespace $T {
    type DeepPartial<T> = T extends object
      ? {
          [P in keyof T]?: DeepPartial<T[P]>;
        }
      : T;

    type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X
      ? 1
      : 2) extends <T>() => T extends Y ? 1 : 2
      ? A
      : B;

    type WritableKeys<T> = {
      [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        P
      >;
    }[keyof T];

    type ReadonlyKeys<T> = {
      [P in keyof T]-?: IfEquals<
        { [Q in P]: T[P] },
        { -readonly [Q in P]: T[P] },
        never,
        P
      >;
    }[keyof T];

    type PropType<T> = T[keyof T];

    type RemoveTypeFromObj<T, K extends keyof T, U> = K extends keyof T
      ? T[K] extends U
        ? never
        : T[K]
      : never;
    // type BBB = RemoveTypeFromObj<TextValues, keyof TextValues, Function>;

    type RemoveTypeFromUnion<T, U> = T extends T
      ? T extends U
        ? never
        : T
      : never;
    // type FFF = RemoveTypeFromUnion<string | number | (() => void), () => void>;

    type RemoveSomeProp<T, U> = {
      [P in keyof T]: T[P] extends U ? never : T[P];
    }[keyof T];
    // type DDD = RemoveSomeProp<TextValues, Function >;

    namespace ADBE {
      type AnyItem = CompItem | FolderItem | FootageItem;
      type AnyLayer =
        | AVLayer
        | CameraLayer
        | LightLayer
        | ShapeLayer
        | TextLayer;

      type AnyProperty = Property | PropertyGroup | MaskPropertyGroup;
    }

    namespace Mat {
      type TextWithoutConstructor = Partial<
        Omit<
          TextDocument,
          "constructor" | "resetCharStyle" | "resetParagraphStyle"
        > & {
          resetCharStyle: undefined;
          resetParagraphStyle: undefined;
        }
      >;
      type TextValues = Pick<
        TextWithoutConstructor,
        WritableKeys<TextWithoutConstructor>
      >;
      type TextValuesWithID = { $$text?: boolean } & TextValues;
      type TextPropType = PropType<TextValuesWithID>;

      type MarkerValues = Partial<
        Omit<MarkerValue, "constructor" | "getParameters" | "setParameters"> & {
          setParameters: object;
        }
      >;
      type MarkerValuesWithID = {
        $$marker?: boolean;
      } & MarkerValues;
      type MarkerPropType = PropType<MarkerValuesWithID>;

      type ShapeValues = Partial<Shape>;
      type ShapeValuesWithID = {
        $$shape?: boolean;
      } & ShapeValues;
      type ShapePropType = PropType<ShapeValuesWithID>;

      type BasicValue = Exclude<
        PropertyValue,
        Shape | MarkerValue | TextDocument
      >;

      type Material =
        | BasicValue
        | TextValuesWithID
        | MarkerValuesWithID
        | ShapeValuesWithID
        | ((source: CompItem) => void);

      type Materials = {
        [key: string]: Material | Materials;
      };
    }
    namespace Struct {
      type Fade = {
        fade?: {
          in?: {
            duration: number;
          };
          out?: {
            duration: number;
          };
        };
      };

      type Share = {
        startBlank?: number;
      } & Fade;

      type CompData = {
        width?: number;
        height?: number;
        pixelAspect?: number;
        backgroundColor?: [number, number, number];
      };

      type Images = Array<{
        name: string;
      }>;

      type Replace = { images: Images };

      type Cuts = Array<{ name: string; replace: Replace } & Share>;

      type Parts = Array<
        {
          project: string;
          cuts: Cuts;
        } & Share
      >;

      type Struct = {
        compData: CompData;
        parts: Parts;
        endBlank?: number;
      } & Share;
    }
    namespace Log {
      type JSONValue = string | number | null | boolean | undefined;
      type JSONObject = {
        [key: string]: JSONValue | JSONValue[] | JSONObject;
      };
      type WriteError = (
        line: number,
        functionName: string,
        options?: {
          description?: string;
          variables?: JSONObject;
        },
        name?: string
      ) => boolean | null;
    }
  }
}
