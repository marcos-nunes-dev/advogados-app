const defaults = require('@storybook/react/dist/server/config/defaults/webpack.config');
const webpack  = require('webpack');

module.exports = (base, env) => {
  const config = defaults(base, env);
  return Object.assign({}, config, {
    resolve: Object.assign({}, config.resolve, {
      alias: Object.assign({}, (config.resolve || {}).alias, {
        react: 'preact-compat',
        'react-dom': 'preact-compat'
      })
    }),
    plugins: [
      new webpack.ProvidePlugin({
        Component: ['preact', 'Component'],
        React: ['preact-compat']
      })
    ].concat(config.plugins)
  })
};
