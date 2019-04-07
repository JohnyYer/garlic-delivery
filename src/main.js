// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'
import App from './App'
import router from './router'
import VueGAPI from 'vue-gapi'

// create the 'options' object
const apiConfig = {
  apiKey: 'AIzaSyB9DcA9ehUmFlr0Qer2VzIZKYAU_tmpejk',
  clientId: '718288481152-rpu4vgnm7mquk2813r9bf1eh613k74b7.apps.googleusercontent.com',
  discoveryDocs: ['https://sheets.googleapis.com/$discovery/rest?version=v4'],
  scope: 'https://www.googleapis.com/auth/spreadsheets'
  // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
}

// Use the plugin and pass along the configuration
Vue.use(VueGAPI, apiConfig)

Vue.config.productionTip = false
Vue.use(BootstrapVue)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
