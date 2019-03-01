/*
1、什么是重排和重绘
浏览器下载完页面中的所有组件——HTML标记、JavaScript、CSS、图片之后会解析生成两个内部数据结构——DOM树和渲染树。

DOM树表示页面结构，渲染树表示DOM节点如何显示。DOM树中的每一个需要显示的节点在渲染树中至少存在一个对应的节点（隐藏的DOM元素disply值为none 在渲染树中没有对应的节点）。渲染树中的节点被称为“帧”或“盒",符合CSS模型的定义，理解页面元素为一个具有填充，边距，边框和位置的盒子。一旦DOM和渲染树构建完成，浏览器就开始显示（绘制）页面元素。

当DOM的变化影响了元素的几何属性（宽或高），浏览器需要重新计算元素的几何属性，同样其他元素的几何属性和位置也会因此受到影响。浏览器会使渲染树中受到影响的部分失效，并重新构造渲染树。这个过程称为重排。完成重排后，浏览器会重新绘制受影响的部分到屏幕，该过程称为重绘。由于浏览器的流布局，对渲染树的计算通常只需要遍历一次就可以完成。但table及其内部元素除外，它可能需要多次计算才能确定好其在渲染树中节点的属性，通常要花3倍于同等元素的时间。这也是为什么我们要避免使用table做布局的一个原因。

并不是所有的DOM变化都会影响几何属性，比如改变一个元素的背景色并不会影响元素的宽和高，这种情况下只会发生重绘。*/



/*
重排和重绘的代价有多大？我们再回到前文那个过桥的例子上，细心的你可能会发现了，千倍的时间差并不是由于“过桥”一手造成的，每次“过桥”其实都伴随着重排和重绘，而耗能的绝大部分也正是在这里!

var times = 15000;

// code1 每次过桥+重排+重绘
console.time(1);
for(var i = 0; i < times; i++) {
    document.getElementById('myDiv1').innerHTML += 'a';
}
console.timeEnd(1);

// code2 只过桥
console.time(2);
var str = '';
for(var i = 0; i < times; i++) {
    var tmp = document.getElementById('myDiv2').innerHTML;
    str += 'a';
}
document.getElementById('myDiv2').innerHTML = str;
console.timeEnd(2);

// code3
console.time(3);
var _str = '';
for(var i = 0; i < times; i++) {
    _str += 'a';
}
document.getElementById('myDiv3').innerHTML = _str;
console.timeEnd(3);


// 1: 2874.619ms
// 2: 11.154ms
// 3: 1.282ms
*/


/*3、重排何时发生
很显然，每次重排，必然会导致重绘，那么，重排会在哪些情况下发生？

添加或者删除可见的DOM元素
元素位置改变
元素尺寸改变
元素内容改变（例如：一个文本被另一个不同尺寸的图片替代）
页面渲染初始化（这个无法避免）
浏览器窗口尺寸改变*/


//
// 渲染树变化的排队和刷新
// 思考下面代码：
//
// 复制代码
// var ele = document.getElementById('myDiv');
// ele.style.borderLeft = '1px';
// ele.style.borderRight = '2px';
// ele.style.padding = '5px';
// 乍一想，元素的样式改变了三次，每次改变都会引起重排和重绘，所以总共有三次重排重绘过程，但是浏览器并不会这么笨，它会把三次修改“保存”起来（大多数浏览器通过队列化修改并批量执行来优化重排过程），一次完成！但是，有些时候你可能会（经常是不知不觉）强制刷新队列并要求计划任务立即执行。获取布局信息的操作会导致队列刷新，比如：
//
// offsetTop, offsetLeft, offsetWidth, offsetHeight
// scrollTop, scrollLeft, scrollWidth, scrollHeight
// clientTop, clientLeft, clientWidth, clientHeight
// getComputedStyle() (currentStyle in IE)
// 将上面的代码稍加修改：
//
// 复制代码
// var ele = document.getElementById('myDiv');
// ele.style.borderLeft = '1px';
// ele.style.borderRight = '2px';
//
// // here use offsetHeight
// // ...
// ele.style.padding = '5px';
// 因为offsetHeight属性需要返回最新的布局信息，因此浏览器不得不执行渲染队列中的“待处理变化”并触发重排以返回正确的值（即使队列中改变的样式属性和想要获取的属性值并没有什么关系），所以上面的代码，前两次的操作会缓存在渲染队列中待处理，但是一旦offsetHeight属性被请求了，队列就会立即执行，所以总共有两次重排与重绘。所以尽量不要在布局信息改变时做查询。



// 5、最小化重排和重绘
// 我们还是看上面的这段代码：
//
// var ele = document.getElementById('myDiv');
// ele.style.borderLeft = '1px';
// ele.style.borderRight = '2px';
// ele.style.padding = '5px';
// 三个样式属性被改变，每一个都会影响元素的几何结构，虽然大部分现代浏览器都做了优化，只会引起一次重排，但是像上文一样，如果一个及时的属性被请求，那么就会强制刷新队列，而且这段代码四次访问DOM，一个很显然的优化策略就是把它们的操作合成一次，这样只会修改DOM一次：
//
// var ele = document.getElementById('myDiv');
//
// // 1. 重写style
// ele.style.cssText = 'border-left: 1px; border-right: 2px; padding: 5px;';
//
// // 2. add style
// ele.style.cssText += 'border-;eft: 1px;'
//
// // 3. use class
// ele.className = 'active';









// 7、让元素脱离动画流
// 用展开/折叠的方式来显示和隐藏部分页面是一种常见的交互模式。它通常包括展开区域的几何动画，并将页面其他部分推向下方。
//
// 一般来说，重排只影响渲染树中的一小部分，但也可能影响很大的部分，甚至整个渲染树。浏览器所需要重排的次数越少，应用程序的响应速度就越快。因此当页面顶部的一个动画推移页面整个余下的部分时，会导致一次代价昂贵的大规模重排，让用户感到页面一顿一顿的。渲染树中需要重新计算的节点越多，情况就会越糟。
//
// 使用以下步骤可以避免页面中的大部分重排：
//
// 使用绝对位置定位页面上的动画元素，将其脱离文档流
// 让元素动起来。当它扩大时，会临时覆盖部分页面。但这只是页面一个小区域的重绘过程，不会产生重排并重绘页面的大部分内容。
// 当动画结束时恢复定位，从而只会下移一次文档的其他元素



// 重排和重绘是DOM编程中耗能的主要原因之一，平时涉及DOM编程时可以参考以下几点：
//
// 尽量不要在布局信息改变时做查询（会导致渲染队列强制刷新）
// 同一个DOM的多个属性改变可以写在一起（减少DOM访问，同时把强制渲染队列刷新的风险降为0）
// 如果要批量添加DOM，可以先让元素脱离文档流，操作完后再带入文档流，这样只会触发一次重排（fragment元素的应用）
// 将需要多次重排的元素，position属性设为absolute或fixed，这样此元素就脱离了文档流，它的变化不会影响到其他元素。例如有动画效果的元素就最好设置为绝对定位。
