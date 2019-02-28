// 如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

// 在js中，数组和对象的复制如果使用=号来进行复制，那只是浅拷贝


// 如何实现数组的深拷贝：
// 法一：for循环

var arr = [1,2,3,4,5];
var arr2 = copyArr(arr);
function copyArr(arr) {
    let res = []
    for (let i = 0; i < arr.length; i++) {
        res.push(arr[i])
    }
    return res
}


// 法二：slice

var arr = [1,2,3,4,5];
var arr1 = arr.slice(0);


// 法三：concat 合并数组
var arr = [1,2,3,4,5];
var arr1 = arr.concat();


// 法四：ES6扩展运算符
var arr = [1,2,3,4,5]
var [ ...arr2 ] = arr





// 对象的深拷贝
// 法一：for循环
var obj = {
    name: 'FungLeo',
    sex: 'man',
    old: '18'
}
var obj2 = copyObj(obj)
function copyObj(obj) {
    let res = {}
    for (var key in obj) {
        res[key] = obj[key]
    }
    return res
}

// 法二：转换成json再转换成对象实现对象的深拷贝
var obj = {
    name: 'FungLeo',
    sex: 'man',
    old: '18'
}
var obj2 = JSON.parse(JSON.stringify(obj))

// 法三：扩展运算符
var obj = {
    name: 'FungLeo',
    sex: 'man',
    old: '18'
}
var { ...obj2 } = obj
obj.old = '22'
console.log(obj)
console.log(obj2)
