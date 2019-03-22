import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import urlConfig from './config'
import axios from 'axios'
import {tokenInstance, tokenFormInstance, downloadFile} from '@/libs/tokenHttp.js'
import storage from '@/libs/local.js'


/**
 * 使用iview
 */
import iView from 'iview';
import 'iview/dist/styles/iview.css';   
Vue.use(iView);

Vue.config.productionTip = false

/**
 * Vue扩展
 */
Vue.prototype.$urlConfig = urlConfig
Vue.prototype.$http = axios
Vue.prototype.$storage = storage
Vue.prototype.$thttp = tokenInstance
Vue.prototype.$tform = tokenFormInstance
Vue.prototype.$downFile = downloadFile


/**
 * 通用指令和过滤器注册
 */
import importDirective from './directive'
import importFilter from './filter'
Vue.use(importDirective)
Vue.use(importFilter)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
