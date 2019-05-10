<template>
  <div>
    <h1>&lt;Circle/Index_Template&gt;</h1>
    <button @click="$router.push({ name: 'circle.detail' })">Detail</button>
    <button @click="$router.push({ name: 'circle.board', params: { id: counter } })">Board/Counter</button>
    <button @click="counter += 1">Counter++</button>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  }
}
</script>

<style scoped>

</style>
