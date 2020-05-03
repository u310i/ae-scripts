declare module "zero-fill" {
  function zeroFill(width: number, number: number, pad?: string): string;
  export = zeroFill;
}

declare var $L: {
  error: $T.Log.WriteError;
};

declare var $I: {
  undo: boolean;
};

interface RenderQueueItem {
  onStatusChanged: () => void | null;
}

interface Application {
  onError: (err: string) => void;
}

interface Project {
  expressionEngine: "javascript-1.0" | "extendscript";
}
