import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      mata:{
        title: '首页'
      },
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      mata:{
        title: '登录'
      },
      component: Login
    },
    {
      path: '/about',
      name: 'about',
      // component = () => import('./views/About.vue');
      // 如果你想给拆分出的文件命名，可以尝试一下 webpack 提供的 Magic Comments（魔法注释）：
      component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue')
    },
    {
      path: '/lzarchives',
      name: 'lzarchives',
      component: () => import('@/views/lzarchives/index.vue'),
      // component: LzArchives,
      children:[
        {
          path:'jd-person',
          name:'jd-person',
          mata:{
            title: '建档人员'
          },
          component: () => import('@/views/lzarchives/jd-person.vue'),
        },
        {
          path:'jd-person-detail/:id/:view',
          name:'jd-person-detail',
          mata:{
            title: '建档人员详情'
          },
          component: () => import('@/views/lzarchives/jd-person-detail.vue'),
        },
        {
          path:'gl-person',
          name:'gl-person',
          mata:{
            title: '管理人员'
          },
          component: () => import('@/views/lzarchives/gl-person.vue'),
        },
        {
          path:'manage-account',
          name:'manage-account',
          mata:{
            title: '管理台账'
          },
          component: () => import('@/views/lzarchives/manage-account.vue'),
        },
        {
          path:'count-analyse',
          name:'count-analyse',
          mata:{
            title: '统计分析'
          },
          component: () => import('@/views/lzarchives/count-analyse.vue'),
        },
        {
          path:'operate-log',
          name:'operate-log',
          mata:{
            title: '操作日志'
          },
          component: () => import('@/views/lzarchives/operate-log.vue'),
        }
      ]
    }
  ]
})
