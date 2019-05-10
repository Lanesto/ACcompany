<template>
  <div>
    <h1>&lt;Company/Organization Template&gt;</h1>
    <h3>Treefy:</h3>
    <dept-node :node="info.depts"/>
  </div>
</template>

<script>
import Vue from 'vue'

// make it single file component later
Vue.component('dept-node', {
  template: `
  <div style="margin-left: 10px;">
    <template v-if="node">
      id: {{ node.id || "null" }}
      name: {{ node.name }}
      <dept-node v-for="(child, index) in node.children" :key="index" :node="child"/>
    </template>
  </div>`,
  props: {
    node: Object
  }
})

export default {
  computed: {
    info() {
      return this.$store.state.company
    }
  }
}
</script>

<style scoped>

</style>
