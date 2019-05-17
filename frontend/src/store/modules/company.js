import axios from 'axios'

const state = {
  id       : null,
  name     : null,
  logo     : null,
  depts    : [],
  boards   : [],
  employees: []
}

const getters = {
  
}

const actions = {
  init(context, id) {
    return new Promise(function(resolve, reject) {
      axios.get('/api/company')
      .then(res => {
        let data = res.data
        let { depts, employees } = data
        // tree-fy given data
        let root = {
          id: null,
          name: 'Root',
          children: []
        }
        depts.push(root)
        depts.forEach(dept => {
          dept.team     = employees.filter(employee => employee.dept_id === dept.id) || []
          dept.children = depts.filter(child => child.parent_id === dept.id) || []
        })
        // assign it
        data.depts = root
        context.commit('set', data)
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  }
}

const mutations = {
  set(state, info) { Object.zip(state, info) }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
