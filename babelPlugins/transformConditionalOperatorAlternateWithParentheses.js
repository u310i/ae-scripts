module.exports = ({ types: t }) => {
  return {
    name: "TransformConditionalExpressionAlternateWithParentheses",
    visitor: {
      ConditionalExpression: path => {
        path.node.consequent = t.parenthesizedExpression(path.node.consequent);
        path.node.alternate = t.parenthesizedExpression(path.node.alternate);
      },
      LogicalExpression: path => {
        path.node.right = t.parenthesizedExpression(path.node.right);
      }
    }
  };
};
