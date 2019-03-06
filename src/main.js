// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VeeValidate from 'vee-validate'
import store from 'store'

window.axios = axios
window.store = store
axios.defaults.baseURL = 'http://127.0.0.1:3333/api/v1'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'
Vue.config.productionTip = false
Vue.use(VeeValidate)
Vue.use(require('vue-moment'))

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
