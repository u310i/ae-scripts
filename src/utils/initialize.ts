import { writeErrorLog } from "./System/log";
import { showErrorAlert } from "./window";

export const __Error__ = (line: number, description: string): void => {
  showErrorAlert(line, description);
};

export const __canUndo__ = false;
