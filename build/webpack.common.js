const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// entry 和 plugins
const chunkConfig = require('./base-config')
// rules
const rules = require('./rules')

module.exports = {
  entry: chunkConfig.entry,
  resolve: {
    extensions: ['.js', '.vue', '.json'],  // 导入时不带后缀名的话，依此顺序寻找文件
    alias: {
      '@': path.resolve('src')  // src目录的快捷符
    }
  },
  externals: {    // 直接通过script标签引用/直接使用cdn，不会被打包，减少打包后的体积
    jquery: 'jQuery',
    _ : 'lodash'
  },
  module: {
    rules: rules,
  },
  plugins: chunkConfig.plugins,
};
