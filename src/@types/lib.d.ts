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
