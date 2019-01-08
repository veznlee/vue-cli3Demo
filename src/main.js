import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

Vue.config.productionTip = false

console.log(process.env)
// {
//   BASE_URL: "/",
//   NODE_ENV: "development",
//   VUE_APP_TITLE: "stage mode"
// }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
