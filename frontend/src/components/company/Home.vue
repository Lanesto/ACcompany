<template>
  <div>
    <h1>&lt;Company/Home_Template&gt;</h1>
    <div v-for="(board, index) in info.boards" :key="index">
      <button @click="bringPosts(board.id)">Open board {{ board.id }} - {{ board.name }}</button>
    </div>
    <p v-for="(post, index) in posts" :key="index">{{ post }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        // vuex company
      },
      posts: []
    }
  },
  methods: {
    bringPosts(boardID) {
      this.$axios.get(`/api/board/${boardID}`, { params: { start: 0, len: 100 } })
      .then(results => {
        this.posts = results.data
      })
      .catch(err => {})
    }
  }
}
</script>

<style scoped>

</style>
