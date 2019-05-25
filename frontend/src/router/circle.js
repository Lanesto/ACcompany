import store from '../store/index'

import Browse from '@/components/circle/Browse.vue'
import Index  from '@/components/circle/Index.vue'
import Home   from '@/components/circle/Home.vue'
import About  from '@/components/circle/About.vue'
import Board    from '@/components/reusable/Board.vue'
import Post     from '@/components/reusable/Post.vue'
import board from '../store/modules/board';

export default [
  {
    path: '/circle',
    name: 'circle.browse',
    component: Browse
  },
  {
    path: '/circle/:circleID',
    component: Index,
    children: [
      { 
        path: '',
        name: 'circle.home',
        component: Home
      },
      {
        path: 'about',
        name: 'circle.about',
        component: About
      },
      {
        path: 'board/:boardID',
        name: 'circle.board',
        component: Board,
        beforeEnter: function(to, from, next) {
          if (store.state.circle.boards.findIndex(e => e.id == to.params.boardID) > (-1))
            next()
          else
            next({ name: 'home' })
        },
        children: [
          {
            path: 'post/:postID',
            name: 'circle.board.post',
            component: Post,
            beforeEnter: function(to, from, next) {
              if (store.state.board.posts.findIndex(e => e.id == to.params.postID) > (-1))
                next()
              else
                next({ name: 'home' })
            }
          }
        ]
      }
    ]
  }
]