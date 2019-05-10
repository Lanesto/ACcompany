<template>
  <div id="app">
    <app-navbar/>
    <router-view id="content"/>
  </div>
</template>

<script>
<<<<<<< HEAD
<<<<<<< HEAD
import NavBar from './components/NavBar.vue'
=======
import NavBar from './components/global/NavBar.vue'
>>>>>>> a9b207d... Frontend prototype and routes
=======
import NavBar from './components/NavBar.vue'
>>>>>>> c0f3958... Frontend routes

export default {
  name: 'app',
  components: {
<<<<<<< HEAD
    'app-navbar': NavBar
=======
    'app-navbar': NavBar,
>>>>>>> a9b207d... Frontend prototype and routes
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
}

#content {
  width: 100%;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s;
}
</style>
