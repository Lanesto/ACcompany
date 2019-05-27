// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './app'
// Vue supports
import store from './store/index'
import axios from 'axios'
import router from './router'
// Bootstrap 4
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// VeeValidate
import VeeValidate from 'vee-validate'
// Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faSearch, faUser)

Object.zip = function(left, right, mode='force') {
  // set left[key] = right[key] where key is in left
  // mode = force : null if right[key] is not found, else maintain original value
  if (typeof(left) !== typeof(right)) return

  Object.keys(left).forEach(key => {
    left[key] = right[key] || (mode === 'force' ? null : left[key])
  })
}
Object.nullify = function(left) {
  return Object.zip(left, [], 'force')
}
Vue.prototype.$axios = axios

Vue.use(BootstrapVue)
Vue.use(VeeValidate, {
  inject       : true,
  fieldsBagName: 'veeFields',
  errorBagName : 'veeErrors'
})
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<app/>'
})
