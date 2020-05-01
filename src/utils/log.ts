import fileSys from "./fileSys";
import { getNowJSTDate } from "./date";
import { computeDurationWithMS } from "./utils";

type JSONValue = string | number | null | boolean | undefined;
type JSONObject = {
  [key: string]: JSONValue | JSONValue[] | JSONObject;
};

const JsonReplacer = (key: string, value: any) => {
  return typeof value === "undefined" ? "undefined" : value;
};

const writeLog = (
  name: string,
  contents: JSONObject,
  options: {
    mode?: "w" | "a";
    ln?: boolean;
  } = {}
): boolean | null => {
  const { level, ...contentsForJSON } = contents;
  const header = `${level}  ${getNowJSTDate()}\n`;
  const str =
    header + JSON.stringify(contentsForJSON, JsonReplacer, "  ") + "\n";
  return fileSys.writeTextFile(name, str, options);
};

const writeInit = (name: string = "init_log.txt"): boolean | null => {
  const initLogFormat = {
    level: "INIT",
    appBuild: app.buildName,
    appBuildNum: app.buildNumber,
    appVersion: app.version,
    $: {
      fileName: $.fileName,
      build: $.build,
      buildDate: $.buildDate.toString(),
      locale: $.locale,
      version: $.version
    }
  };

  return writeLog(name, initLogFormat, { mode: "w", ln: true });
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

const writeError: WriteError = (
  line,
  description,
  options = {},
  name = "log.txt"
) => {
  const errorLogFomat: JSONObject = {
    level: "ERROR",
    line: line,
    description
  };
  if (options.variables) errorLogFomat.variables = options.variables;

  return writeLog(name, errorLogFomat, { mode: "a", ln: true });
};

export default {
  writeLog,
  writeInit,
  writeError
};
