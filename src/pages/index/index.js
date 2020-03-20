import './index.scss'
import "swiper/css/swiper.min.css"
import '@/assets/js/common'
import Swiper from "swiper"

import {numberFormat} from '@/assets/js/utils'
import ApiPath from '@/apis/api-path'
import {ajax} from '@/apis/ajax';

jQuery(document).ready(function () {

  // 展开全部导航
  $('#showNavAllWrap').on('touchstart', function () {
    $('#nav-all-wrap').css({
      'transform': 'translateY(0)',
      'opacity': '1'
    })
  })
  // 隐藏全部导航
  $('#hideNavAllWrap').on('touchstart', function () {
    $('#nav-all-wrap').css({
      'opacity': '0',
      'transform': 'translateY(-200%)',
    })
  })
  $('#common-nav').on('touchstart', '.item', function () {
    $(this).addClass('active').siblings().removeClass('active')
  })
  $('#nav-all-wrap').on('touchstart', '.item', function () {
    $(this).addClass('active').find('p').addClass('active')
    $(this).siblings().removeClass('active').find('p').removeClass('active')
  })
  // 点击重新后去content list
  $('#content-load').on('touchstart', function () {
    getDataInfo()
  })
  // 点击页面 隐藏展开的全部导航组件
  $('#index-content').on('touchstart', function (ev) {
    $('#nav-all-wrap').css({
      'opacity': '0',
      'transform': 'translateY(-200%)',
    })
  })
  // 监听页面滚动事件
  $(window).on('scroll', _.throttle(function () {
      // 隐藏展开的全部导航组件
      $('#nav-all-wrap').css({
        'opacity': '0',
        'transform': 'translateY(-200%)',
      })
      let scrollTop = $(window).scrollTop(),  // 窗口滚动高度
        windowHeight = $(window).height(),    // 可视区域高度
        scrollHeight = $(document).height()   // body页面整体高度
      if (scrollTop + windowHeight > (scrollHeight * 0.85)) {
        getDataInfo()
      }
    }, 1000)
  )

  // 初始化页面数据
  getDataInfo()
  getBannerInfo()
  getNavInfo()
  getSearchBoxContent()
})

function getDataInfo() {
  ajax({
    url: ApiPath.index.getDataInfo,
    type: 'post',
    data: {page: 1, row: 16},
    beforeSend: () => {
      // 正在拉取数据
      $('#content-load').text('正在获取数据，请稍等...')
    },

  }).then(res => {
    console.log(res);
    let result = res.data
    let str = ''
    for (let item of result) {
      let play = numberFormat(item.play)
      let comment = numberFormat(item.comment)
      str += `
            <a class="item" href="${item.url}">
              <div class="img-wrap">
                  <img src="${item.imgUrl}" alt="">
                  <div class="detail">
                      <div class="wrap">
                          <svg xmlns="http://www.w3.org/2000/svg" class="index__icon__src-commonComponent-Item-" aria-hidden="true" viewBox="0 0 1024 1024"><g stroke="none" fill="#ffffff" stroke-width="1px"><path d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z" stroke="none" fill="#ffffff" stroke-width="1px"></path><path d="M684.8 483.2l-256-112c-22.4-9.6-44.8 6.4-44.8 28.8v224c0 22.4 22.4 38.4 44.8 28.8l256-112c25.6-9.6 25.6-48 0-57.6z" stroke="none" fill="#ffffff" stroke-width="1px"></path></g></svg>
                          <span class="play">${play.value + play.unit}</span>
                      </div>
                      <div class="wrap">
                          <svg xmlns="http://www.w3.org/2000/svg" class="index__icon__src-commonComponent-Item-" aria-hidden="true" viewBox="0 0 1024 1024"><g stroke="none" fill="#ffffff" stroke-width="1px"><path d="M800 128H224C134.4 128 64 198.4 64 288v448c0 89.6 70.4 160 160 160h576c89.6 0 160-70.4 160-160V288c0-89.6-70.4-160-160-160z m96 608c0 54.4-41.6 96-96 96H224c-54.4 0-96-41.6-96-96V288c0-54.4 41.6-96 96-96h576c54.4 0 96 41.6 96 96v448z" stroke="none" fill="#ffffff" stroke-width="1px"></path><path d="M240 384h64v64h-64zM368 384h384v64h-384zM432 576h352v64h-352zM304 576h64v64h-64z" stroke="none" fill="#ffffff" stroke-width="1px"></path></g></svg>
                          <span class="comment">${comment.value + comment.unit}</span>
                      </div>
                  </div>
              </div>
              <p class="title multiline-text">${item.title}</p>
          </a>
          `
    }
    $("#index-content").append(str)
  }).catch(reason => {
    $('#content-load').text('加载失败！ 点击重新获取数据')
  });
}

function getBannerInfo() {
  ajax({
    url: ApiPath.index.getBannerInfo,
    type: "POST",
  }).then(res => {
    console.log(res);
    let result = res.data
    let str = ''
    for (let item of result) {
      str += `
            <a href="${item.url}" class="swiper-slide">
              <img src="${item.imgUrl}" alt="">
            </a>
          `
    }
    $('#banner-swiper').append(str)
    // 创建swiper组件
    createSwiper('.banner-swiper-container', {
      // spaceBetween: 10, // 10
      centeredSlides: true, // true
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.banner-swiper-pagination',
        clickable: true,
      }
    })
  }).catch(reason => {
    console.log("请求失败：" + reason);
  })
}

function getNavInfo() {
  ajax({
    url: ApiPath.index.getNavInfo,
    type: "POST",
  }).then(res => {
    console.log(res);
    let result = res.data.data
    let str = ''
    for (let i = 0; i < result.length; i++) {
      if (i === 0) {
        str += `
              <a href="${result[i].url}" class="swiper-slide item active"><p>${result[i].name}</p></a>
            `
      } else {
        str += `
              <a href="${result[i].url}" class="swiper-slide item"><p>${result[i].name}</p></a>
            `
      }
    }
    $('#nav-swiper-wrapper').append(str)

    str = ''
    for (let i = 0; i < result.length; i++) {
      if (i === 0) {
        str += `
              <a href="${result[i].url}" class="item active"><p class="active">${result[i].name}</p></a>
            `
      } else {
        str += `
              <a href="${result[i].url}" class="item"><p>${result[i].name}</p></a>
            `
      }
    }
    $('#nav-all-wrap').find('.nav-list').append(str)
    // 创建swiper组件
    createSwiper('.nav-swiper-container', {
      slidesPerView: "auto",
      freeMode: true,
    })
  }).catch(reason => {
    console.log("请求失败：" + reason);
  })
}

function getSearchBoxContent() {
  ajax({
    url: ApiPath.search.getDataInfo,
    type: "post",
  }).then(res => {
    console.log(res)
    let results = res.data
    $('#search-box-title').append(results[0].title)
  }).catch(reason => {
    console.log("请求失败：" + reason);
  })
}

function createSwiper(className, option) {
  return new Swiper(className, option)
}
