import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/users/Login.vue'),
  },
  {
    path: '/',
    name: 'Admin',
    component: () => import('@/views/admin/Admin.vue'),
    children:[{path: 'welcome', alias: '/', component: () => import('@/views/admin/Welcome.vue'),}   ,
    {path:'userAdd',component: () => import('@/views/users/userAdd.vue'),},
    {path:'userList',component: () => import('@/views/users/userList.vue'),},
    {path:'goodsAdd',component: () => import('@/views/goods/goodsAdd.vue'),},
    {path:'goodsList',component: () => import('@/views/goods/goodsList.vue'),},
    {path:'roleList',component: () => import('@/views/power/roleList.vue'),},
    {path:'powerList',component: () => import('@/views/power/powerList.vue'),},
    {path:'orderList',component: () => import('@/views/orders/orderList.vue'),}
  ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


// 导航守卫
// next()                 让用户正常访问
// next({path: '/login'})  重定向到登录页
router.beforeEach((newData, oldData, next) => {
  // console.log('路由变化了！也就是你打开或刷新页面了', newData)
  // 判断用户是否登录
  // 不是登录页 && 检测不到TOKEN   next({path: '/login'}) 
  // 否则 next()

  // 不是登录页 && 检测不到TOKEN   next({path: '/login'}) 
  // 否则 next()
  NProgress.start()
  let token = localStorage.getItem('token')
  // if (newData.path != '/login' && !token)   大家这么写没问题
  if (newData.path != '/login' && newData.path != '/login1' && newData.path != '/login2' && !token)
  {
    next({path: '/login'}) 
  } else {
    next()
  }

})

router.afterEach(() => {
  NProgress.done()
})

export default router
