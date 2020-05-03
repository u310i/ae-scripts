// import "date-polyfill";
import "./polyfill";
// import "airbnb-js-shims";
import log from "./utils/log";
import { deleteFSFile } from "./utils/fileSys";

/**
 * http://docs.aenhancers.com/general/application/#app-saveprojectoncrash
 */
// app.saveProjectOnCrash = false

/**
 * http://docs.aenhancers.com/general/application/#app-saveprojectoncrash
 */
// app.beginSuppressDialogs()

app.project.bitsPerChannel = 16;
app.project.expressionEngine = "javascript-1.0";

$L = {
  error: log.writeError
};

$I = {
  undo: false
};

deleteFSFile("init_log.txt");
deleteFSFile("log.txt");
log.writeInit();
