import Vue from 'vue';
import 'zdmui/dist/style.css';
import ZdmUI from 'zdmui';

import App from './empty.vue';

const Main = Vue.component('app', App);
Vue.use(ZdmUI);

// 引入mockjs
// require('./apis/mock.js');

/* eslint-disable no-unused-vars */
const main = new Main({
    el: '#app'
});

// todo 调试模块
window.mainApp = main;
/* eslint-disable no-unused-vars */
