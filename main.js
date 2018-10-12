import Vue from 'vue'
import App from './src/App.vue'
import router from './src/router/router'
import store from './src/store/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
