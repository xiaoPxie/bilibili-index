/* 自动生成 entry 和 HtmlWebpackPlugin 页面 */
const fs = require("fs")
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

// 获取文件绝对路径
const resolve = (p) => path.join(__dirname, p)
// 源js目录，即 工程目录/src/pages
const entryDir = resolve("../src/pages")
// chunk名， 即 工程目录/src/pages的子目录名，如app，another
const entryFiles = fs.readdirSync(entryDir)

let entry = {}, // 入口
  plugins = []  // 插件

// 获得src/pages下所有的目录并生成 chunkName: chunkDir 形式的object
entryFiles.forEach(dir => {
  // entry
  entry[dir] = resolve(`../src/pages/${dir}/${dir}.js`)

  // plugins - HtmlWebpackPlugin
  const htmlWebpack = new HtmlWebpackPlugin({
    title: `${dir}`,  // 如：app
    filename: `${dir}.html`, // 如：app.html
    template: path.join(__dirname, `../src/pages/${dir}/${dir}.ejs`),
    chunks: [`${dir}`, 'common', 'vendor'],  // 如：['app', 'common', 'vendor']
    favicon: path.join(__dirname, "../src/assets/images/favicon.ico"),
    inject: true,
    minify: {
      removeRedundantAttributes:true, // 删除多余的属性
      collapseWhitespace:true, // 折叠空白区域
      removeAttributeQuotes: true, // 移除属性的引号
      removeComments: true, // 移除注释
      collapseBooleanAttributes: true // 省略只有 boolean 值的属性值 例如：readonly checked
    }
  })
  plugins.push(htmlWebpack)
})

// 其余 plugins 可以在此添加 plugins.push(...)
plugins.push(
  //提供全局的变量，在模块中使用无需用require、不用写import引入
  new webpack.ProvidePlugin({
    _: 'lodash',
    $: "jquery",
    jQuery: "jquery"
  })
)

// todo

// 导出
module.exports = {
  entry: entry,
  plugins: plugins
}
