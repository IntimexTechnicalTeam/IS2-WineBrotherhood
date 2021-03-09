const path = require('path');
const fs = require('fs');
const resolve = dir => path.join(__dirname, dir);
let apiServer = 'http://api.dev.in-store.hk:84';
let AdminServer = 'http://admin.dev.in-store.hk:84';
let param = getArgList();
if (param === 'dev') {
  apiServer = 'http://api.dev.in-store.hk:84';
  AdminServer = 'http://admin.dev.in-store.hk:84';
} else if (param === 'uat') {
  apiServer = 'https://api.uat.intimex.hk';
  AdminServer = 'https://admin.uat.intimex.hk';
} else if (param === 'prod') {
  apiServer = 'https://api.uat.in-store.hk';
  AdminServer = 'https://admin.uat.in-store.hk';
}
function getArgList () {
  let argv = process['argv'];
  let mode = 'dev';
  try {
    mode = argv[3].split('=')[1];
  } catch (e) {
    return mode;
  }
  return mode;
};
let p = './src/sdk/common/ApiAndAdminServer.ts';
fs.writeFileSync(p, 'module.exports = { apiServer: \'' + apiServer + '\', AdminServer: \'' + AdminServer + '\' };\r\n');
module.exports = {
  chainWebpack: config => {
    // 添加别名
    config.plugins.delete('prefetch');
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets', resolve('src/assets'));
  },
  devServer: {
    disableHostCheck: true,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#configuring-proxy
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [__dirname, './src/assets/css/variable.less']
    }
  },
  // publicPath: './',
  // assetsDir: '/',
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      return {
        plugins: [
        ],
        externals: {
          /**
          *key: main.js中全局引入的路径
          *value: 全局暴露出来的对象名
          */
          // 'element-ui': 'ElementUI', // 忽略js
          // 'vue': 'Vue'
        }
      };
    }
  }
};
