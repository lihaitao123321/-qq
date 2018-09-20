// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


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


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
