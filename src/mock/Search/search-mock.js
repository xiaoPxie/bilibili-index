import ApiPath from '@/apis/api-path'

// mock配置基本步骤
// 1、引入mockjs
import Mock from 'mockjs'
// 2、获取 mock.Random 对象
const Random = Mock.Random

//
const returnDataInfo = function(param) {
  console.group("Mock：search list 接口:")
  console.log(param)
  console.groupEnd()

  let infoList = [],
    itemNum = Random.integer(1, 10)  //随机一个item列表数目

  for(let i = 0; i < itemNum; i++) {
    let infoObj = {
      id: Random.integer(10000),  //
      title: Random.csentence(3, 10), //
      url: Random.url('http'),
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

const returnSearchInfo = function(param) {
  console.group("Mock：search box 接口:")
  console.log(param)
  console.groupEnd()

  let infoList = [],
    body = param.body,
    itemNum = Random.integer(1, 10)  //随机一个item列表数目
  if(body) {
    for(let i = 0; i < itemNum; i++) {
      let infoObj = {
        id: Random.integer(10000),  //
        title: decodeURIComponent(body.split('=')[1]) + Random.integer(10000), //
        url: Random.url('http'),
        date: Random.date() + ' ' + Random.time() // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
      }
      infoList.push(infoObj)
    }
  }

  return {
    code: '1000',                 // 成功与否标识
    message: '操作成功！',   // 返回信息
    data: infoList
  }
}

// 3、接收ajax请求，并返回模拟数据，这里使用函数的形式制定模拟数据
// 模拟ajax请求的响应时间，默认(10ms-300ms)
Mock.setup({
  timeout: '100-300'
})
// mock插件的问题，带参数get请求有bug，用正则+'.*'能解决大部分问题
// main 请求
Mock.mock(RegExp(ApiPath.search.getDataInfo + '.*'), 'post', returnDataInfo)
// banner 请求
Mock.mock(RegExp(ApiPath.search.getSearchInfo + '.*'), 'post', returnSearchInfo)
