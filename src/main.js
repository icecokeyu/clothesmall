import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
import './plugins/vant'

import toast from 'components/common/toast'

Vue.config.productionTip = false
// 添加事件总线对象
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms延迟
FastClick.attach(document.body)

// 使用vue图片懒加载
Vue.use(VueLazyLoad)

// 引入轮播图组件
import { Swipe, SwipeItem, Lazyload } from 'vant';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Lazyload)


new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
