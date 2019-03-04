// 3,2,1,4,6,5,  通过冒泡算法转变为1-6的 运算过程

// 第一轮,3与2比较，3>2 ，依次 3>1直到 3<4，此时 变成了 2，1，3,4,6,5 但第一轮并没有结束，2 会依次拿出来进行比较 变成 1,2,3,4,6,5 ，再将1拿出来进行比较，1<2，此时1确定位置，第一轮结束；
// 第二轮同上
//...
//最后一轮：6与5比较，6>5 ,6后移，此时变成 1,2,3,4,5,6 ；

// 算法实现
function sort(elements) {
    for (var i = 0; i < elements.length - 1; i++) {
        for (var j = 0; j < elements.length - i - 1; j++) {
            if (elements[j] > elements[j + 1]) {
                var swap = elements[j];
                elements[j] = elements[j + 1];
                elements[j + 1] = swap;
            }
        }
    }
}

var elements = [3, 1, 5, 7, 2, 4];
console.log('before' + elements);
sort(elements);
console.log('after' + elements);

// 分析：
// i=0;j=0; elements[0]= 3 > elements[1] = 1;>> element[0]= 1;elements[1]=3 >> [ 1,3,5,7,2,4];
// i=0;j=1 ;elements[1] = 3 < elements[2] = 5 ; >>  [ 1,3,5,7,2,4]
// i=0;j=2; elements[2] = 5 < elements[3] = 7 ; >>  [ 1,3,5,7,2,4]
// i=0;j=3; elements[3] = 7 > elements[4] = 2 ; >>  [ 1,3,5,2,7,4]
// i=0;j=4; elements[4] = 7 > elements[5] = 4 ; >>  [ 1,3,5,2,4,7] //第一轮结束 找到最大数 7

// i=1;j=0 ;elements[0] = 1 < elements[1] = 3 ; >> [ 1,3,5,2,4,7]
// i=1;j=1 ;elements[1] = 3 < elements[2] = 5 ; >> [ 1,3,5,2,4,7]
// i=1;j=2 ;elements[2] = 5 > elements[3] = 2 ; >> [ 1,3,2,5,4,7]
// i=1;j=3 ;elements[3] = 5 > elements[4] = 4 ; >> [ 1,3,2,4,5,7] //第二轮结束 找到第二大数字 5；

// i=2;j=0 ;elements[0] = 1 < elements[1] = 3 ; >> [ 1,3,2,4,5,7]
// i=2;j=1 ;elements[1] = 3 > elements[2] = 2 ; >> [ 1,2,3,4,5,7]
// i=2;j=2 ;elements[2] = 3 < elements[3] = 4 ; >> [ 1,2,3,4,5,7] //第三轮结束 找到第三大数字 4；

// i=3;j=0 ;elements[0] = 1 < elements[1] = 2 ; >> [ 1,2,3,4,5,7]
// i=3;j=1 ;elements[1] = 2 > elements[2] = 3 ; >> [ 1,2,3,4,5,7] //第三轮结束 找到第四大数字 3；

// i=4;j=0 ;elements[0] = 1 < elements[1] = 2 ; >> [ 1,2,3,4,5,7] //第四轮结束 找到第五大数字 2 并定位最小数字1；

// i=5;j < 0  //无须执行


