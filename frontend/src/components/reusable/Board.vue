<template>
  <div>
    <div>
      <router-view />
    </div>
    <div>
      <h2>{{ boardName }}</h2>
      <div v-for="(post, index) in posts" :key="index">
        <router-link :to="{ name: `${type}.post`, params: { postID: post.id } }">{{ post.title }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  computed: {
    type() { 
      return (this.$route.name.startsWith('company.board')) ? 'company.board'  
           : (this.$route.name.startsWith('circle.board'))  ? 'circle.board'
           : null
    },
    id() { return this.$route.params.boardID },
    ...mapState({
      boardName(state) {
        // this is not defined as getter becuz requires 'this' context
        let boards = this.type === 'company.board' ? state.company.boards
                   : this.type === 'circle.board'  ? state.circle.boards
                   : null
        if (boards) {
          let board = boards.find(board => board.id == this.$route.params.boardID)
          if (board)
            return board.name
        }
        return null
      }
    }),
    ...mapGetters({
      posts: 'board/orderedPosts'
    })
  },
  methods: {
    initialize(id) { 
      this.init(id)
      this.request()
    },
    ...mapMutations({
      init: 'board/init'
    }),
    ...mapActions({
      request: 'board/get'
    })
  },
  watch: { 
    // becuz route component is reused, lifecycle hook won't be called again; watcher needed
    '$route': function(to, from) { 
      if (to.name.endsWith('.board'))
        this.initialize(to.params.boardID)
    }
  },
  created() { this.initialize(this.id) }
}
</script>

<style scoped>

</style>
