import Vue  from 'vue'
import Vuex from 'vuex'
// modules
import user    from './modules/user'
import company from './modules/company'
import circle  from './modules/circle'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: (process.env.MODE_ENV !== 'production'),
  modules: {
    // be aware of that modules are namespaced
    user,
    company,
    circle
  }
})

export default store
