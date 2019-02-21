import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store/store'
import qs from "qs"
import { getToken } from '@/utils/auth'
import {commonParams} from '@/api/config'
import router from '@/router/index.js'

let cancel ,promiseArr = {}
const CancelToken = axios.CancelToken;

// 创建axios默认请求
const service = axios.create({
    baseURL: "http://localhost:8000/bpm/",
    timeout: 5000, // request timeout,
})

// 请求拦截
service.interceptors.request.use(config => {
    // 为了防止重复请求ajax
    if (promiseArr[config.url]) {
    promiseArr[config.url]('操作取消')
    promiseArr[config.url] = cancel
} else {
    promiseArr[config.url] = cancel
}
// 拼接公共参数
config.params = Object.assign({},commonParams,config.params)
//当为传统接收方式post的时候对参数进行序列化
if (
    config.method === "put" ||
    config.method === "delete"
) {
    // 序列化
    config.headers = {
        'Content-Type': "application/x-www-form-urlencoded;charset=utf-8" //当post的时候请求头需要序列化
    };
    config.data = qs.stringify(config.data);
}
// 是否携带cookie不知
if (store.getters.token) {
    config.headers['Token'] = getToken() // 让每个请求携带token-- ['Token']为自定义key 请根据实际情况自行修改
}
return config
}, error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
})
// 相应拦截
service.interceptors.response.use(
    response => response,
    error => {
    if (error) {
        switch (error.response.status) {
            case 401:
                // router.push({
                //     path: "/login"
                // });
                error.response.statusText = '未授权，请重新登录'
                break;
            case 404:
                error.response.statusText = '请求错误,未找到该资源'
                Message({
                    //  饿了么的消息弹窗组件,类似toast
                    showClose: true,
                    message: error.response.statusText,
                    type: "error",
                    center: true
                });
                break;
        }
    } else {
        error.response.statusText = "连接到服务器失败"
    }
    return Promise.reject(error)
})
export default {
    //get请求
    get (url,param) {
        return new Promise((resolve,reject) => {
            service({
                        method: 'get',
                        url,
                        params: param,
                        // 取消请求函数创建
                        cancelToken: new CancelToken(c => {
            cancel = c
        })
    }).then(res => {
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
    },
    //post请求
    post (url,param) {
        return new Promise((resolve,reject) => {
            service.post(
            url,
            param,
            // 取消请求函数创建
            {
                cancelToken: new CancelToken(c => {
                    cancel = c
                })
    }
    ).then(res => {
            resolve(res)
        }).catch(error=>{
            reject(error)
        })
    })
    }
}
