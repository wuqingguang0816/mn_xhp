import Vue from 'vue'
import Vuex from 'vuex'

//挂载Vuex
Vue.use(Vuex)

//创建VueX对象
const store = new Vuex.Store({
    state: {
        //存放的键值对就是所要管理的状态
        tableId: "", //
        fileId: "",
        isFalse: false,
        Filter: null
    },
    //
    mutations: {

    },
    // vuex事件函数
    actions: {

    }
})

export default store