import Browse from '@/components/circle/Browse.vue'
import Index  from '@/components/circle/Index.vue'
import Home   from '@/components/circle/Home.vue'
import About  from '@/components/circle/About.vue'
import Board    from '@/components/reusable/Board.vue'
import Post     from '@/components/reusable/Post.vue'

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
        children: [
          {
            path: 'post/:postID',
            name: 'circle.board.post',
            component: Post
          }
        ]
      }
    ]
  }
]