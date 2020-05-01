import ts from "@wessberg/rollup-plugin-ts";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.jsx",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    ts({
      transpiler: "babel",
      babelConfig: {
        presets: [
          [
            "@babel/preset-env",
            {
              useBuiltIns: "usage",
              corejs: 3
            }
          ]
        ]
      }
    }),
    resolve(),
    commonjs()
  ]
};
