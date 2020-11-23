export const escapeRegex = (str: string): string => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};

export const escapeGlob = (str: string): string => {
  return str.replace(/[-\/\\^$+.()|[\]{}]/g, "\\$&");
};

export const simpleGlobToRegexp = (glob: string): RegExp => {
  const escapedString = escapeGlob(glob);

  let offsetIncrement = 0;
  const regexpString = escapedString.replace(
    /(\*|\?+)/g,
    (match, string, offset) => {
      // Since offset is performed on the replaced string, the increment of the replaced string is added to offset.
      const trueOffset = offset - offsetIncrement;
      if (match === "*") {
        if (
          trueOffset - offsetIncrement > 0 &&
          escapedString.substr(trueOffset - 1 - offsetIncrement, 1) === "\\"
        ) {
          offsetIncrement += 1;
          return "\\*";
        }
        offsetIncrement += 3;
        return "(.*)";
      }
      if (/\?+/.test(match)) {
        if (
          trueOffset > 0 &&
          escapedString.substr(trueOffset - 1, 1) === "\\"
        ) {
          if (match.length > 1) {
            offsetIncrement += 3;
            return `\\?(${match.substr(1).replace(/\?/g, ".")})`;
          }
          offsetIncrement += 1;
          return "\\?";
        }
        offsetIncrement += 2;
        return `(${match.replace(/\?/g, ".")})`;
      }
      return "";
    }
  );

  return new RegExp(regexpString);
};

export const renameWithSimpleGlob = (
  targetString: string,
  glob: string,
  replaceStr: string
): string => {
  const regexp = simpleGlobToRegexp(glob);
  const newString = targetString.replace(regexp, replaceStr);
  return newString;
};
