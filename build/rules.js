const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const js_jsx = {
  test: /(\.jsx|\.js)$/,
  exclude: /node_modules/,
  use: {
    loader: "babel-loader"
  }
}

const css = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
        // hmr: process.env.NODE_ENV === 'production',
      },
    },
    'css-loader',
    'postcss-loader'
  ],
}

const scss = {
  test: /\.(scss|sass)$/,   // 正则匹配以.scss和.sass结尾的文件
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../',
        // hmr: process.env.NODE_ENV === 'production',
      },
    },
    'css-loader',
    'postcss-loader',
    "sass-loader",
  ],
}

const font = {
  test: /\.(woff|woff2|eot|ttf|otf)$/,    //字体解析
  use: {
    loader: 'file-loader',
    options: {
      outputPath: './css/font'  // 设置打包后图片存放的文件夹名称
    }
  }
}

const picture = {
  test: /\.(png|jpg|svg|gif)$/,  // 正则匹配图片格式名
  use: [
    {
      loader: 'url-loader',  // 使用url-loader
      options: {
        limit: 5000,  // 限制只有小于5kb的图片才转为base64
        outputPath: 'images',  // 设置打包后图片存放的文件夹名称
        esModule: false // 启用CommonJS模块语法，解决<img src=[object Module] />的问题
      }
    }
  ]
}

const html = {
  test: /\.(html|html)$/,
  use: {
    loader: 'html-loader',
    options: {
      attrs: ['img:src', 'img:data-src', 'audio:src'],
    }
  }
}

let rules = []
rules.push(js_jsx, css, scss, font, picture, html)

// 导出
module.exports = rules
