<template>
  <div>
    <div>
      <router-view />
    </div>
    <div>
      <b-button class="float-right" variant="primary" v-b-modal.boardModal>New post</b-button>
      <h2>{{ boardName }}</h2>
      <div
        style="border-bottom: 1px solid black;"
        class="mb-2" 
        v-for="(post, index) in posts" :key="index">
        <span class="mr-2">{{ index.toString().padStart(3, '0') }}</span>
        <router-link 
          class="mb-1"
          :to="{ name: `${type}.post`, params: { postID: post.id } }">
          {{ post.title }}
        </router-link>
        <br/>
        <p class="mb-0">{{ post.nickname || post.username }}</p>
        <p class="mb-0">{{ post.date_created }}</p>
      </div>
    </div>
    <b-modal
      id="boardModal"
      size="lg"
      title="Create new post"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOK">
      <div class="mb-1">Title</div>
      <b-form-input type="text" v-model="title"/>
      <div class="mt-3 mb-1">Content</div>
      <b-form-textarea
        rows="8"
        v-model="content" />
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  data() {
    return {
      // create new post
      title  : '',
      content: ''
    }
  },
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
    resetModal() {
      this.title   = ''
      this.content = ''
    },
    handleOK() {
      this.$axios.post('/api/post', {
        board  : this.id,
        title  : this.title,
        content: this.content
      })
      .then(res => {
        this.request()
      })
      .catch(err => {
        alert(err.response.data.message)
      })
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
