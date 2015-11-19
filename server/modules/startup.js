let startup = () => {
  _setEnvironmentVariables();
  _setBrowserPolicies();
  _generateAccounts();
  _generateModals();
};

var _setEnvironmentVariables = () => Modules.server.setEnvironmentVariables();

var _setBrowserPolicies = () => {};

var _generateAccounts = () => Modules.server.generateAccounts();

var _generateModals = () => Modules.server.generateModals();

Modules.server.startup = startup;
