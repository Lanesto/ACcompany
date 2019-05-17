import axios from 'axios'

const state = {
  // only fields aligned here will be used (redundant data will be received)
  id      : null, // database raw column id
  account : null, // local login account or sns id (= sns_id   || account)
  type    : null, // what kind of login type is    (= sns_type || 'local')
  nickname: null,
  email   : null,
  name    : null,
  gender  : null,
  age     : null,
  // non-db state
  loggedIn: false
}

const getters = {

}

const actions = {
  login(context, credentials) {
    // local login only!
    return new Promise(function(resolve, reject) {
      axios.post('/auth/login/local', credentials)
      .then(res => {
        // when logged in successfully
        context.dispatch('load')
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  },
  load(context) {
    return new Promise(function(resolve, reject) {
      axios.get('/auth/profile')
      .then(res => {
        context.commit('set', res.data)
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
  },
  logout(context) {
    return new Promise(function(resolve, reject) {
      axios.get('/auth/logout')
      .then(res => {
        context.commit('flush')
        resolve(res.data)
      })
      .catch(err => reject(err))
    })
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
