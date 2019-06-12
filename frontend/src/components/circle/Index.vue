<template>
  <div style="padding: 10px;">
    <span style="margin-left: 12px;">
      <img :src="info.logo" width="48px" height="48px" />
      <span style="margin-left: 4px; font-size: 30px; font-weight: 500;">{{ info.name }}</span>
      <b-button
        v-if="info.is_member"
        class="mx-3"
        variant="outline-warning"
        @click="leave">Leave</b-button>
      <b-button
        v-else
        class="mx-3"
        variant="outline-success"
        @click="join">Join</b-button>
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
      info: state => state.circle
    })
  },
  methods: {
    join() {
      this.$store.dispatch('circle/join')
      .catch(err => {
        alert(err.response.data.message)
      })
    },
    leave() {
      this.$store.dispatch('circle/leave')
      .catch(err => {
        alert(err.response.data.message)
      })
    },
    ...mapActions({
      init : 'circle/init'
    })
  },
  /*
  watch: { 
    // becuz route component is reused, lifecycle hook won't be called again; watcher needed
    '$route': function(to, from) { 
      if (to.name.startsWith('circle'))
        this.init(to.params.circleID)
    }
  },
  */
  created() { this.init(this.$route.params.circleID) }
}
</script>
