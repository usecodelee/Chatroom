import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueSocketio from 'vue-socket.io';
Vue.use(VueSocketio, 'http://localhost:5000');
Vue.use(ElementUI);

new Vue({
    el: '#app',
    render: h => h(App)
})