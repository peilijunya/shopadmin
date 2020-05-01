import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueRouter from 'vue-router'

//忽略：项目提示
Vue.config.productionTip = false
//配置ElementUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/reset.css'
import '@/assets/font/iconfont.css'
import animated from 'animate.css'
//配置ercharts
import echarts from 'echarts'
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' //这个样式必须引入
Vue.prototype.$echarts = echarts
Vue.use(animated);
Vue.use(ElementUI);
//粒子特效
import  VueParticles  from   'vue-particles'
Vue.use(VueParticles)
Vue.use(VueRouter)
// 简单配置
NProgress.inc(0.9)
NProgress.configure({ easing: 'cubic-bezier', speed: 200 , showSpinner: false })


router.beforeEach((to,from,next) => {
  NProgress.start() 
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
