<template>
  <div>
    <span style="margin-left: 12px;">
      <img src="" width="48px" height="48px" />
      <span style="margin-left: 4px; font-size: 30px; font-weight: 500;">{{ info.name }}</span>
    </span>
    <tab/>
    <hr/>
    <router-view />
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
      return this.$store.state.circle
    }
  },
  created() {
    this.$store.dispatch('circle/init', this.$route.params.circleID)
  }
}
</script>

<style scoped>

</style>
