import axios from 'axios'

const state = {
  name  : null,
  logo  : null,
  depts : [],
  boards: []
}

const getters = {

}

const actions = {
  init(context) {
    axios.get('/api/company')
    .then(response => {
      let data = response.data
      let { depts } = data
      // process raw hierarchical data into tree
      let root = {
        id: null,
        name: 'Root',
        children: []
      }
      depts.push(root)
      depts.forEach(dept => {
        dept.children = depts.filter(child => child.parentID === dept.id) || []
      })
      // assign it
      data.depts = root
      context.commit('set', data)
    })
    .catch(err => {

    })
  }
}

const mutations = {
  set(state, info) {
    Object.zip(state, info)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}