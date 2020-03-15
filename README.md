# 仿bilibili移动端主页
## 使用 webpack4构建 + jQuery库

> 另外用到了以下插件<br>
> ① mockjs： 生成随机数据，拦截ajax请求，可作为后端api接口模拟的插件<Br>
> ② swiper： 轮播插件<Br>
> ③ lodash： js工具库

### vmin + rem的移动端页面适配进行布局，并使用scss样式预处理
``` bash
简单说明：
  1、根据vmin的值，算出根元素的font-size值，其他元素则使用rem单位进行布局适配
  2、不使用vw的原因，是因为vw在设备横屏的状态下，不太友好。对于超大屏手机或平板这样的移动设备来说，横屏下，
    元素将变得异常的大。因此更适合使用vmin的单位进行根font-size的计算
  3、1px细线处理。在使用js改变viewport缩放的适配方案中，已经自动解决这问题了，但是在 vmin + rem 的形式，
    则需要做进一步的处理。其实最简单的形式就是@media dpr直接设置边框小数像素。这里目前是使用 伪类 + transform 的方案进行解决
```
### 截图
iphone6竖屏的截图：<Br>

<hr />
iphone6横屏下的截图：<Br>


