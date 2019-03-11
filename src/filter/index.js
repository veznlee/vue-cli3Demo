import Vue from 'vue'
Vue.filter('checkPassState', function (value) {
  return value*1==1?'合格':'不合格'
})