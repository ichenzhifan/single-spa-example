const webpack = require("webpack");
const merge = require("webpack-merge");

const WriteFilePlugin = require('write-file-webpack-plugin');

const devConfig = {
  devtool: "source-map",
  mode: "development",
  devServer: {
    contentBase: "./dist", //资源文件目录
    open: false, //自动打开浏览器
    hot: false,
    port: 8081, //服务器端口,
    hotOnly: true,
    proxy: {
      "/api": {
        target: "http://localhost:9092"
      }
    },
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new WriteFilePlugin()
  ]
};

module.exports = devConfig;
