// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueGAPI from 'vue-gapi'
import store from './store'
import TopMenu from '@/components/admin/components/TopMenu'
import axios from 'axios'

const apiConfig = {
  apiKey: 'AIzaSyBqWt3VvuCp-R1uPa4BBXEZXGixIo8av7s',
  clientId: '718288481152-of86fbec0emphdv72vb3p6el9bvdkaj3.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets'
}

const token = localStorage.getItem('user-token')
if (token) {
  axios.defaults.headers.common['Authorization'] = token
}

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig)
Vue.use(BootstrapVue)

Vue.config.productionTip = false

Vue.component('top-menu', TopMenu)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
