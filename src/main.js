import Vue from 'vue';
import VueRouter from 'vue-router';
//导入路由规则
import Routers from './router.js';

//使用vue-router
Vue.use(VueRouter);

//按自定义配置实例化vue-router
const vueRouter = new VueRouter({
    mode: 'history',    //路由模式
    routes: Routers     //路由规则
});

//按自定义配置实例化vue
new Vue({
    router: vueRouter   //定义路由
}).$mount('#app');  //载入指定的根节点