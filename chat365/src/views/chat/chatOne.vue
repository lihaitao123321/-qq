<template>
  <div class="all">
    <div class="ub header">
      <div class="ub ub-ac ub-pc header_left" @click="$router.go(-1)">
        <i class="fa fa-long-arrow-left" />
      </div>
      <div class="ub ub-ac ub-pc ub-f1 header_title">{{chatter.nickName}}</div>
      <div class="ub ub-ac ub-pc header_right"></div>
    </div>
    <div class="content">
      <div class="ub chatItem">
        <div class="ub left">
          <img class="headerImg" src="../../shared/QQ图片20180925124412.jpg"/>
        </div>
        <div class="ub ub-f1 rich uba">方我是使劲儿和规范化公司对甲方根据施工方和规范化公司对甲方根据施工方</div>
        <div class="ub right">
          <div class="headerImg"></div>
        </div>
      </div>

      <div class="ub chatItem">
        <div class="ub left">
          <div class="headerImg"></div>
        </div>
        <div class="ub ub-f1 rich uba">我是使劲儿我是使劲儿和和规范化公司对甲方根据施工方我是使劲儿和规范化公司对甲方根据施工方和规范化公司对甲方根据施工方</div>
        <div class="ub right">
          <img class="headerImg" src="../../shared/QQ图片20180925124412.jpg"/>
        </div>
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
        passWord: '123456',
        chatList:[],
        chatter:{}
      }
    },
    sockets: {
      cbGetMsgHistory(json){
        console.log('chat-cbGetMsgHistory',json)
      }
    },
    methods: {
      getMsgHistory(){
        this.$socket.emit('getMsgHistory',{
          phone: this.phone,
          chatter: this.chatter.chatter,
          page:1,
          pageSize:20
        });
      }
    },
    mounted(){
      this.chatter=this.$route.params.chatter;
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
      .chatItem {
        padding: 5px 10px;
        .left{
          .headerImg{
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 10px;
          }
        }
        .right{
          .headerImg {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-left: 10px;
          }
        }


        .rich{
          border-radius: 5px;
          padding: 10px;
          background-color: rgb(79, 141, 254,0.3);
          color: white;
          font-size: 14px;
        }
      }

    }
  }
</style>
