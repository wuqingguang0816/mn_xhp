// 导入封装好的axios请求文件
import requests from "./api";
let u = "YLLIMS"
    // 测试接口
export const getReq = (url, method, data) => {
    return requests({
        url: url,
        method: method,
        data: data
    })
}