<template>
  <div>
    <div v-if="parent" style="margin-bottom: 20px;">
      <div style="font-size: 20px; border-bottom: 1px solid black; margin-top: 20px; margin-bottom: 10px;"
        @click="$root.$emit('bv::toggle::collapse', DOM)">
        {{ parent.name }} ({{ deptSize }})
      </div>
      <b-collapse :id="DOM" visible>
        <b-card-group deck>
          <employee v-for="(profile, index) in parent.team" :key="index" :profile="profile" />
        </b-card-group>
        <department class="ml-3" v-for="(child, index) in parent.children" :key="index" :parent="child"/>
      </b-collapse>
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
  props: { parent: null },
  computed: {
    DOM() { return `dept-${this.parent.id}` },
    deptSize() {
      const count = (parent) => {
        let len = (parent.team) ? parent.team.length : 0
        if (parent.children) return parent.children.reduce((acc, child) => acc + count(child), len)
        else                 return len
      }
      return count(this.parent)
    }
  }
}
</script>
