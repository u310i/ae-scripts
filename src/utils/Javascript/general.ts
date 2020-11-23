import {
  isCompItem,
  isFolderItem,
  isFootageItem,
  isAVLayer,
  isFileSource,
  isSolidSource,
  isProperty,
  isPropertyGroup,
  isObject
} from "../typeCheck";
import { getAllItems } from "../GetEntity/getEntity";

export const times = (
  step: number,
  callback: (index: number) => boolean | null | undefined | void
): void => {
  for (let i = 1; i <= step; i++) {
    if (callback(i)) {
      break;
    } else {
      continue;
    }
  }
};

export const unselectAllItems = (): void => {
  getAllItems().forEach(item => {
    if (item.selected) item.selected = false;
  });
};

export const computeDurationWithMsec = (ms: number): string => {
  const h = parseInt(String(Math.floor(ms / 3600000) + 100).substring(1));
  const m = parseInt(
    String(Math.floor((ms - h * 3600000) / 60000) + 100).substring(1)
  );
  const s = parseInt(
    String(Math.round((ms - h * 3600000 - m * 60000) / 1000) + 100).substring(1)
  );
  return h + ":" + m + ":" + s;
};
