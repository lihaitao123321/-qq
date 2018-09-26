//业务调度分发
module.exports = (app) => {
  // app.use-挂载子应用,子应用是一个的完整的application

  //  李海涛负责---用户模块
  app.use('/user', require('./app/user'));
  //  李海涛负责---用户模块
  app.use('/chat', require('./app/chat'));



  //  张自昆负责---首页模块
  // app.use('/home', require('./app/home'));
  //  陈前冲负责---购物车模块
  // app.use('/cart', require('./app/cart'));

}
