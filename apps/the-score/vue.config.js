const path = require("path");

module.exports = {
  publicPath: '/', //署应用包时的基本 URL。  vue-router history模式使用
  productionSourceMap: false,
  configureWebpack: config => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        extensions: [".js", ".vue", ".json", ".ts", ".tsx"],
        alias: {
          vue$: "vue/dist/vue.js",
          "@": path.resolve(__dirname, "./src")
        }
      }
    });
  },
  // chainWebpack: config => {
  //   config.module
  //   .rule('ts')
  //   .use('ts-loader')
  //   .loader('ts-loader')
  //   .tap(options => {
  //     // modify the options...
  //     return options
  //   })
  // }
}
