declare module "string.prototype.trimend/shim";
declare module "zero-fill" {
  function zeroFill(width: number, number: number, pad?: string): string;
  export = zeroFill;
}

// import { ParsedPath } from "path";

// declare module "path-parse" {
//   export function bar(): string;
// }

// interface Array<T> {
//   find<S extends T>(
//     predicate: (this: void, value: T, index: number, obj: T[]) => value is S,
//     thisArg?: any
//   ): S | undefined;
//   find(
//     predicate: (value: T, index: number, obj: T[]) => unknown,
//     thisArg?: any
//   ): T | undefined;
// }
