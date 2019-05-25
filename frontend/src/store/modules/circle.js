import axios from 'axios'

const state = {
  id          : null,
  logo        : null,
  name        : null,
  date_created: null,
  count_member: null,
  boards      : [],
  // about user
  is_member   : false
}

const getters = {

}

const actions = {
  init(context, id) {
    return new Promise(function(resolve, reject) {
      axios.get(`/api/circle/${id}`)
      .then(res => {
        context.commit('set', res.data)
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  },
  join(context) {
    return new Promise(function(resolve, reject) {
      axios.get(`/api/circle/${context.state.id}/join`)
      .then(res => {
        context.commit('join')
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  },
  leave(context) {
    return new Promise(function(resolve, reject) {
      axios.get(`/api/circle/${context.state.id}/leave`)
      .then(res => {
        context.commit('leave')
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  }
}

const mutations = {
  set(state, data) { Object.zip(state, data) },
  join(state) { state.is_member = true },
  leave(state) { state.is_member = false }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
