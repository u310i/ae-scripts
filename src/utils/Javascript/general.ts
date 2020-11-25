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

export const times = (
  step: number,
  callback: (index: number) => boolean | null | undefined | void,
  reverse: boolean = false
): void => {
  if (reverse) {
    for (let i = step; i > 0; i--) {
      if (callback(i)) {
        break;
      } else {
        continue;
      }
    }
  } else {
    for (let i = 1; i <= step; i++) {
      if (callback(i)) {
        break;
      } else {
        continue;
      }
    }
  }
};

export const setTimeout = (callback: () => void, time: number) => {
  $.sleep(time);
  callback();
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
