const { transform } = require("@babel/core");
// const log = require("babel-log");
// var fs = require("fs");

// import {transform} from "babel-core"
const test = true ? "foo" : "bar";

const src = "true ? 'foo' : () => true ? 'bar' : 'baz'";
const plugin = ({ types: t }) => {
  return {
    name: "TransformConditionalExpressionAlternateWithParentheses",
    visitor: {
      ConditionalExpression: path => {
        console.log(t.parenthesizedExpression(path.node.alternate));
        path.node.alternate = t.parenthesizedExpression(path.node.alternate);
      }
    }
  };
};
const { code } = transform(src, { plugins: [plugin] });
console.log(code);
