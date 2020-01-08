const proxy = require('http-proxy-middleware');// node 中间件
module.exports = function(app) {
  //反向代理
  app.use(
    '/ajax',
    proxy({
      target: 'http://m.maoyan.com',
      changeOrigin: true,
    })
  );

  
};
