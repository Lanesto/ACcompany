<template>
  <div class="component">
    <div class="header" @click="open = true">
      <b-button
        class="float-right"
        variant="danger"
        @click="destroy">
        Delete
      </b-button>
      <h3>{{ title }}</h3>
      Created at: {{ date_created }}<br/>
      Latest modification: {{ date_modified }}<br/>
      By {{ nickname || username }}
    </div>
    <b-collapse :id="DOM" v-model="openPosts">
      <br/>
      <div class="body" @click="open = false">
        {{ content }}
      </div>
    </b-collapse>
    <b-collapse :id="`${DOM}-comments`" v-model="openComments">
      <comment :post="this.id" :group="null" />
    </b-collapse>
    <hr/>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Comment from './Comment.vue'

export default {
  components: {
    'comment': Comment
  },
  data() {
    return {
      openPosts   : true,
      openComments: true
    }
  },
  computed: {
    id()  { return this.$route.params.postID },
    DOM() { return `post-${this.id}` },
    ...mapState({
      title        : state => state.post.title,
      content      : state => state.post.content,
      date_created : state => state.post.date_created,
      date_modified: state => state.post.date_modified || 'None',
      nickname     : state => state.post.nickname,
      username     : state => state.post.username
    })
  },
  methods: {
    initialize(id) {
      this.getDetail(id)
    },
    destroy() {
      this.$axios.delete(`/api/post/${this.id}`)
      .then(res => {
        this.$router.push({ name: this.$route.name.replace('.post', '') })
      })
      .catch(err => {
        alert(err.response.data.message)
      })
    },
    ...mapActions({
      getDetail: 'post/get'
    })
  },
  watch: { 
    // becuz route component is reused, lifecycle hook won't be called again; watcher needed
    '$route': function(to, from) { 
      if (to.name.endsWith('.post'))
        this.initialize(to.params.postID)
    },
  },
  created() { this.initialize(this.id) }
}
</script>

<style scoped>

.body {
  min-height: 40vh;
}

</style>
