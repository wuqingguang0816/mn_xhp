import request from '@/utils/request'
export function TabbleCommon(data) { // // 运动员首页数据接口
  return request({
    url: 'LIMS/ashx/Common.ashx',
    method: 'post',
    data
  })
}