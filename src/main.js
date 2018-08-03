// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue'
import { store } from './store/store'

Vue.use(BootstrapVue)
axios.defaults.baseURL = 'http://localhost:5000'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  store: store,
  template: '<App/>'
})
