import './search.scss'
import '@/assets/js/common'
import ApiPath from '@/apis/api-path'
import {ajax} from '@/apis/ajax'

jQuery(document).ready(function () {

  // 清空输入框内容
  $('#input-cancel').on('touchstart', function () {
    $('.search-input').val('')
    $('#input-cancel').css({'visibility': 'hidden'})
    $('#search-result-container').css({'display': 'none'}).html('')
  })
  // search input事件
  $('.search-input').on('input', _.debounce(
    function () {
      if ($(this).val() !== '') {
        $('#input-cancel').css({'visibility': 'visible'})
        debounceSearch()
      } else {
        $('#input-cancel').css({'visibility': 'hidden'})
        $('#search-result-container').css({'display': 'none'}).html('')
      }
    }, 500)
  )
  // search enter事件
  $(".search-input").on('keypress', function (event) {
    if (event.keyCode === 13) {
      let searchList = $.cookie('searchList'),
        list = []
      if (searchList) {
        list = JSON.parse(searchList)
        if (list.length >= 10)
          list.shift()
      }
      list.push($.trim($(this).val()))
      // 存储cookies
      $.cookie('searchList', JSON.stringify(list), {expires: 7});
      // 页面跳转
      location.href = `/search.html?keyword=${$.trim($(this).val())}`
    }
  });
  // 清除历史记录
  $('#clear-btn').on('touchstart', function () {
    // 清除cookies
    $.cookie('searchList', null, {expires: -1});
    // 删除dom
    $('#history-wrap').html('')
    // 隐藏清除历史按钮
    $('#clear-btn').css({'visibility': 'hidden'})
  })

  // 页面组件初始化
  if ($.cookie('searchList')) {
    // 显示清除历史按钮
    $('#clear-btn').css({'visibility': 'visible'})
    //
    let str = '',
      array = JSON.parse($.cookie('searchList'))
    for (let item of JSON.parse($.cookie('searchList'))) {
      str += `<a href="search.html?keyword=${item}">${item}</a>`
    }
    $('#history-wrap').append(str)
  }

  // 初始化页面数据
  getSearchBoxContent()
})


function getSearchBoxContent() {
  ajax({
    url: ApiPath.search.getDataInfo,
    type: "post",
  }).then(res => {
    console.log(res)
    let results = res.data
    let str = ''

    $('.search-input').attr('placeholder', results[0].title)
    for (let item of results) {
      str += `<a href="/search.html?keyword=${item.title}">${item.title}</a>`
    }
    $('#hot-wrap').append(str)
  }).catch(reason => {
    console.log("请求失败：" + reason);
  })
}

function search() {
  let keyword = $('.search-input').val()
  ajax({
    url: ApiPath.search.getSearchInfo,
    data: {'keyword': keyword},
    type: "post",
    beforeSend: () => {
      $('#search-result-container').html('')
      if ($('.search-input').val() === '')
        return false
    }
  }).then(res => {
    console.log(res)
    let results = res.data
    // 结果集字符串
    for (let item of results) {
      let title = item.title
      let strArray = title.substr(title.indexOf(keyword), keyword.length)
      let newStr = `<span class="keyword">${strArray}</span>` + title.slice(title.indexOf(keyword) + keyword.length)
      // console.log(`<span class="keyword">${strArray}</span>` + newStr)
      let str = `<a class="item" href="/search.html?keyword=${title}">${newStr}</a>`
      $('#search-result-container').append(str)
    }

    $('#search-result-container').css({'display': 'block'})
  }).catch(reason => {
    console.log("请求失败：" + reason);
  })
}
