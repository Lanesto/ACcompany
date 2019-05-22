<template>
  <div>
    <h1>&lt;Circle/Browse_Template&gt;</h1>
    <h2>Circle list</h2>
    <div class="area" v-for="(circle, index) in circles" :key="index" @click="$router.push({ name: 'circle.home', params: { circleID: circle.id } })" style="padding: 20px; margin-bottom: 5px; border: 1px dotted gray;">
      <p>id: {{ circle.id }}</p>
      <p>name: {{ circle.name }}</p>
      <p>date_created: {{ circle.date_created }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      start  : 0,
      len    : 100,
      circles: []
    }
  },
  methods: {
    get() {
      this.$axios.get('/api/circle', { 
        params: { 
          start: this.start,
          len  : this.len
        }
      })
      .then(results => {
        let circles = results.data
        if (circles.length < this.len) {
          // length should be at least 1
          this.len = circles.length | 1
        }
        this.start += this.len
        circles.forEach(received => {
          let index = this.circles.findIndex(original => original.id === received.id)
          if (index === (-1)) 
            // dupliacted posts are discarded
            this.circles.push(received)
        })
      })
      .catch(err => {})
    }
  },
  created() { this.get() }
}
</script>
