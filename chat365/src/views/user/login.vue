<template>
  <div class="all">
    <div class="ub header">
      <div class="header_left"></div>
      <div class="ub ub-ac ub-pc ub-f1 header_title">登录</div>
      <div class="header_right"></div>
    </div>
    <div class="content">
      <mt-field placeholder="请输入账号" v-model="phone" style="border-bottom: 1px solid rgba(153,153,153,0.2);margin-top: 15px;"></mt-field>
      <mt-field placeholder="请输入密码" v-model="passWord"></mt-field>
      <div class="ub ub-pc login">
        <button class="ub ub-ac ub-pc button" @click="login">登录</button>
      </div>
      <div class="ub ub-pc register">
        <button class="ub ub-ac ub-pc button" @click="register">注册</button>
      </div>
    </div>
    <div class="footer"></div>
  </div>


</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        phone: '17630378060',
        passWord: '123456'
      }
    },
    sockets: {
      connect(json) {
        // console.log(json);
      },
      cbLogin(value) {
        console.log('chat-login',value)
      },
      onMessage(json){
        console.log('chat-onMessage',json.msg)
      }
    },
    methods:{
      login(){
        this.axios({
          method: 'post',
          url: 'http://120.79.167.154:3000/user/login',
          params: {
            phone: this.phone,
            passWord: this.passWord
          }
        }).then((res) => {
          console.log('login',res);
          if(res.data.code==0){
            //存储登录信息
            localStorage.setItem('userInfo',JSON.stringify(res.data));
            // 聊天服务器登录
            this.$socket.emit('login', res.data.data.phone);
            //跳转到注册页面
            // this.$router.push('/register');
          }

        })
      },
      register(){

      }
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
      &_left {
        width: 50px;
      }
      &_title {
        font-size: 16px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: white;
      }
      &_right {
        width: 50px;
      }

    }
    .content {
      .login {
        width: 100%;
        margin-top: 15px;
        .button {
          width: 90%;
          height: 40px;
          color: white;
          border-radius: 5px;
          background-color: rgb(79, 141, 254);
          border: none;
          outline: none;
          &:active {
            background-color: rgba(79, 141, 254, 0.5); /**向下偏移2px **/
          }
        }
      }
      .register {
        width: 100%;
        margin-top: 15px;
        .button {
          width: 90%;
          height: 40px;
          color: white;
          border-radius: 5px;
          background-color: rgba(1, 133, 84);
          border: none;
          outline: none;
          &:active {
            background-color: rgba(1, 133, 84, 0.5); /**向下偏移2px **/
          }
        }
      }
    }
  }
</style>
