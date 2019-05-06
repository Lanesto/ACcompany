import axios from 'axios'

const auth = axios.create({
  headers: { 'Authorization': undefined }
})

const state = {
  account     : null,
//  email       : null,
//  name        : null,
//  gender      : null,
//  age         : null,
//  dept        : null,
  accessToken : null,
  refreshToken: null,
  loggedIn    : false
}

const getters = {

}

const actions = {
  login(context, loginData) {
    let { id, password } = loginData
    let result = {}
    axios.post('auth/login/local', { id, password })
    .then(res => {
      result = { 
        account: id,
        ...res.data
      }
      context.commit('login', result)
    }).catch(err => {
      alert(err.data.message)
      // error handling
    })
  },
  logout(context) {
    auth.post('auth/logout')
    .then(res => {
      context.commit('logout')
    }).catch(err => {
      alert(err.data.message)
      // error handling
    })
  },
  refresh(context, tokens) {
    let userContext = JSON.parse(localStorage.userContext) || null
    axios.post('auth/refresh', 
      { accessToken: userContext.accessToken }, 
      { headers: { 'Authorization': `Bearer ${userContext.refreshToken}` }
    }).then(res => {
      // renew access token
      userContext.accessToken = res.data.accessToken
      context.commit('login', userContext)
    }).catch(err => {
      alert(err.data.message)
      context.commit('logout')
    })
  }
}

const mutations = {
  login(state, payload) {
    Object.keys(state).map(key => {
      state[key] = payload[key] || null
    })
    state.loggedIn = true
    auth.defaults.headers['Authorization'] = `Bearer ${payload.accessToken}`
    localStorage.userContext = JSON.stringify(state)
  },
  logout(state) {
    Object.keys(state).map(key => {
      state[key] = null
    })
    state.loggedIn = false
    auth.defaults.headers['Authorization'] = undefined
    delete localStorage.userContext
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
