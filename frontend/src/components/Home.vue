<template>
  <div>
    <h1>&lt;Workplace_Template&gt;</h1>
    <h3>Login Context:</h3>
    <div v-for="(v, k) in info" :key="k">
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
      info: state => state.user
    })
  }
}
</script>

<style scoped>
.line {
  width: 100%;
  height: 1px;
  border-bottom: 1px dashed #ddd;
  margin: 40px 0;
}
</style>
