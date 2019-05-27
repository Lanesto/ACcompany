<template>
  <div id="app">
    <app-navbar/>
    <router-view id="content"/>
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'app',
  components: {
    'app-navbar': NavBar
  },
  mounted() {
    // for page refresh handling
    this.$store.dispatch('user/load')
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0px;
  margin: 0px;
  background: #f2f2f2;
  min-height: 105vh !important;
}

#content {
  width: 100%;
  /* padding: 20px; */
  min-height: 80vh;
  transition: all 0.3s;
}
</style>
