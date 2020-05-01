// import "date-polyfill";
import "./polyfill";
// import "airbnb-js-shims";
import log from "./utils/log";
import fileSys from "./utils/fileSys";

$L = {
  error: log.writeError
};

$I = {
  undo: false
};

fileSys.deleteFile("init_log.txt");
fileSys.deleteFile("log.txt");
log.writeInit();

// app.saveProjectOnCrash = false
