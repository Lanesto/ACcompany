<template>
  <div>
    <h1>&lt;Circle/Browse_Template&gt;</h1>
    <h2>Circle list</h2>
    <div class="area" v-for="(circle, index) in circles" :key="index" @click="$router.push({ name: 'circle.home', params: { circleID: circle.id } })" style="padding: 20px; margin-bottom: 5px; border: 1px dotted gray;">
      <p>id: {{ circle.id }}</p>
      <p>name: {{ circle.name }}</p>
      <p>date_created: {{ new Date(circle.date_created).toDateString() }}</p>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      circles: []
    }
  },
  methods: {
    getCircles() {
      this.$axios.get('/api/circle', { params: { start: 0, len: 100 } })
      .then(results => {
        this.circles = this.circles.concat(results.data)
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

</style>
