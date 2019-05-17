<template>
  <div style="margin-left: 10px;">
    <div v-if="node" style="margin-bottom: 20px;">
      <div class="tree-node" style="font-size: 20px; border-bottom: 1px solid black; margin-top: 20px; margin-bottom: 10px;" @click="isFolded = !isFolded">
        {{ node.name }} ({{ deptSize }})<span style="margin-left: 8px;" v-html="foldIcon"/>
      </div>
      <div v-show="isFolded" style="margin-left: 10px; margin-bottom: 20px;">
        <span>
          <employee v-for="(profile, index) in node.team" :key="index" :profile="profile" />
        </span>
        <department v-for="(child, index) in node.children" :key="index" :node="child"/>
      </div>
    </div>
  </div>
</template>

<script>
import Employee from './Employee.vue'

export default {
  name: 'department', // recursive
  components: {
    'employee': Employee
  },
  props: {
    node: null
  },
  data() {
    return {
      isFolded: false
    }
  },
  computed: {
    deptSize() {
      const count = (parent) => {
        let len = (parent.team) ? parent.team.length : 0
        if (parent.children) return parent.children.reduce((acc, child) => acc + count(child), len)
        else                 return len
      }
      return count(this.node)
    },
    foldIcon() {
      return (this.isFolded ? '&minus;' : '&plus;')
    }
  }
}
</script>

<style scoped>

</style>
