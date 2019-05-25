import store from '../store/index'

import Index    from '@/components/company/Index.vue'
import Home     from '@/components/company/Home.vue'
import About    from '@/components/company/About.vue'
import Schedule from '@/components/company/Schedule.vue'
import Board    from '@/components/reusable/Board.vue'
import Post     from '@/components/reusable/Post.vue'

export default [
  {
    path: '/company',
    component: Index,
    children: [
      {
        path: '/',
        name: 'company.home',
        component: Home
      },
      {
        path: 'about',
        name: 'company.about',
        component: About
      },
      {
        path: 'schedule',
        name: 'company.schedule',
        component: Schedule
      },
      {
        path: 'board/:boardID',
        name: 'company.board',
        component: Board,
        beforeEnter: function(to, from, next) {
          if (store.state.company.boards.findIndex(e => e.id == to.params.boardID) > (-1))
            next()
          else
            next({ name: 'home' })
        },
        children: [
          {
            path: 'post/:postID',
            name: 'company.board.post',
            component: Post,
            beforeEnter: function(to, from, next) {
              if (store.state.board.posts.findIndex(e => e.id == to.params.postID) > (-1))
                next()
              else
                next({ name: 'home' })
            }
          }
        ]
      },
    ]
  }
]