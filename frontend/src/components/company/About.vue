<template>
  <div>
    <h2>About</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h2>Team</h2>
    <b-input style="min-width: 40%; width: 50%" class="mb-2" type="text" placeholder="Search" v-model="query" />
    <b-card-group deck>
      <employee v-for="(profile, index) in searchResult" :key="index" :profile="profile" />
    </b-card-group>
    <department :parent="info.depts"/>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Department from './reusable/Department.vue'
import Employee   from './reusable/Employee.vue'

export default {
  components: {
    'department': Department,
    'employee'  : Employee
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    searchResult() {
      if (this.query.length > 0)
        return this.info.employees.filter(employee => {
          const f = (word) => {
            return word && (word.search(this.query) > (-1)) 
          }
          let { name, email, position } = employee
          return f(name) || f(email) || f(position)
        })
    },
    ...mapState({
      info: state => state.company
    })
  }
}
</script>
