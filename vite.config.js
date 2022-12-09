import vue from '@vitejs/plugin-vue'

export default {
    base: './',
    plugins: [vue()],
    optimizeDeps: {
        include: ['schart.js']
    },


    // 本地服务
    server: {
        host: "localhost", // ip
        port: 3000,  // 端口号
        open: false,  // 是否自动在浏览器打开
        https: false, // 是否开启 https
        // 跨域代理配置
        proxy: {
            '/api': {
                target: 'http://47.101.58.72:8888/',
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, '')
            }
        }
    }
}