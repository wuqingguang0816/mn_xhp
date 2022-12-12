// 导入封装好的axios请求文件
import requests from "./api";
let u = "/LIMS"
    // 测试接口
export const getReq = (url, method, data) => {
    return requests({
        url: u + url,
        method: method,
        data: data
    })
}