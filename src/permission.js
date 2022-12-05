import router from './router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'
import { isRelogin } from '@/utils/request'

NProgress.configure({ showSpinner: true }) // NProgress Configuration

const whiteList = ['/index', '/QualityDataAnalysis','/QualityTwo','/QualityTwoChildren'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) {
        if (to.path === '/index') {
            // if is logged in, redirect to the home page
            next({ path: '/' })
            NProgress.done() // hack: https://github.com/PanJiaChen/vue-element-admin/pull/2939
        } else {
            if (store.getters.roles.length === 0) {
                isRelogin.show = true
                    // 判断当前用户是否已拉取完user_info信息
                store.dispatch('user/getInfo').then(() => {
                    isRelogin.show = false
                    store.dispatch('generateRoutes').then(accessRoutes => {
                        // 根据roles权限生成可访问的路由表
                        // router.addRoutes(accessRoutes) // 动态添加可访问路由表
                        // console.log(accessRoutes)
                        next({...to, replace: true }) // hack方法 确保addRoutes已完成
                    })
                }).catch(err => {
                    
                })
            } else {
                next()
            }
        }
    } else {
        // 没有token

        if (whiteList.indexOf(to.path) !== -1) {
            // 在免登录白名单，直接进入
            next()
        } else {
            // 否则全部重定向到登录页
            next(`/index`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})