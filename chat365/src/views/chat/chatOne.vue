<template>
  <div class="ub ub-ver all">
    <div class="ub header">
      <div class="ub ub-ac ub-pc header_left" @click="$router.go(-1)">
        <i class="fa fa-long-arrow-left"/>
      </div>
      <div class="ub ub-ac ub-pc ub-f1 header_title">{{chatterInfo?chatterInfo.nickName:''}}</div>
      <div class="ub ub-ac ub-pc header_right"></div>
    </div>
    <div class="ub-f1 content" ref="content">
      <!--聊天列表-->
      <div class="ub chatItem" v-for="(item,index) in getMsg" :key="index">
        <div class="ub left">
          <img class="headerImg" :src="chatterInfo.headImg" v-if="item.from!=$store.state.loginInfo.phone"/>
          <div class="headerImg" v-else></div>
        </div>
        <div class="ub ub-f1 rich uba">{{item.messageBody}}</div>
        <div class="ub right">
          <img class="headerImg" :src="$store.state.loginInfo.headImg" v-if="item.from==$store.state.loginInfo.phone"/>
          <div class="headerImg" v-else></div>
        </div>
      </div>

    </div>
    <div class="ub footer">
      <div class="ub ub-f1 footer_left">
        <input placeholder="请输入..." v-model="inputText" />
      </div>
      <button class="ub  ub-ac ub-pc footer_right" :class="{sendBtnActive:inputText}" @click="sendText">发送</button>
    </div>
  </div>


</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        phone: '17630378060',
        passWord: '123456',
        chatterInfo: {},
        inputText:''
      }
    },
    methods: {
      getMsgHistory() {
        if(this.$store.state.loginInfo.phone && this.chatterInfo.chatter){
          this.$socket.emit('getMsgHistory', {
            phone: this.$store.state.loginInfo.phone,
            chatter: this.chatterInfo.chatter,
            page: 1,
            pageSize: 20
          });
        }
      },
      getMsgTemplate(item) {
        return item.messageBody;
      },
      sendText(){
        if(this.inputText){
          this.$socket.emit('sendText',  {
            phone:this.$store.state.loginInfo.phone,
            chatter:this.chatterInfo.chatter,//单聊时聊天人的userid或者群聊时groupid
            chatType:0,//0-单聊,1-群聊
            content:this.inputText//文本内容
          });
          this.inputText='';
        }

      }
    },
    computed: {
      getMsg() {
        let msgList = this.$store.state.chatInfo.chatList;
        let list=[];
        msgList.forEach((item, index, array) => {
          if(item.chatter==this.chatterInfo.chatter){
            list=item.chatMsgList;
          }
        })
        return list;
      }
    },
    updated(){
      this.$refs.content.scrollTop=this.$refs.content.clientHeight;
    },
    mounted() {
      this.chatterInfo = this.$route.params.chatterInfo;
      this.getMsgHistory();
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .all {
    width: 100%;
    height: 100%;
    .header {
      width: 100%;
      height: 50px;
      background-color: rgb(79, 141, 254);
      color: white;
      &_left {
        width: 50px;
      }
      &_title {
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;

      }
      &_right {
        width: 50px;
      }

    }
    .content {
      overflow-y: auto;
      height: calc(~'100vh - 100px');
      .chatItem {
        padding: 5px 10px;
        .left {
          .headerImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .right {
          .headerImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-left: 10px;
          }
        }

        .rich {
          border-radius: 5px;
          padding: 10px;
          background-color: rgb(79, 141, 254, 0.3);
          color: white;
          font-size: 14px;
        }
      }

    }
    .footer {
      width: 100%;
      height: 50px;
      background-color: white;
      border-top: 1px solid rgba(125,125,125,0.2);
      padding: 5px 10px;
      &_left {
        margin-right: 10px;
        input{
          width:100%;
          outline: none;
          background-color: whitesmoke;
          border: none;
          padding-left: 5px;

        }
        input::placeholder{
          color: #cccccc;
        }
      }
      &_right {
        border: none;
        outline: none;
        width: 100px;
        background-color: #dddddd;
        color: white;
        border-radius: 5px;
        border: none;
        outline: none;
      }
      .sendBtnActive{
        background-color: rgb(79, 141, 254);
      }
    }

  }
</style>
