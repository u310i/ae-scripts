import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import babel from "rollup-plugin-babel";

const extensions = [".js", ".ts"];

export default {
  input: "src/index.ts",
  output: {
    file: "dist/bundle.jsx",
    format: "iife",
    sourcemap: true
  },
  plugins: [
    resolve({
      extensions,
      preferBuiltins: true
    }),
    commonjs({
      include: "node_modules/**/*",
      namedExports: {}
    }),
    babel({
      extensions,
      runtimeHelpers: true,
      sourceMap: true,
      include: ["src/**/*", "node_modules/**/*"],
      // exclude: "node_modules/**"
      presets: [
        [
          "@babel/preset-env",
          {
            useBuiltIns: false
          }
        ],
        "@babel/typescript"
      ],
      plugins: [
        "@babel/plugin-transform-classes",
        "@babel/plugin-proposal-object-rest-spread",
        "./babelPlugins/transformConditionalOperatorAlternateWithParentheses"
      ]
    })
  ]
};
