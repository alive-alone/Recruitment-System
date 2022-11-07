import { createRouter, createWebHistory, RouteRecordRaw, createWebHashHistory } from 'vue-router'

// 路由跳转进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    redirect: '/home'
  },
  {
    path: '/details',
    name: 'Details',
    component: () => import('@/views/details/Details.vue')
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/home/Home.vue'),
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'Welcome',
        meta: {
          keepAlive: true //设置页面是否需要使用缓存
        },
        component: () => import('../views/home/welcome/Welcome.vue')
      },
      {
        path: '/analysis',
        name: 'Anaalysis',
        component: () => import('../views/home/analysis/Analyse.vue')
      },
      {
        path: '/userlist',
        name: 'userlist',
        component: () => import('../views/home/userlist/Userlist.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../views/admin/Admin.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: () => import('@/views/not-found/not-found.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

NProgress.configure({
  easing: 'ease', // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载 icon
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3 // 初始化时的最小百分比
})

// 导航守卫
router.beforeEach((to) => {
  NProgress.start() // 进度条开始
})

router.afterEach(() => {
  NProgress.done() // 进度条结束
})

export default router
