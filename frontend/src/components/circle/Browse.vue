<template>
  <div>
    <h1>Circles</h1>
    <b-card-group columns>
      <b-card
        class="mb-3"
        :title="circle.name"
        v-for="(circle, index) in circles"
        :key="index">
        <b-card-text>
          {{ circle.count_member }} Members
          {{ circle.date_created }}
        </b-card-text>
        <b-button
          class="mb-3 float-right"
          variant="primary"
          :to="{ name: 'circle.home', params: { circleID: circle.id } }">GO</b-button>
      </b-card>
    </b-card-group>
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
