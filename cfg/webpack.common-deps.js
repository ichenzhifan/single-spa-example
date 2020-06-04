const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = (env = {}) => {

  return {
    entry: './src/common-deps.js',
    output: {
      filename: 'common-deps.js',
      path: path.resolve(__dirname, '../build/common-deps'),
      chunkFilename: '[name].js',
    },
    mode: 'production',
    node: {
      fs: 'empty',
    },
    resolve: {
      modules: [
        __dirname,
        'node_modules',
      ],
    },
    devtool: 'sourcemap',
    plugins: [
      new webpack.DefinePlugin({
        __DEVMODE__: !env.production
      }),
      new CleanWebpackPlugin(['../build/common-deps/'])
    ],
    module: {
      rules: [
        { parser: { System: false } },
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
          }
        }
      ]
    }
  }
};
