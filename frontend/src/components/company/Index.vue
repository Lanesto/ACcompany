<template>
  <div>
    <h1>&lt;Company/Index_Template&gt;</h1>
    <h3>Received Data:</h3>
    <div v-for="(v, k) in info" :key="k" style="margin: 7px;">
      <strong>{{ k }}</strong>:
      <p style="margin: 0; overflow: auto;" >{{ v }}</p>
    </div>
    <h3>Tabs</h3>
    <button @click="$router.push({ name: 'company.detail' })">Detail</button>
    <button @click="$router.push({ name: 'company.organization' })">Organization</button>
    <button @click="$router.push({ name: 'company.schedule' })">Schedule</button>
    <button @click="$router.push({ name: 'company.board', params: { id: counter } })">Board/Counter</button>
    <button @click="counter += 1">Counter++</button>
    <router-view/>
  </div>
</template>

<script>
export default {
  data() {
    return {
      counter: 0
    }
  },
  computed: {
    info() {
      return this.$store.state.company
    }
  },
  created() {
    this.$store.dispatch('company/init')
  }
}
</script>

<style scoped>

</style>
