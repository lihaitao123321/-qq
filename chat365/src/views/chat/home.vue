<template>
  <div class="ub ub-ver all">
    <div class="ub header">
      <div class="header_left"></div>
      <div class="ub ub-ac ub-pc ub-f1 header_title">{{title}}</div>
      <div class="header_right"></div>
    </div>
    <div class="ub-f1 content">
      <router-view></router-view>
    </div>
    <div class="ub footer">
      <div class="ub ub-f1 ub-con ub-ver ub-ac ub-pc item" @click="changeFooter(0)">
        <div class="image fa fa-commenting" :class="{'footer_active':activeIndex==0}"></div>
        <div class="label">消息</div>
      </div>
      <div class="ub ub-f1 ub-con ub-ver ub-ac ub-pc item" @click="changeFooter(1)">
        <div class="image fa fa-user" :class="{'footer_active':activeIndex==1}"></div>
        <div class="label">联系人</div>
      </div>
      <div class="ub ub-f1 ub-con ub-ver ub-ac ub-pc item" @click="changeFooter(2)">
        <div class="image fa fa-star" :class="{'footer_active':activeIndex==2}"></div>
        <div class="label">动态</div>
      </div>
    </div>
  </div>


</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        title:'消息',
        activeIndex:0,
        phone:'17630378060'
      }
    },
    methods:{
      getRecentChatters(){
        this.axios({
          method: 'post',
          url: 'http://120.79.167.154:3000/chat/getRecentChatters',
          params: {
            phone: this.phone
          }
        }).then((res) => {
          console.log('getRecentChatters',res);
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
      changeFooter(index){
        if(this.activeIndex!=index){
          this.activeIndex=index;
          if(index==0){
            this.$router.push('chatList')
            this.title='消息';
          }else if(index==1){
            this.$router.push('userList')
            this.title='联系人';
          }else if(index==2){
            this.$router.push('userList')
            this.title='动态';
          }
        }
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


    }
    .footer{
      border-top: 1px solid rgba(102,102,102,0.2);;
      height: 50px;
      .item{

      }
      .image{
        font-size: 25px;
        width: 25px;
        height: 25px;
      }
      .label{
        color: #999;
        font-size: 12px;
      }
      &_active{
        color:rgb(79, 141, 254)
      }
    }
  }
</style>
