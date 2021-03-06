import Vue    from 'vue'
import Router from 'vue-router'
import store  from '../store/index'
// root routes
import Home     from '@/components/Home.vue'
import About    from '@/components/About.vue'
import Login    from '@/components/Login.vue'
import Join     from '@/components/Join.vue'
import User     from '@/components/User.vue'
import NotFound from '@/components/NotFound.vue'
// route module
import CompanyRouter from './company'
import CircleRouter  from './circle'
import WidgetRouter  from './widget'

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
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/login', 
      name: 'login',
      component: Login
    },
    {
      path: '/join', 
      name: 'join',
      component: Join
    },
    {
      path: '/user',
      name: 'user',
      component: User,
      beforeEnter(to, from, next) {
        if (!store.state.user.loggedIn)
          return next({ name: 'home' })
        next()
      }
    },
    ...CompanyRouter,
    ...CircleRouter,
    ...WidgetRouter,
    { 
      // 404 NOT FOUND
      path: '*',
      name: 'not-found',
      component: NotFound
    }
  ]
})
