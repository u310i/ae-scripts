import { getFSFile, getFSPath } from "./System/fileSys";

export type RQItemStatusKeys = keyof typeof RQItemStatus | "";

export const getRQItemStatus = (item: RenderQueueItem): RQItemStatusKeys => {
  let status: RQItemStatusKeys = "";
  switch (item.status) {
    case RQItemStatus.WILL_CONTINUE:
      status = "WILL_CONTINUE";
      break;
    case RQItemStatus.NEEDS_OUTPUT:
      status = "NEEDS_OUTPUT";
      break;
    case RQItemStatus.UNQUEUED:
      status = "UNQUEUED";
      break;
    case RQItemStatus.QUEUED:
      status = "QUEUED";
      break;
    case RQItemStatus.RENDERING:
      status = "RENDERING";
      break;
    case RQItemStatus.USER_STOPPED:
      status = "USER_STOPPED";
      break;
    case RQItemStatus.ERR_STOPPED:
      status = "ERR_STOPPED";
      break;
    case RQItemStatus.DONE:
      status = "DONE";
      break;
  }
  return status;
};

export const addRenderQueue = (
  compItem: CompItem,
  relPath: string = "./render/output.avi",
  options: {
    renderTemplate?: string;
    moduleTemplate?: string;
    statusChanged?: (RQItem: RenderQueueItem, status: RQItemStatusKeys) => void;
    logType?: keyof typeof LogType;
  } = {}
) => {
  const renderQueue = app.project.renderQueue;
  renderQueue.items.add(compItem);
  const RQItem = renderQueue.item(renderQueue.numItems);

  RQItem.applyTemplate(options.renderTemplate || "Best Settings");
  const moduleItem = RQItem.outputModule(RQItem.numOutputModules);
  moduleItem.applyTemplate(options.moduleTemplate || "Lossless");

  const file = getFSFile(relPath);
  if (file.exists) file.remove();

  moduleItem.file = file;
  moduleItem.includeSourceXMP = false;

  const statusChanged = options.statusChanged;
  if (statusChanged) {
    RQItem.onStatusChanged = () => {
      statusChanged(RQItem, getRQItemStatus(RQItem));
    };
  }
  const logType = options.logType;
  if (logType) RQItem.logType = LogType[logType];

  return RQItem;
};
