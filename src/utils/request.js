import axios from 'axios'
import { Notification, MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'
import errorCode from '@/utils/errorCode'

export const isRelogin = { show: false }
    // axios.defaults.headers['Content-Type'] = 'application/octet-stream'
axios.defaults.headers['Access-Control-Allow-Origin'] = '*'

// 创建axios实例
const service = axios.create({
        baseURL: process.env.VUE_APP_BASE_API,
        // baseURL: 'http://192.168.1.45',
        // 超时
        timeout: 10000
    })
    // request拦截器
service.interceptors.request.use(config => {
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    if (getToken() && !isToken) {
        config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    // get请求映射params参数
    if (config.method === 'get' && config.params) {
        let url = config.url + '?';
        for (const propName of Object.keys(config.params)) {
            const value = config.params[propName];
            var part = encodeURIComponent(propName) + "=";
            if (value !== null && typeof(value) !== "undefined") {
                if (typeof value === 'object') {
                    for (const key of Object.keys(value)) {
                        if (value[key] !== null && typeof(value[key]) !== 'undefined') {
                            let params = propName + '[' + key + ']';
                            let subPart = encodeURIComponent(params) + '=';
                            url += subPart + encodeURIComponent(value[key]) + '&';
                        }
                    }
                } else {
                    url += part + encodeURIComponent(value) + "&";
                }
            }
        }
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    if (config.method === 'post') {
        const formData = new FormData();

        Object.keys(config.data).forEach((key) => {
            formData.append(key, config.data[key]);
        })
        config.data = formData
    }
    // console.log(config)
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(res => {
        // 未设置状态码则默认成功状态
        // const code = res.data.code || 200;
        const code = res.status;
        // 获取错误信息
        const msg = errorCode[code] || res.data.msg || errorCode['default']
            // console.log(res)
        if (code === 401) {
            MessageBox.confirm('登录状态已过期，您可以继续留在该页面，或者重新登录', '系统提示', {
                confirmButtonText: '重新登录',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                store.dispatch('LogOut').then(() => {
                    location.href = '/index';
                })
            }).catch(() => {});
            return Promise.reject('无效的会话，或者会话已过期，请重新登录。')
        } else if (code === 500) {
            Message({
                message: msg,
                type: 'error'
            })
            return Promise.reject(new Error(msg))
        } else if (code !== 200) {
            Notification.error({
                title: msg
            })
            return Promise.reject('error')
        } else {
            return res.data
        }
    },
    error => {
        console.log('err' + error)
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        } else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        } else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        Message({
            message: message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service