import ApiPath from '@/apis/api-path'

// mock配置基本步骤
// 1、引入mockjs
import Mock from 'mockjs'
// 2、获取 mock.Random 对象
const Random = Mock.Random

const navListJson = require('./nav')

// main-content mock接口
const returnDataInfo = function(param) {
  console.group("Mock：index main 接口:")
  console.log(param)
  console.groupEnd()

  let infoList = [],
    body = param.body,
    paramArray = body.split('&'),
    page = paramArray[0].split('=')[1],
    row = paramArray[1].split('=')[1]

  for(let i = 0; i < row; i++) {
    let infoObj = {
      id: Random.integer(10000),  //
      title: Random.csentence(10, 30), //
      url: Random.url('http'),
      imgUrl: Random.dataImage('320x199', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      // author_name: Random.cname(), // Random.cname() 随机生成一个常见的中文姓名
      play: Random.natural( 0, 10000000 ),
      comment: Random.natural( 0, 10000000 ),
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    infoList.push(infoObj)
  }

  return {
    code: '1000',                 // 成功与否标识
    message: '操作成功！',   // 返回信息
    data: infoList
  }
}

const returnBannerInfo = function(param) {
  console.group("Mock：index banner 接口:")
  console.log(param)
  console.groupEnd()

  let
    infoList = [],
    itemNum = Random.integer(1, 5)  //随机一个item列表数目

  for(let i = 0; i < itemNum; i++) {
    let infoObj = {
      id: Random.integer(10000),  //
      title: Random.csentence(10, 30), //
      url: Random.url('http'),
      imgUrl: Random.dataImage('480x141', 'mock的图片'), // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
      date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
    }
    infoList.push(infoObj)
  }

  return {
    code: '1000',                 // 成功与否标识
    message: '操作成功！',   // 返回信息
    data: infoList
  }
}

const returnNavInfo = function(param) {
  console.group("Mock：index nav 接口:")
  console.log(param)
  console.groupEnd()

  for(let i = 0; i < navListJson.data.length; i++) {
    navListJson.data[i].url = Random.url('http')
  }

  return {
    code: '1000',                 // 成功与否标识
    message: '操作成功！',   // 返回信息
    data: navListJson
  }
}

// 3、接收ajax请求，并返回模拟数据，这里使用函数的形式制定模拟数据
// 模拟ajax请求的响应时间，默认(10ms-300ms)
Mock.setup({
  timeout: '1000-3000'
})
// mock插件的问题，带参数get请求有bug，用正则+'.*'能解决大部分问题
// main 请求
Mock.mock(RegExp(ApiPath.index.getDataInfo + '.*'), 'post', returnDataInfo)
// banner 请求
Mock.mock(RegExp(ApiPath.index.getBannerInfo + '.*'), 'post', returnBannerInfo)
// 导航栏请求
Mock.mock(RegExp(ApiPath.index.getNavInfo + '.*'), 'post', returnNavInfo)
