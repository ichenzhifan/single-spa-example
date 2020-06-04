/* eslint-env node */
const config = require('./webpack.common-deps.js');
const webpack = require('webpack');
const WriteFilePlugin = require('write-file-webpack-plugin');

config.plugins.push(new webpack.NamedModulesPlugin());
config.plugins.push(new WriteFilePlugin());
config.plugins.push(new webpack.HotModuleReplacementPlugin());
config.devServer = {
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
}

config.mode = 'development'

module.exports = config;

