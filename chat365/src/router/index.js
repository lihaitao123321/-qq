import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/user/login'
import register from '../views/user/register'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },{
      path: '/register',
      name: 'register',
      component: register
    },{
      path: '/',
      redirect:to=>{
        return '/login';
      }
    }
  ]
})
