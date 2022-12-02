import {
  TabbleCommon
} from '@/api/index'
const actions = {
  // 列表展示表格
  TabbleCommon({ commit }, data) {
    return new Promise((resolve, reject) => {
      TabbleCommon(data).then((res) => {
        resolve(res)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}
