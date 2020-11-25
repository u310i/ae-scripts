import defaultConfig from "./config/rollup.default.config.js";
import * as path from "path";

export default commandLineArgs => {
  if (process.env.NAME === "TimeRemapCycleLoop") {
    return {
      ...defaultConfig,
      input: "src/projects/TimeRemapCycleLoop/index.ts",
      output: [
        {
          ...defaultConfig.output,
          file: path.resolve(
            __dirname,
            "build/TimeRemapCycleLoop/Time-Remap-Cycle-Loop.jsx"
          )
        },
        {
          ...defaultConfig.output,
          file: path.resolve(__dirname, "build/Time-Remap-Cycle-Loop.jsx")
        }
      ]
    };
  }
  if (process.env.NAME === "TrueTimeRemap") {
    return {
      ...defaultConfig,
      input: "src/projects/TrueTimeRemap/index.ts",
      output: [
        {
          ...defaultConfig.output,
          file: path.resolve(
            __dirname,
            "build/TrueTimeRemap/True-Time-Remap.jsx"
          )
        },
        {
          ...defaultConfig.output,
          file: path.resolve(__dirname, "build/True-Time-Remap.jsx")
        }
      ]
    };
  }
  if (process.env.NAME === "EffectController") {
    return {
      ...defaultConfig,
      input: "src/projects/EffectController/turblentNoise.ts",
      output: [
        {
          ...defaultConfig.output,
          file: path.resolve(
            __dirname,
            "build/EffectController/EffectController-TurblentNoise.jsx"
          )
        },
        {
          ...defaultConfig.output,
          file: path.resolve(
            __dirname,
            "build/EffectController-TurblentNoise.jsx"
          )
        }
      ]
    };
  }
  if (process.env.NAME === "ReName") {
    return {
      ...defaultConfig,
      input: "src/projects/ReName/index.ts",
      output: [
        {
          ...defaultConfig.output,
          file: path.resolve(__dirname, "build/ReName/Re-Name.jsx")
        },
        {
          ...defaultConfig.output,
          file:
            "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\ScriptUI Panels\\Re-Name.jsx"
        }
      ]
    };
  }
  if (process.env.NAME === "CopyMarker") {
    return {
      ...defaultConfig,
      input: "src/projects/Marker/index.ts",
      output: [
        {
          ...defaultConfig.output,
          file: path.resolve(__dirname, "build/Marker/Copy-Marker.jsx")
        },
        {
          ...defaultConfig.output,
          file: path.resolve(
            __dirname,
            "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\ScriptUI Panels\\Copy-Marker.jsx"
          )
        }
      ]
    };
  }
  if (process.env.NAME === "ReplaceUsingItem") {
    return {
      ...defaultConfig,
      input: "src/projects/ReplaceUsingItem/index.ts",
      output: [
        {
          ...defaultConfig.output,
          file: path.resolve(
            __dirname,
            "build/ReplaceUsingItem/Replace-UsingItem.jsx"
          )
        },
        {
          ...defaultConfig.output,
          file:
            "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\ScriptUI Panels\\Replace-UsingItem.jsx"
        }
      ]
    };
  }
  if (process.env.NAME === "UHSAuthor") {
    return {
      ...defaultConfig,
      input: "src/projects/UHSAuthor/index.ts",
      output: [
        {
          ...defaultConfig.output,
          file: path.resolve(__dirname, "build/UHSAuthor/UHS-Author.jsx")
        },
        {
          ...defaultConfig.output,
          file:
            "C:\\Program Files\\Adobe\\Adobe After Effects 2020\\Support Files\\Scripts\\ScriptUI Panels\\UHS-Author.jsx"
        }
      ]
    };
  }
  return defaultConfig;
};
