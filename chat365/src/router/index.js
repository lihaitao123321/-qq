import Vue from 'vue'
import Router from 'vue-router'
import login from '../views/user/login'
import home from '../views/chat/home'
import chatList from '../views/chat/chatList'
import userList from '../views/chat/userList'
import chatOne from '../views/chat/chatOne'
import chatGroup from '../views/chat/chatGroup'


Vue.use(Router)

export default new Router({
  routes: [
    //登录
    {
      path: '/login',
      name: 'login',
      component: login
    },
    //home
    {
      path: '/home',
      name: 'home',
      component: home,
      children: [
        //默认路由
        {
          path: '/',
          redirect: to => {
            return '/home/chatList';
          }
        },
        //消息
        {
          path: '/home/chatList',
          name: 'chatList',
          component: chatList
        },
        //联系人
        {
          path: '/home/userList',
          name: 'userList',
          component: userList
        }]
    },
    //单聊页面
    {
      path: '/chat/chatOne',
      name: 'chatOne',
      component: chatOne
    },
    //群聊页面
    {
      path: '/chat/chatGroup',
      name: 'chatGroup',
      component: chatGroup
    },
    //项目默认路由
    {
      path: '/',
      redirect: to => {
        return '/login';
      }
    }
  ]
})
