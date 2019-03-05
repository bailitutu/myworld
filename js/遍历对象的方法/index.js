// 第一种： for......in


const obj = {
    id:1,
    name:'zhangsan',
    age:18
}

for(let key  in obj){
    console.log(key + '---' + obj[key])
}



// 第二种：
//
// 1）、Object.keys（obj）
//
// 2）、Object.values（obj）
//
// 参数：
//
// obj：要返回其枚举自身属性的对象
//
// 返回值：
//
// 一个表示给定对象的所有可枚举属性的字符串数组。

const obj = {
    id:1,
    name:'zhangsan',
    age:18
}
console.log(Object.keys(obj)) // ["id", "name", "age"]
console.log(Object.values(obj)) //[1, "zhangsan", 18]

// 第三种：使用Object.getOwnPropertyNames(obj)

const obj = {
    id:1,
    name:'zhangsan',
    age:18
}
Object.getOwnPropertyNames(obj).forEach(function(key){
    console.log(key+ '---'+obj[key])
})



