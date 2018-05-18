//导入路由规则
import Routers from './router.js';
//入口组件
import Main from './main.vue';

//按自定义配置实例化vue-router
const vueRouter = new VueRouter({
    mode: 'history', //路由模式
    routes: Routers //路由规则
});

//按自定义配置实例化vue
new Vue({
    router: vueRouter, //定义路由
    render: h => h(Main) //渲染入口组件
}).$mount('#vue-app'); //载入指定的根节点
