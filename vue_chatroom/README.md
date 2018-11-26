npm install -g vue-cli

vue init webpack-simple vue_element_chat

一通下一步
cd vue_element_chat
     npm install
     npm run dev


安装element
npm i element-ui -S

main.js：
import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';

Vue.use(ElementUI);

new Vue({
  el: '#app',
  render: h => h(App)
});


npm run dev运行

报错：
ERROR in ./node_modules/element-ui/lib/theme-chalk/fonts/element-icons.ttf
Module parse failed: Unexpected character '' (1:0)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
 @ ./node_modules/css-loader!./node_modules/element-ui/lib/theme-chalk/index.css 7:894-930
 @ ./node_modules/element-ui/lib/theme-chalk/index.css
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:8081 webpack/hot/dev-server ./src/main.js

ERROR in ./node_modules/element-ui/lib/theme-chalk/fonts/element-icons.woff
Module parse failed: Unexpected character '' (1:4)
You may need an appropriate loader to handle this file type.
(Source code omitted for this binary file)
 @ ./node_modules/css-loader!./node_modules/element-ui/lib/theme-chalk/index.css 7:818-855
 @ ./node_modules/element-ui/lib/theme-chalk/index.css
 @ ./src/main.js
 @ multi (webpack)-dev-server/client?http://localhost:8081 webpack/hot/dev-server ./src/main.js

 解决：
 修改webpack.config.js配置
  {
    test: /\.(png|jpg|gif|svg|ttf|woff)$/,
    loader: 'file-loader',
    options: {
        name: '[name].[ext]?[hash]'
    }
}

页面布局
监听高度
新建server写后台
1. >npm init
2. >npm install express
3. >npm install socket.io
4. >npm install
5. >package.json里面添加"start":"node app.js"
6. >npm start


客户端
npm install vue-socket.io