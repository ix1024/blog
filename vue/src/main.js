// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import App from './App'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueResource)

window.store = new Vuex.Store({
  state: {
    inputValue: ''
  },
  mutations: {
    getInputValue: (state, val) => {
      state.inputValue = val
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})