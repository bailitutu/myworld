// forEach 遍历数组

[].forEach(function(value, index, array) {
    // ...
});

// jquery 中有同类方法
$.each([], function(index, value, array) {
    // ...
});


// map遍历数组
// callback需要有return值
[].map(function(value, index, array) {
    // ...
    return value;
});



//filter 遍历数组返回符合要求的内容 true/false
var data = [0, 1, 2, 3];
var arrayFilter = data.filter(function(item) {
    return item;
});
console.log(arrayFilter); //[1,2,3]

