import "../../polyfill/array/forEach";
import * as win from "./ui";
import { addString } from "./utils";
import { renameWithSimpleGlob, escapeRegex } from "./rename";

const main = () => {
  // initialize
  // ======
  win.itemRadio.value = true;
  win.nameRadio.value = true;
  win.insertRadio.value = true;
  win.replaceSimpleRadio.value = true;
  win.searchGroup.enabled = false;
  win.replaceRadioGroup.enabled = false;

  // event
  // ======
  win.insertRadio.onActivate = () => {
    win.searchGroup.enabled = false;
    win.insertRadioGroup.enabled = true;
    win.replaceRadioGroup.enabled = false;
  };

  win.replaceRadio.onActivate = () => {
    win.searchGroup.enabled = true;
    win.insertRadioGroup.enabled = false;
    win.replaceRadioGroup.enabled = true;
  };

  win.ok.onClick = () => {
    let addStringCallback: ((prev: string) => string | null) | undefined;
    const replaceText = win.insertInput.text;
    const searchText = win.searchInput.text;

    if (win.insertRadio.value) {
      if (win.insertAllRadio.value) {
        addStringCallback = () => replaceText;
      }
      if (win.insertHeadRadio.value) {
        addStringCallback = prev => replaceText + prev;
      }
      if (win.insertTailRadio.value) {
        addStringCallback = prev => prev + replaceText;
      }
    }

    if (win.replaceRadio.value) {
      if (win.replaceSimpleRadio.value) {
        addStringCallback = prev => {
          const regexp = new RegExp(escapeRegex(searchText));
          return prev.replace(regexp, replaceText);
        };
      }
      if (win.replaceGlobRadio.value) {
        addStringCallback = prev => {
          const newString = renameWithSimpleGlob(prev, searchText, replaceText);
          return newString;
        };
      }
    }

    if (addStringCallback !== undefined) {
      const isName = win.nameRadio.value;
      const isComment = win.commentRadio.value;
      if (win.itemRadio.value) {
        isName && addString("item", "name", addStringCallback);
        isComment && addString("item", "name", addStringCallback);
      }
      if (win.layerRadio.value) {
        isName && addString("layer", "name", addStringCallback);
        isComment && addString("layer", "comment", addStringCallback);
      }
    }

    !win.isPanel && (win.dialog as Window).close();
  };

  // ======
  win.dialog.layout.layout();
  !win.isPanel && (win.dialog as Window).show();
};

main();
