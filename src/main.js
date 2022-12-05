import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from 'axios'
import ElementUI from 'element-ui'
import * as XLSX from "xlsx";
import { getReq } from "./api/index"
import elTableInfiniteScroll from 'el-table-infinite-scroll';

// import axios from 'axios'

import 'element-ui/lib/theme-chalk/index.css'
Vue.config.productionTip = false
Vue.prototype.$getReq = getReq; //封装请求方式
Vue.prototype.$axios = axios; //
Vue.prototype.$XLSX = XLSX; //

Vue.prototype.$fileUrl = "/api/ashx/Common.ashx"; // 正式版需要取消api

Vue.use(ElementUI)
Vue.use(elTableInfiniteScroll);
Vue.prototype.$window = window;

Vue.prototype.getGroup = (data, key) => {
    let groups = {};
    data.forEach(c => {
        let value = c[key];
        groups[value] = groups[value] || [];
        groups[value].push(c);
    });
    return groups;
};

Vue.prototype.$baseUrl = process.env.baseUrl
    /* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})