// const escapeGlob = str => {
//   return str.replace(/[-\/\\^$+.()|[\]{}]/g, "\\$&");
// };

// let text = "red_\\*\\*_blue_green";
// let glob = "_*_\\*\\*_*_";

// text = "\\*\\*_red_\\***_blue_\\*\\*\\*\\?\\?_red_\\???_blue_\\?\\?\\?";
// glob = "\\*\\*_***_\\***_****_\\*\\*\\*\\?\\?_???_\\???_????_\\?\\?\\";

// text = "\\*\\*_red_\\***";
// glob = "\\*\\*_***_\\***";

// text = "\\*\\?_---_\\*+++";
// glob = "\\*\\?_---_\\*+++";

// text = "\\*red_\\*_blue_\\?AB_green_yellow";
// glob = "\\**_\\*_*_\\???_*_???*";

// text = "red_blue_green";
// glob = "*_????_*";

// text = "\\*-\\*";
// glob = "\\*-\\*";

// text = "red_blue_green";
// glob = "*_*_???*";

// text = "green_?ab_red";
// glob = "*_\\???_red";

// const escapedString = escapeGlob(glob);

// let regexpString = escapedString.replace(
//   /(\*|\?+)/g,
//   (match, string, offset) => {
//     if (match === "*") {
//       if (offset > 0 && escapedString.substr(offset - 1, 1) === "\\") {
//         return "\\*";
//       }
//       return "(.*)";
//     }
//     if (/\?+/.test(match)) {
//       if (offset > 0 && escapedString.substr(offset - 1, 1) === "\\") {
//         if (match.length > 1) {
//           return `\\?(${match.substr(1).replace(/\?/g, ".")})`;
//         }
//         return "\\?";
//       }
//       return `(${match.replace(/\?/g, ".")})`;
//     }
//     return "";
//   }
// );

// const regexp = new RegExp(regexpString);
// let result = text.replace(regexp, "$1, $2");
// result = text.replace(regexp, "foo");
// console.log(regexp.test(text));
// console.log(regexp.toString());
// console.log(result);

const text = "***_???_+++";
const escapeRegex = str => {
  return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
};
const regexp = new RegExp(escapeRegex("+++"), "g");
const res = text.replace(regexp, "blue");
console.log(res);
