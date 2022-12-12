import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/QualityTwo',
            name: 'QualityTwo',
            component: () =>
                import ('@/components/QualityTwo'),
            hidden: true,
        }, {
            path: '/QualityTwoChildren',
            name: 'QualityTwoChildren',
            hidden: true,
            component: () =>
                import ('@/components/QualityTwoChildren'),
        }, {
            path: '/QualityDataAnalysis',
            name: 'QualityDataAnalysis',
            hidden: true,
            component: () =>
                import ('@/components/QualityDataAnalysis'),
        },
        {
            path: '/',
            name: 'index',
            hidden: true,
            component: () =>
                import ('@/components/index'),
        },
        {
            path: '/home',
            name: 'home',
            hidden: true,
            component: () =>
                import ('@/components/home'),
        }
    ]
})