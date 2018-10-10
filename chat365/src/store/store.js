import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginInfo: {},
    chatInfo: {
      connect: false,
      chatList: []
    }
  },
  getters: {
    getMsgHistory(state, chatter) {
      for (let i = 0; i < state.chatInfo.chatList.length; i++) {
        if (state.chatInfo.chatList[i].chatter == chatter) {

          return state.chatInfo.chatList[i].chatMsgList;
        }
      }
    }
  },
  mutations: {
    SOCKET_CONNECT: (state, data) => {
      state.connect = true;
    },
    SOCKET_DISCONNECT: (state, data) => {
      state.connect = false;
    },
    //获取近期聊天对象
    SOCKET_CBGETRECENTCHATTERS: (state, data) => {
      // console.log('获取近期聊天对象',data)
      if (data && data[0].code == 0) {
        let cl = data[0].data;
        let newList = [];
        if (state.chatInfo.chatList.length == 0) {
          for (let j = 0; j < cl.length; j++) {
            newList.push({
              chatter: cl[j].chatter,
              chatterInfo: cl[j],
              chatMsgList: []
            })
          }
          state.chatInfo.chatList = newList;
        }
      }
    },
    //清空消息数量
    SOCKET_CBRESETUNREADMSGCOUNT: (state, data) => {
      // console.log('清空消息数量',data)
      if (data && data[0].code == 0) {
        let chatter = data[0].data;
        for (let i = 0; i < state.chatInfo.chatList.length; i++) {
          if (state.chatInfo.chatList[i].chatter == chatter) {
            state.chatInfo.chatList[i].chatterInfo.unreadMsgCount = 0;
          }
        }
      }
    },
    //获取聊天历史
    SOCKET_CBGETMSGHISTORY: (state, data) => {
      // console.log('获取聊天历史',data)
      if (data && data[0].code == 0) {
        let cl = data[0].data;
        if (cl && cl.length > 0) {
          for (let i = 0; i < state.chatInfo.chatList.length; i++) {
            let chatter = cl[0].phone == cl[0].from ? cl[0].to : cl[0].from;
            if (state.chatInfo.chatList[i].chatter == chatter) {
              state.chatInfo.chatList[i].chatMsgList = cl;
            }
          }
        }
      }
    },
    SOCKET_ONMESSAGE: (state, data) => {
      console.log('收到消息', data)
    },
    SOCKET_CBSENDTEXT: (state, data) => {
      console.log('消息发送成功', data)
      if (data && data[0].code == 0) {
        let msg = data[0].data;
        for (let i = 0; i < state.chatInfo.chatList.length; i++) {
          if (state.chatInfo.chatList[i].chatter == msg.to) {
            state.chatInfo.chatList[i].chatMsgList.push(msg);
            break;
          }
        }
      }
    },
    // 设置用户登录信息
    setUserInfo(state, data) {
      state.loginInfo = data;
    },
    // 设置用户登录信息
    setUserInfo(state, data) {
      state.loginInfo = data;
    },
  }
})
