// 引入 axios
import axios from 'axios';
let url = "/LIMSTS" //正式环境
let url45 = "/limszn" // 测试环境
import msg from "@/linbs/mesAge";
const requests = axios.create({
        // 配置基础路径
        baseURL: process.env.baseUrl, // process.env.baseUrl,
        // headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
        // 请求头
        /* headers:{} */
    })
    // 配置拦截器
requests.interceptors.request.use(config => {
    console.log(config)
    if (config.method === 'post') {
        const formData = new FormData();

        Object.keys(config.data).forEach((key) => {
            formData.append(key, config.data[key]);
        })
        config.data = formData
    }
    // 请求带token
    /* config.headers.Authorization = window.sessionStorage.getItem('token') */
    return config
})

// 对应拦截器
requests.interceptors.response.use((res) => {
        // 请求成功的回调函数
        return res.data;
    }, () => {
        // 请求失败的回调函数
        // msg.closeLoading();
        return Promise.reject('fail')
    })
    // 对外暴露
export default requests