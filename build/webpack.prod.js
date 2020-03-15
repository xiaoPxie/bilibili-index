const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const path = require('path');
const PurifyCssWebpack = require('purifycss-webpack'); // 引入PurifyCssWebpack插件
const glob = require("glob-all");   // 引入glob模块,用于扫描全部html文件中所引用的css

module.exports = merge(common, {
  output: {
    filename: './js/[name].[chunkhash].bundle.js',
    chunkFilename: "./js/[name].[chunkhash].chunk.js",   // 决定非入口 chunk 的名称
    path: path.join(__dirname, '../dist'),
    // publicPath: '../'
  },
  optimization: {   // 抽离公共的代码，例如：同样的import
    splitChunks: {
      cacheGroups: {
        // 其次: 打包业务中公共代码
        common: {
          name: "common",
          chunks: "all",    // async, initial, all
          minSize: 1,
          minChunks: 2,
          priority: 0
        },
        // 首先: 打包node_modules中的文件，第三方库
        vendor: {
          name: "vendor",
          test: /[\\/]node_modules[\\/]/,
          chunks: "all",
          priority: 10
        }
      }
    },
    minimize: true,
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true, // 启用多线程，构建更快
      }),
      new OptimizeCSSAssetsPlugin({}) // 压缩css
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      // 使用 process.env.NODE_ENV === 'production' ，一些 library 可能针对具体用户的环境进行代码优化
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(),
    new PurifyCssWebpack({ //清理没有引用的css.(可能会导致第三方库样式异常，可以注释掉再次打包看看异常情况)
      // 打包后的目录
      paths: glob.sync([
        path.join(__dirname,'../dist/*.html'),
        path.join(__dirname,'../dist/css/*.css'),
        path.join(__dirname,'../dist/js/*.js')
      ])
    }),
    new MiniCssExtractPlugin({  // 拆分css
      filename: "./css/[name].[chunkhash].css",
      chunkFilename: "./css/[name].[chunkhash].css"
    }),
  ]
});
