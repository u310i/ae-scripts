import "extendscript-es5-shim";
import "extendscript-es6-shim";
import "./polyfill";
import trimEndShim from "string.prototype.trimend/shim";

trimEndShim();

// for "path-parse"
process = {} as NodeJS.Process;
