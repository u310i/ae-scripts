declare module "zero-fill" {
  function zeroFill(width: number, number: number, pad?: string): string;
  export = zeroFill;
}

declare module "globalThis";
declare module "json-format";

// declare var $L: {
//   error: $T.Log.WriteError;
// };

// declare var $I: {
//   undo: boolean;
// };

interface RenderQueueItem {
  onStatusChanged: () => void | null;
}

interface Application {
  onError: (err: string) => void;
}

interface Project {
  expressionEngine: "javascript-1.0" | "extendscript";
  itemByID: (id: number) => Item;
}

declare var __BuildName__: any;
