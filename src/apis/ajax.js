/**
 * jquery ajax promise封装
 * @param url 请求接口地址url
 * @param type  请求类型 get/post/put/delete
 * @param param 接口参数，可对象或字符串
 * @param dataType 预期服务器返回的数据类型
 * @param jsonp 跨域调用
 * @returns {Promise<unknown>}
 */
export function ajax({url, type='get', data='', dataType='json', jsonp=false,
                       beforeSend, complete, async=true}) {
  return new Promise(function(resolve, reject){
    jQuery.ajax({
      url: url,
      type: type,
      data: data,
      dataType: dataType,
      async: async,
      jsonp: jsonp, // "callback" 服务端用于接收callback调用的function名的参数
      beforeSend: beforeSend ? beforeSend : (jqXHR, settingObj) => true,
      // 完成请求后(无论失败or成功)做些什么
      complete: complete ? complete : (jqXHR, textStatus) => {},  //textStatus: 'success'、 'notmodified'、 'error'、 'timeout'、 'abort'或'parsererror'
      // 请求成功时执行
      success: (data) => resolve(data),
      // 请求失败时执行
      error: (jqXHR, textStatus, errorMsg) => {
        // jqXHR 是经过jQuery封装的XMLHttpRequest对象
        // textStatus 可能为： null、"timeout"、"error"、"abort"或"parsererror"
        // errorMsg 可能为： "Not Found"、"Internal Server Error"等
        console.log("请求失败：" + errorMsg)
        reject(errorMsg)
      }
    });
  });
}
