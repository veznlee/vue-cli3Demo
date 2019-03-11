import Vue from 'vue'
import App from './App.vue'
import router from './router'
import config from './config'
import store from './store'
import './registerServiceWorker'


import iView from 'iview';
import 'iview/dist/styles/iview.css';    // 使用 CSS
Vue.use(iView);

Vue.config.productionTip = false


/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
