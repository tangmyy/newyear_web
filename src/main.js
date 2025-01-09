import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'


// 文件名为index才可以不写 如果文件名是其他的则必须写
import axios from 'axios'
axios.defaults.baseURL = "http://localhost:8088/api"
Vue.prototype.$http = axios

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
Vue.use(Buefy)
import 'animate.css';

import VueKinesis from 'vue-kinesis'
Vue.use(VueKinesis);

import { VueMasonryPlugin } from 'vue-masonry';
Vue.use(VueMasonryPlugin);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
