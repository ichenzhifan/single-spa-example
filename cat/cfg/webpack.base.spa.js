const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpack = require('webpack');

// 将所有的入口 chunk(entry chunks)中引用的 *.css，移动到独立分离的 CSS 文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const devConfig = require('./webpack.dev');
const proConfig = require('./webpack.pro');

const getBaseConfig = ({ devMode }) => {
  return {
    entry: {
      main: ['./src/index.spa.js']
    },   
    output: {
      filename: 'cat.js',
      library: 'cat',
      libraryTarget: 'amd',
      path: path.resolve(__dirname, '../../build/cat'),
    },
    module: {
      rules: [
        { parser: { System: false } },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode
              }
            },
            'css-loader',
            'postcss-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              name: '[name]_[hash].[ext]',
              outputPath: 'images/',
              limit: 12288
            }
          }
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader'
          }
        }
      ]
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEVELOPMENT__: devMode
      }),
      new htmlWebpackPlugin({
        title: 'webpack',
        filename: 'index.html',
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        // 这里的配置和webpackOptions.output中的配置相似
        // 即可以通过在名字前加路径，来决定打包后的文件存在的路径
        filename: devMode ? 'css/[name].css' : 'css/[name].[hash].css',
        chunkFilename: devMode ? 'css/[id].css' : 'css/[id].[hash].css'
      }),
      new CleanWebpackPlugin()
    ],
    externals: [
      /^@portal\/*/,
      /^lodash$/,
      /^single-spa$/,
      /^rxjs\/?.*$/,
      /^react$/,
      /^redux$/,
      /^react-redux$/,
      /^reselect$/,
      /^immutabl$/,
      /^react\/lib.*/,
      /^react-dom$/,
      /.*react-dom.*/,
    ]
  };
};

module.exports = (env = {}) => {
  const { production } = env;

  if (production) {
    return merge(
      getBaseConfig({
        devMode: false
      }),
      proConfig
    );
  } else {
    return merge(
      getBaseConfig({
        devMode: true
      }),
      devConfig
    );
  }
};
