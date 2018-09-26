// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Tools from './units/Tools'


//使用mint-框架,http://mint-ui.github.io/#!/zh-cn
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css';
Vue.use(MintUI)

//引入全局字体图标库,用法：<i class="fa fa-angle-left"></i>,具体图标去：http://fontawesome.dashgame.com/
import './assets/font-awesome-4.7.0/css/font-awesome.css'

//引入全局css
import './units/main.css'

//引入全局axios
import axios from 'axios'
Vue.prototype.axios= axios;

//聊天服务器相关
import VueSocketio from 'vue-socket.io';
import socketio from 'socket.io-client';
Vue.use(VueSocketio, socketio('http://120.79.167.154:3000/'));

//注册工具类
global.Tools = Tools;


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
