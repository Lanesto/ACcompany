import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: (process.env.MODE_ENV !== 'production'),
  modules: {
    user
  }
})

const reload = () => {
  try {
    if (localStorage.userContext) store.dispatch('user/refresh')
    else store.commit('user/logout')
  } catch (err) {
    // Do nothing
  }
}
reload() // automatically called when user refreshes page

export default store
