// modules
import Vue from 'vue'
import Router from 'vue-router'
// components
import Home from '@/components/Home'
import CompanyHome from '@/components/CompanyHome'
import CircleHome from '@/components/Circlehome'
import WidgetHome from '@/components/WidgetHome'
import NotFound from '@/components/NotFound'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/company',
      name: 'CompanyHome',
      component: CompanyHome
    },
    {
      path: '/circle',
      name: 'CircleHome',
      component: CircleHome
    },
    {
      path: '/widget',
      name: 'WidgetHome',
      component: WidgetHome
    },
    { // 404
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ]
})
