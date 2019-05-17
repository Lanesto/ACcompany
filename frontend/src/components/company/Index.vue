<template>
  <div class="main">
    <span style="margin-left: 12px;">
      <img :src="info.logo" width="48px" height="48px" />
      <span style="margin-left: 4px; font-size: 30px; font-weight: 500;">{{ info.name }}</span>
    </span>
    <tab/>
    <hr/> 
    <router-view/>
  </div>
</template>

<script>
import Tab from './reusable/Tab.vue'

export default {
  components: {
    'tab': Tab
  },
  computed: {
    info() {
      return this.$store.state.company
    }
  },
  created() {
    // FUTURE: lifecycle hook won't be called again when there's change in route params
    //         so need to use watch hook
    this.$store.dispatch('company/init')
  }
}
</script>

<style scoped>

</style>
