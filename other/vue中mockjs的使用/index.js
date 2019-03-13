/*
1.安装mockjs
    npm install mockjs --save-dev

2.在入口js（main.js）中引入mockjs
    require('./mockData.js')

3.添加一个mockjs 规则（mockData.js）
    const Mock = require('mock.js');

    const {Random} = Mock;

    const productData = function(){

            let dataJson = [];

            for(let i=0;i< 100;i++ ){
                let dataObj = {
                       title: Random.csentence(5,30), //Random.csentence(min,max)
                       img: Random.dataImage('300x500','mock的图片'),//Random.dataImage(size,text)
                       author_name:Random.cname(),// Random.cname() 随机生成一个常见的中文姓名
                       date:Random.date()+ ' ' + Random.time()  // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd；Random.time() 返回一个随机的时间字符串
                }
                dataJson.push(dataObj)
            }

        return {
            dataJson:dataJson
        }

     }

    // Mock.mock( url, post/get , 返回的数据)；
     Mock.mock('/news/index','post', productData)


4.页面中请求数据
    正常请求数据即可
    */



