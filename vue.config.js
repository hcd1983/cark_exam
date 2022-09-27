const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/cark_exam/',
  pages: {
    index: {
      entry: 'src/main.js',
      title: '創方舟實境科技股份有限公司 | 測驗',
    },
  },
});
