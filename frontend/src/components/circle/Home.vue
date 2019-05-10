<template>
  <div>
    <h1>&lt;Circle/Home_Template&gt;</h1>
    <h2>Circle list</h2>
    <div class="area" v-for="(circle, index) in circles" :key="index" @click="getCircleDetail(circle.id)" style="padding: 20px; margin-bottom: 5px; border: 1px dotted gray;">
      <p>id: {{ circle.id }}</p>
      <p>name: {{ circle.name }}</p>
      <p>date_created: {{ new Date(circle.date_created).toDateString() }}</p>
    </div>
    <h2>Selected circle's detail:</h2>
    <circle-detail v-if="detail" :detail="detail"/>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.component('circle-detail', {
  template: `
  <div>
    <p>Boards:</p>
    <div v-for="(board, index) in detail.boards" :key="index">
      <p>id: {{ board.id }}</p>
      <p>name: {{ board.name }}</p>
      <p>date_created: {{ new Date(board.date_created).toDateString() }}</p>
      <board-post :board="board.id" />
    </div>
  </div>`,
  props: {
    detail: Object
  },
})

Vue.component('board-post', {
  template: `
  <div>
    <h3>Board posts:</h3>
    <div v-for="(post, index) in posts" :key="index">
      <p>id: {{ post.id }}</p>
      <p>title: {{ post.title }}</p>
      <p>user: {{ post.userID }}</p>
      <p>date_created: {{ new Date(post.date_created).toDateString() }}</p>
    </div>
  </div>`,
  props: {
    board: Number
  },
  data() {
    return {
      posts: []
    }
  },
  methods: {
    getPosts(boardID) {
      this.$axios.get(`/api/board/${boardID}`, { params: { start: 0, len: 100 } })
      .then(results => {
        this.posts = this.posts.concat(results.data)
      })
      .catch(err => {})
    }
  },
  created() {
    this.getPosts(this.board)
  }
})

export default {
  data() {
    return {
      circles: [],
      detail : null,
      posts  : null
    }
  },
  methods: {
    getCircles() {
      this.$axios.get('/api/circle', { params: { start: 0, len: 100 } })
      .then(results => {
        this.circles = this.circles.concat(results.data)
      })
      .catch(err => {})
    },
    getCircleDetail(circleID) {
      this.$axios.get(`/api/circle/${circleID}`)
      .then(results => {
        this.detail = results.data
      })
      .catch(err => {})
    }
  },
  created() {
    this.getCircles()
  }
}
</script>

<style scoped>
.area {
  transition: all 1s;
}
.area:hover {
  background-color: #999;
}
</style>
