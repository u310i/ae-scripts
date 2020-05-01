function canWriteFiles() {
  var appVersion, commandID, scriptName, tabName;

  appVersion = parseFloat(app.version);

  commandID = 2359;
  tabName = "General";
  if (appVersion >= 16.1) {
    commandID = 3131;
    tabName = "Scripting & Expressions";
  }

  if (isSecurityPrefSet()) return true;

  scriptName = script && script.name ? script.name : "Script";
  alert(
    (message =
      scriptName +
      " requires access to write files.\n" +
      'Go to the "' +
      tabName +
      '" panel of the application preferences and make sure ' +
      '"Allow Scripts to Write Files and Access Network" is checked.')
  );

  app.executeCommand(commandID);

  return isSecurityPrefSet();

  function isSecurityPrefSet() {
    return (
      app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
      ) === 1
    );
  }
}

canWriteFiles() && alert("true");
