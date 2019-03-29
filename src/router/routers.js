import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'

export default [
  {
    path: '/',
    name: 'home',
    meta:{
      title: '首页'
    },
    component: Home
  },{
    path: '/login',
    name: 'login',
    meta:{
      title: '登录'
    },
    component: Login
  },{
    path: '/error_404',
    name: 'error_404',
    meta:{
      title: '访问错误'
    },
    component: () => import('@/views/Error404.vue'),
  },{
    path: '/lettervisit',
    name: 'lettervisit',
    meta:{
      title: '信访举报'
    },
    component: () => import('@/views/lettervisit/index.vue'),
    children:[]
  },{
    path: '/supervision',
    name: 'supervision',
    meta:{
      title: '监督管理'
    },
    component: () => import('@/views/supervision/index.vue'),
    children:[]
  },{
    path: '/checkreview',
    name: 'checkreview',
    meta:{
      title: '执纪审查'
    },
    component: () => import('@/views/checkreview/index.vue'),
    children:[]
  },{
    path: '/heartrial',
    name: 'heartrial',
    meta:{
      title: '审理执纪'
    },
    component: () => import('@/views/heartrial/index.vue'),
    children:[]
  },{
    path: '/patrol',
    name: 'patrol',
    meta:{
      title: '巡视巡查'
    },
    component: () => import('@/views/patrol/index.vue'),
    children:[]
  },{
    path: '/reportsys',
    name: 'reportsys',
    meta:{
      title: '请示报告制度'
    },
    component: () => import('@/views/reportsys/index.vue'),
    children:[]
  },{
    path: '/lztalk',
    name: 'lztalk',
    meta:{
      title: '廉政约谈'
    },
    component: () => import('@/views/lztalk/index.vue'),
    children:[]
  },{
    path: '/lzrisk',
    name: 'lzrisk',
    meta:{
      title: '廉政风险防控'
    },
    component: () => import('@/views/lzrisk/index.vue'),
    children:[]
  },
  {
    path: '/lzarchives',
    name: 'lzarchives',
    meta:{
      title: '廉政档案'
    },
    component: () => import('@/views/lzarchives/index.vue'),
    children:[
      {
        path:'jd-person',
        name:'jd-person',
        meta:{
          title: '建档人员'
        },
        component: () => import('@/views/lzarchives/jd-person.vue'),
      },
      {
        path:'jd-person-detail/:id/:view',
        name:'jd-person-detail',
        meta:{
          title: '建档人员详情'
        },
        component: () => import('@/views/lzarchives/jd-person-detail.vue'),
      },
      {
        path:'gl-person',
        name:'gl-person',
        meta:{
          title: '管理人员'
        },
        component: () => import('@/views/lzarchives/gl-person.vue'),
      },
      {
        path:'gl-person-detail/:id/:view',
        name:'gl-person-detail',
        meta:{
          title: '管理人员详情'
        },
        component: () => import('@/views/lzarchives/gl-person-detail.vue'),
      },
      {
        path:'manage-account',
        name:'manage-account',
        meta:{
          title: '管理台账'
        },
        component: () => import('@/views/lzarchives/manage-account.vue'),
      },
      {
        path:'count-analyse',
        name:'count-analyse',
        meta:{
          title: '统计分析'
        },
        component: () => import('@/views/lzarchives/count-analyse.vue'),
      },
      {
        path:'operate-log',
        name:'operate-log',
        meta:{
          title: '操作日志'
        },
        component: () => import('@/views/lzarchives/operate-log.vue'),
      }
    ]
  },{
    path: '/basework',
    name: 'basework',
    meta:{
      title: '基础工作'
    },
    component: () => import('@/views/basework/index.vue'),
    children:[]
  },{
    path: '/system',
    name: 'system',
    meta:{
      title: '系统设置'
    },
    component: () => import('@/views/system/index.vue'),
    children:[
      {
        path:'user',
        name:'user',
        meta:{
          title: '用户管理'
        },
        component: () => import('@/views/system/user.vue'),
      },
      {
        path:'role',
        name:'role',
        meta:{
          title: '角色管理'
        },
        component: () => import('@/views/system/role.vue'),
      },
      {
        path:'permission',
        name:'permission',
        meta:{
          title: '权限管理'
        },
        component: () => import('@/views/system/permission.vue'),
      },
      {
        path:'depart',
        name:'depart',
        meta:{
          title: '部门管理'
        },
        component: () => import('@/views/system/depart.vue'),
      },
      {
        path:'menu',
        name:'menu',
        meta:{
          title: '菜单管理'
        },
        component: () => import('@/views/system/menu.vue'),
      },
      {
        path:'dictionary',
        name:'dictionary',
        meta:{
          title: '字典维护'
        },
        component: () => import('@/views/system/dictionary.vue'),
      },
    ]
  },
  {
    path: '/judgeset',
    name: 'judgeset',
    meta:{
      title: '研判设置'
    },
    component: () => import('@/views/judgeset/index.vue'),
    children:[]
  }
]
