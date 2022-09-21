const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    port: 8081
  },
  pages: {
    index:{
      entry: 'src/main.js',
      title: 'LangList'
    }
  }
}