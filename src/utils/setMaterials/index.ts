import { __canUndo__, __Error__ } from "../initialize";
import { findItemWithName, findLayerWithName } from "../GetEntity/getEntity";
import { isCompItem, isFolderItem, isObject } from "../typeCheck";
import { isMaterials } from "./utils";
import setMaterialsToLayer from "./setProperty";

// const replaceComp = getItemFromPathArr([
//   "aaa",
//   "foo1",
//   "bar",
//   "grandChild"
// ]) as CompItem;

// const materials: $T.Mat.Materials = {
//   aaa: {
//     foo1: {
//       parent1: {
//         compLayer1: {
//           replaceSource: replaceComp,
//           "ADBE Transform Group": {
//             "ADBE Position": [100, 100]
//           }
//         },
//         compLayer2: {
//           "ADBE Mask Parade": {
//             "Mask 1": {
//               "Mask Path": {
//                 $$shape: true,
//                 vertices: [
//                   [0, 0],
//                   [0, 100],
//                   [100, 100],
//                   [100, 0]
//                 ],
//                 closed: true
//               }
//             }
//           }
//         },
//         text: {
//           Text: {
//             "Source Text": {
//               $$text: true,
//               applyFill: true,
//               applyStroke: true,
//               resetCharStyle: undefined,
//               fontSize: 1000,
//               fillColor: [1, 0, 0],
//               strokeColor: [0, 1, 0],
//               strokeWidth: 10,
//               font: "Yu Gothic UI",
//               strokeOverFill: true,
//               text: "Change!",
//               justification: ParagraphJustification.CENTER_JUSTIFY,
//               tracking: 50
//             }
//           }
//         },
//         solid1: {
//           "ADBE Transform Group": {
//             "ADBE Opacity": 50
//           }
//         }
//       }
//     }
//   }
// };

// setMaterials(materials, app.project.rootFolder);

const setMaterials = (
  materials: $T.Mat.Materials,
  parent: FolderItem | CompItem = app.project.rootFolder
): void => {
  if (!isMaterials(materials)) {
    __Error__($.line, `setMaterials / materials is not parent Materials`);
    return;
  }

  __canUndo__ && app.beginUndoGroup("setMaterials");

  Object.keys(materials).forEach((key, i) => {
    const childMaterials = materials[key];
    if (!isMaterials(childMaterials)) {
      __Error__(
        $.line,
        `setMaterials / materials is not Materials / materials is ${key}`
      );
      return;
    }
    if (isFolderItem(parent)) {
      const item = findItemWithName(key, parent);
      if (!item) {
        __Error__($.line, `setMaterials / item is not found / key is ${key}`);
        return;
      }

      if (isFolderItem(item) || isCompItem(item)) {
        if (isObject(childMaterials)) {
          if (isMaterials(childMaterials)) {
            setMaterials(childMaterials, item);
          }
        }
        return;
      }
      return;
    }

    if (isCompItem(parent)) {
      const layer = findLayerWithName(key, parent);
      if (!layer) {
        __Error__($.line, `setMaterials / layer is not found / key is ${key}`);
        return;
      }
      if (isMaterials(childMaterials)) {
        setMaterialsToLayer(childMaterials, layer);
      }
      return;
    }

    __Error__($.line, `setMaterials / not folder or comp / key is ${key}`);
  });

  __canUndo__ && app.endUndoGroup();
};

export default setMaterials;
