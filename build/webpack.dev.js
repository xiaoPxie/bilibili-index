const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
  output: {
    filename: '[name].[hash].bundle.js',
    chunkFilename: "[name].[hash].chunk.js",   // 决定非入口 chunk 的名称
    path: path.join(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    // port: "8018",   // 设置端口号为8018
    host: '0.0.0.0',
    useLocalIp: true, // 不设置此值，默认打开的是0.0.0.0
    inline: true, // 文件修改后实时刷新
    historyApiFallback: false, //不跳转
    hot: true , // 热更新
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:8018', // 你项目的本地服务地址
    //     bypass: function(req, res, proxyOptions) {
    //       const userAgent = req.headers['user-agent'];
    //       if (req.headers.accept.indexOf('html') !== -1) {
    //         // 根据访问终端返回模板
    //         if (/mobile/i.test(userAgent) && !/iPad/i.test(userAgent)) {
    //           return '/index.mobile.html';
    //         }
    //         return '/index.pc.html';
    //       }
    //     },
    //   },
    // },
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(), // 热更新插件
    new MiniCssExtractPlugin({
      filename: "./css/[name].[hash].css",
      chunkFilename: "./css/[name].[hash].css"
    })
  ]
});
