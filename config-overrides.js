const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = (config, env) => {
  if (env === "development") {
    // @see https://github.com/cdharris/react-app-rewire-hot-loader/issues/23
    config.resolve.alias["react-dom"] = "@hot-loader/react-dom";
  }

  config = rewireReactHotLoader(config, env);

  return config;
};
