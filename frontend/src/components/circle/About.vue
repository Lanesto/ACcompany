<template>
  <div>
    <h1>&lt;Circle/Detail_Template&gt;</h1>
    <h3>Received Data:</h3>
    <div v-for="(v, k) in info" :key="k" style="margin: 7px;">
      <strong>{{ k }}</strong>:
      <p style="margin: 0; overflow: auto;" >{{ v }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      info: state => state.circle
    })
  }
}
</script>
