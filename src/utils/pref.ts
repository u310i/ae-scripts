// Allow Scripts to Write Files and Access Network
const isSecurityPrefSet = (): boolean => {
  const securitySetting = app.preferences.getPrefAsLong(
    "Main Pref Section",
    "Pref_SCRIPTING_FILE_NETWORK_SECURITY"
  );
  return securitySetting === 1;
};

export default {
  isSecurityPrefSet
};
