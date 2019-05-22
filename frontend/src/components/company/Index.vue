<template>
  <div class="main">
    <span style="margin-left: 12px;">
      <img :src="info.logo" width="48px" height="48px" />
      <span style="margin-left: 4px; font-size: 30px; font-weight: 500;">{{ info.name }}</span>
    </span>
    <tab />
    <hr /> 
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Tab from './reusable/Tab.vue'

export default {
  components: {
    'tab': Tab
  },
  computed: {
    ...mapState({
      info: state => state.company
    })
  },
  methods: {
    ...mapActions({
      init: 'company/init'
    })
  },
  /*
  watch: { 
    // becuz route component is reused, lifecycle hook won't be called again; watcher needed
    '$route': function(to, from) { 
      if (to.name.startsWith('company'))
        this.init(to.params.companyID)
    }
  },
  */
  created() {
    // FUTURE: lifecycle hook won't be called again when there's change in route params
    //         so need to use watch hook
    this.init(/* this.$route.params.companyID */)
  }
}
</script>

<style scoped>

</style>
