// modules
import Vue from 'vue'
import Router from 'vue-router'
// components
import Home from '@/components/Home'
import About from '@/components/About'
import NotFound from '@/components/NotFound'
import CompanyIndex from '@/components/company/CompanyIndex.vue'
import CircleIndex from '@/components/circle/CircleIndex.vue'
import WidgetIndex from '@/components/widget/WidgetIndex.vue'
import Introduce from '@/components/Introduce.vue'
import Notice from '@/components/Notice.vue'
import Vacation from '@/components/Vacation.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/company',
      name: 'company',
      component: CompanyIndex
    },
    {
      path: '/circle',
      name: 'circle',
      component: CircleIndex
    },
    {
      path: '/widget',
      name: 'widget',
      component: WidgetIndex
    },
    {
      path: '/introduce',
      name: 'introduce',
      component: Introduce
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/vacation',
      name: 'vacation',
      component: Vacation
    },
    { // 404
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
