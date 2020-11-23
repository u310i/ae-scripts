import { writeTextFile } from "./fileSys";
import { getNowJSTDate } from "../Javascript/date";
import { computeDurationWithMsec } from "../Javascript/general";

type JSONValue = string | number | null | boolean | undefined;
type JSONObject = {
  [key: string]: JSONValue | JSONValue[] | JSONObject;
};

const JsonReplacer = (key: string, value: any) => {
  return typeof value === "undefined" ? "undefined" : value;
};

export const writeLog = (
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
  return writeTextFile(name, str, options);
};

export const writeInit = (name: string = "init_log.txt"): boolean | null => {
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

export const writeErrorLog = (
  line: number,
  description: string,
  name = "log.txt"
): boolean | null => {
  const errorLogFomat: JSONObject = {
    level: "ERROR",
    line: line,
    description
  };
  return writeLog(name, errorLogFomat, { mode: "a", ln: true });
};
