// data-属性的作用是什么？
// 　　　　data-是HTML5为前端开发者提供自定义的属性，这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过 getAttribute方法获取。




// 为什么响应式设计（responsive design）和自适应设计（adaptive design）不同？
// 　　　　自适应布局（Adaptive Layout）
//
// 　　　　自适应布局（Adaptive）的特点是分别为不同的屏幕分辨率定义布局。布局切换时页面元素发生改变，但在每个布局中，页面元素不随窗口大小的调整发生变化。就是说你看到的页面，里面元素的位置会变化而大小不会变化；
//
// 　　　　你可以把自适应布局看作是静态布局的一个系列。
//
// 　　　　流式布局（Liquid Layout）
//
// 　　　　流式布局（Liquid）的特点（也叫"Fluid") 是页面元素的宽度按照屏幕进行适配调整，主要的问题是如果屏幕尺度跨度太大，那么在相对其原始设计而言过小或过大的屏幕上不能正常显示。
//
// 　　　　响应式布局（Responsive Layout）
//
// 分别为不同的屏幕分辨率定义布局，同时，在每个布局中，应用流式布局的理念，即页面元素宽度随着窗口调整而自动适配。
//
// 可以把响应式布局看作是流式布局和自适应布局设计理念的融合。



// 渐进增强，一开始值构建站点的最小特性，然后不断针对个浏览器追加功能，性能越好的设备能够显示更加出众的效果。
//
//优雅降级，一开始就构造站点的完整功能，然后针对浏览器测试和修复。

// 从渐进增强的角度讲，鼓励使用高级特性，只是同时要做到优雅降级，让低端用户代理上，也能保留低保真的体验
