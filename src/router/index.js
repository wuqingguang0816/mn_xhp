import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/QualityTwo',
    name: 'QualityTwo',
    component: () =>
        import ('@/components/QualityTwo'),
    hidden: true,
  },{
    path: '/QualityTwoChildren',
    name: 'QualityTwoChildren',
    hidden: true,
    component: () =>
        import ('@/components/QualityTwoChildren'),
  },{
    path: '/QualityDataAnalysis',
    name: 'QualityDataAnalysis',
    hidden: true,
    component: () =>
        import ('@/components/QualityDataAnalysis'),
  },
  {
    path: '/index',
    name: 'index',
    hidden: true,
    component: () =>
        import ('@/components/index'),
  }
]
export default new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})
