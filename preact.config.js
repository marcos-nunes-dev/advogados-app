import path from 'path';
import cssnext from 'postcss-cssnext';

const reactToolboxPath = path.resolve('./node_modules', 'react-toolbox');

export default (config, env, helpers) => {
  /**
  |--------------------------------------------------
  | Configure JSX Control Statements
  |--------------------------------------------------
  */

  const { rule } = helpers.getLoadersByName(config, 'babel-loader')[0];
  const babelConfig = rule.options;

  babelConfig.plugins.push('jsx-control-statements');

  /**
  |--------------------------------------------------
  | Configure Preact Compat
  |--------------------------------------------------
  */

  const alias = config.resolve.alias;

  alias.react = 'preact-compat';
  alias['react-dom'] = 'preact-compat';
  alias['react-redux'] = 'preact-redux';

  /**
  |--------------------------------------------------
  | Configure React-Toolbox
  |--------------------------------------------------
  */

  const [cssModulesRule, globalCssRule] = helpers.getLoadersByName(config, 'postcss-loader');

  cssModulesRule.rule.include.push(reactToolboxPath); // this enables css modules for react-toolbox

  globalCssRule.rule.exclude.push(reactToolboxPath); // exclude react-toolbox from global css
  globalCssRule.rule.loader[cssModulesRule.loaderIndex].options.plugins = () => [cssnext];
};
