import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // component = () => import('./views/About.vue');

      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // 如果你想给拆分出的文件命名，可以尝试一下 webpack 提供的 Magic Comments（魔法注释）：
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
