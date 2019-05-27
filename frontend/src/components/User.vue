<template>
  <div>
    <h1>&lt;User_Template&gt;</h1>
    <h3>Login Context:</h3>
    <div v-for="(v, k) in user" :key="k">
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
      user: state => state.user
    })
  }
}
</script>
