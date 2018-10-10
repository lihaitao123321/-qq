<template>
  <div class="chat">
    <div class="chatItem ub ub-ac" v-for="(item,index) in getChatList" @click="clickItem(item,index)">
      <div class="chatItem_left">
        <img class="headerImg" :src="item.chatterInfo.headImg"/>
      </div>
      <div class="ub ub-f1 ub-ver chatItem_right">
        <div class="ub ub-f1 ub-con ub-ac  ">
          <div class="ub-f1 title">{{item.chatterInfo.nickName}}</div>
          <div class="desc">{{getTime(item.chatterInfo)}}</div>
        </div>
        <div class="ub ub-f1 ub-con ub-ac ">
          <div class="ub-f1 desc">{{item.chatterInfo.messageBody}}</div>
          <div class="msgNum" v-if="item.chatterInfo.unreadMsgCount">{{item.chatterInfo.unreadMsgCount}}</div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "",
    data() {
      return {
        phone: '17630378060',
        chatList: []
      }
    },
    methods: {
      //点击聊天列表
      clickItem(item, index) {
        //  清空未读消息数
        this.$socket.emit('resetUnreadMsgCount', {phone:this.$store.state.loginInfo.phone,chatter: item.chatterInfo.chatter});
        //跳转到单聊或者群聊
        if (item.chatterInfo.chatType == 0) {
          this.$router.push({
            name: 'chatOne',
            params: {
              chatterInfo: item.chatterInfo
            }
          });
        } else if (item.chatterInfo.chatType == 1) {
          this.$router.push({
            name: 'chatGroup',
            params: {
              chatterInfo: item.chatterInfo
            }
          });
        }
      },
      getRecentChatters() {
        //获取近期聊天对象
        this.$socket.emit('getRecentChatters', this.$store.state.loginInfo.phone);
      },
      getTime(item) {
        return Tools.TimeFormat(new Date(item.sendTime).getTime(), 'ymdhms')
      }
    },
    mounted() {
      this.getRecentChatters();
    },
    computed:{
      getChatList(){

        return this.$store.state.chatInfo.chatList
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .chat {
    width: 100%;
    height: 100%;
    .chatItem {
      height: 60px;
      padding: 0 10px;
      border-bottom: 1px solid rgba(125, 125, 125, 0.1);
      &_left {
        padding-right: 5px;
        .headerImg {
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
      }
      &_right {
        height: 40px;
        .title {
          font-size: 12px;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
          color: rgba(51, 51, 51, 1);
        }
        .desc {
          font-size: 10px;
          font-family: PingFang-SC-Regular;
          font-weight: 400;
          color: rgba(204, 204, 204, 1);
          line-height: 10px;
        }
        .msgNum {
          width: 18px;
          height: 18px;
          line-height: 18px;
          text-align: center;
          border-radius: 50%;
          background-color: red;
          font-size: 8px;
          color: white;
        }
      }

    }
  }
</style>
