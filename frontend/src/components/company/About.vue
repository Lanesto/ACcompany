<template>
  <div>
    <h2>About</h2>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
    <h2>Team</h2>
    <input type="text" v-model="query" placeholder="Search"/>
    <div style="margin-bottom: 20px;">
      <employee v-for="(profile, index) in searchResult" :key="index" :profile="profile" />
    </div>
    <department :node="info.depts"/>
  </div>
</template>

<script>
import Department from './reusable/Department.vue'
import Employee from './reusable/Employee.vue'

export default {
  components: {
    'department': Department,
    'employee': Employee
  },
  data() {
    return {
      query: ''
    }
  },
  computed: {
    info() {
      return this.$store.state.company
    },
    searchResult() {
      if (this.query.length > 0)
        return this.info.employees.filter(employee => {
          let { name, email, position } = employee
          let f = (x) => {
            return x && (x.search(this.query) > (-1)) 
          }
          return f(name) || f(email) || f(position)
        })
    }
  }
}
</script>

<style scoped>
input {
  border-radius: 10px;
  border: 1px solid #9999ff;
  height: 30px;  
  margin: 3px 8px;
  text-align: center;
}

input::placeholder {
  opacity: 1;
  transition: 1s;
}

input:focus::placeholder {
  opacity: 0;
}

</style>
