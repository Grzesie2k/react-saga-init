const {
  override,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader,
  addWebpackPlugin,
} = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = (config, env) => {
  config = override(
      // @see https://github.com/cdharris/react-app-rewire-hot-loader/issues/23
      addWebpackAlias(env === 'development' ? {
        'react-dom': '@hot-loader/react-dom',
      } : {}),

      // @see https://ant.design/docs/react/use-with-create-react-app#Use-babel-plugin-import
      fixBabelImports('import', {
        libraryName: 'antd',
        style: true,
      }),
      addLessLoader({
        javascriptEnabled: true,
        localIdentName: "[local]--[hash:base64:6]",
        modifyVars: {'@shadow-color': 'rgba(0, 0, 0, 0.35)'},
      }),
  )(config, env);

  config = rewireReactHotLoader(config, env);

  return config;
};
