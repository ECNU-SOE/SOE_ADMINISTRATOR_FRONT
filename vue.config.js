const path = require('path')
const resolve = dir => path.join(__dirname,dir)

module.exports = {
  // publicPath:process.env.NODE_ENV === 'production'?"/dongbb/":"/",
  publicPath:"/",
  chainWebpack: config =>{
    config.module
        .rule('')
        .test(/\.md$/)
        .use('html-loader')
        .loader('html-loader')
        .end()
        .use('markdown-loader')
        .loader('markdown-loader')
        .end(),
    config.resolve.alias
      .set('@',resolve('src'))
  },
  devServer: {
    proxy: {
      '/api': {
        // 此处的写法，目的是为了 将 /api 替换成 https://www.baidu.com/
        target: 'http://47.101.58.72:8888/',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    port:3000
  }
}