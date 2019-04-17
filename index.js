const path = require("path");
const express = require("express");
const plugin = require("docmatic-plugin");

const config = require(path.join(__dirname, "lib", "config.js"));
const h = require(path.join(__dirname, "lib", "helper", "array-helper.js"));

module.exports = (options = {}) => {
  const app = options.app || express();

  const docmaticConfig = config.loadDocmaticConfig(options);
  const pluginConfigs = (docmaticConfig.plugins || []).filter(h.nonEmptyValues);

  const pluginOptions = pluginConfigs.reduce((options, config) => {
    const pluginName = plugin.pluginName(config);
    options[pluginName] = plugin.pluginOptions(config);
    return options;
  }, {});

  const pluginNames = Object.keys(pluginOptions);

  pluginNames.forEach(name => plugin.bind(app, name, pluginOptions[name]));

  return app;
};
