module.exports = {
  // 处理map文件，减小打包后体积
  productionSourceMap:false,
  // 关闭eslint
  lintOnSave:false,
  // 代理跨域
  devServer: {
    proxy: {
      '/api': {
        target:'http://gmall-h5-api.atguigu.cn',
        // pathRewrite: { '^/api':'' }
      }
    }
  }
}