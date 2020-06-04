/* eslint-env node */
const webpack = require('webpack')
const path = require('path');
const ejs = require('ejs');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = (env = {}) => {
  return {
    entry: './src/config.js',
    output: {
      filename: `config-${env.version}.js`,
      library: 'config',
      libraryTarget: 'amd',
      path: path.resolve(__dirname, '../build'),
    },
    mode: 'production',
    module: {
      rules: [
        { parser: { System: false } },
        {
          test: /\.js?$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          exclude: [path.resolve(__dirname, 'node_modules'), /\.krem.css$/],
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                localIdentName: '[path][name]__[local]',
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins() {
                  return [
                    require('autoprefixer')
                  ];
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          include: [path.resolve(__dirname, 'node_modules')],
          exclude: [/\.krem.css$/],
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      modules: [
        __dirname,
        'node_modules',
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __DEVMODE__: !env.production
      }),
      CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, '../src/index.html'),

          // 将模板中的字符串动态的替换为真实的值.
          transform: (content) => {
            const s = content.toString();
            return ejs.render(s, { VERSION: env.version });
          }
        }
      ]),

    ],
    devtool: 'source-map',
    externals: [
      /^lodash$/,
      /^single-spa$/
    ],
  };
}

