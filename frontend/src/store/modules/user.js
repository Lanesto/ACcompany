import axios from 'axios'

const state = {
  // only fields aligned here will be used (redundant data will be received)
  id      : null, // local login account or sns id (= sns_id   || account)
  type    : null, // what kind of login type is    (= sns_type || 'local')
  nickname: null,
  email   : null,
  name    : null,
  gender  : null,
  age     : null,
  loggedIn: false
}

const getters = {

}

const actions = {
  login(context, credential) {
    // local login only!
    return new Promise(function(resolve, reject) {
      axios.post('/auth/login/local', credential)
      .then(results => {
        context.dispatch('load')
        resolve(results)
      })
      .catch(err => {
        reject(err)
      })
    })
  },
  load(context) {
    axios.get('/auth/profile')
    .then(res => {
      context.commit('set', res.data)
    })
    .catch(err => {})
  },
  logout(context) {
    axios.get('/auth/logout')
    .then(results => {
      context.commit('flush')
      this.$router.replace({ name: 'home' })
    })
    .catch(err => {})
  }
}

const mutations = {
  set(state, profile) {
    Object.zip(state, profile)
    state.loggedIn = true
  },
  flush(state) {
    Object.nullify(state)
    state.loggedIn = false
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
