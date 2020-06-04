/* eslint-env node */
const config = require('./webpack.config.js');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new WriteFilePlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());

config.devServer = {
  contentBase: './build',
  historyApiFallback: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
  proxy: {
    "/common/": {
      target: "http://localhost:8234",
      pathRewrite: {"^/common" : ""}
    }
  }
}

config.mode = 'development'

module.exports = config;
