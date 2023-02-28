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
            path: '/pesticides', //农药检出频
            name: 'pesticides',
            hidden: true,
            component: () =>
                import ('@/components/pesticides'),
        },
        {
            path: '/pesticides2',
            name: 'pesticides2', //农药单例
            hidden: true,
            component: () =>
                import ('@/components/pesticides2'),
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
        },
        {
            path: '/foodSafety',
            name: 'foodSafety',
            hidden: true,
            component: () =>
                import ('@/components/foodSafety'),
        }
    ]
})