<template>
  <div>
    <h1>Page not found!</h1>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <strong>You will be redirected to home in {{ timeRemaining }} seconds...</strong>
  </div>
</template>

<script>
export default {
  data () {
    return {
      timeRemaining: 10
    }
  },
  created() {
    let timer = setInterval(() => {
      if (--this.timeRemaining <= 0) {
        // countdown end
        clearInterval(timer)
        if (this.$route.name === 'not-found') {
          // if yet in 404 page, then redirect to home
          this.$router.replace({ name: 'home' })
        }
      }
    }, 1000)
  }
}
</script>

<style scoped>

</style>
