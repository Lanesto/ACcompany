// modules
import Vue    from 'vue'
import Router from 'vue-router'
// components
import Home          from '@/components/Home.vue'
import Login         from '@/components/Login.vue'
import Join          from '@/components/Join.vue'
import About         from '@/components/About.vue'
import NotFound      from '@/components/NotFound.vue'
import CompanyIndex  from '@/components/company/Index.vue'
import CompanyHome   from '@/components/company/Home.vue'
import CompanyDetail from '@/components/company/Detail.vue'
import Organization  from '@/components/company/Organization.vue'
import Schedule      from '@/components/company/Schedule.vue'
import CompanyBoard  from '@/components/company/Board.vue'
import CircleIndex   from '@/components/circle/Index.vue'
import CircleHome    from '@/components/circle/Home.vue'
import CircleDetail  from '@/components/circle/Detail.vue'
import CircleBoard   from '@/components/circle/Board.vue'
import WidgetIndex   from '@/components/widget/Index.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/', 
      name: 'home',
      component: Home,
    },
    {
<<<<<<< HEAD
<<<<<<< HEAD
      path: '/login',
=======
      path: 'about/',
=======
      path: '/about',
>>>>>>> 5bf0f48... Backend logging fix / Frontend vuex works
      name: 'about',
      component: About
    },
    {
<<<<<<< HEAD
      path: 'login/', 
>>>>>>> a9b207d... Frontend prototype and routes
=======
      path: '/login', 
>>>>>>> 5bf0f48... Backend logging fix / Frontend vuex works
      name: 'login',
      component: Login
    },
    {
      path: '/join', 
      name: 'join',
      component: Join
    },
    {    
      path: '/company',
      component: CompanyIndex,
      children: [
        {
          path: '/',
          name: 'company.home',
          component: CompanyHome
        },
        {
          path: 'detail',
          name: 'company.detail',
          component: CompanyDetail
        },
        {
          path: 'organization',
          name: 'company.organization',
          component: Organization
        },
        {
          path: 'schedule',
          name: 'company.schedule',
          component: Schedule
        },
        {
          path: 'board/:id',
          name: 'company.board',
          component: CompanyBoard
        }
      ]
    },
    {
      path: '/circle',
      component: CircleIndex,
      children: [
        { 
          path: '',
          name: 'circle.home',
          component: CircleHome
        },
        {
          path: 'detail',
          name: 'circle.detail',
          component: CircleDetail
        },
        {
          path: 'board/:id',
          name: 'circle.board',
          component: CircleBoard
        }
      ]
    },
    {
      path: '/widget',
      name: 'widget',
      component: WidgetIndex,
      children: [

      ]
    },
    { // 404
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
