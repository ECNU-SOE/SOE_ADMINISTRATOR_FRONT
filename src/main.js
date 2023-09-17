import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import 'font-awesome/css/font-awesome.min.css';
import 'amfe-flexible';
import '@/assets/iconfont/iconfont.css';
// import echarts from 'echarts';

Vue.use(ElementUI);

const pinyin = require('pinyin-pro');

Vue.config.productionTip = false;

// Vue.prototype.$echarts = echarts;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')