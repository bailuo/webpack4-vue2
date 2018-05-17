import Vue from 'vue';
import VueRouter from 'vue-router';
//导入路由规则
import Routers from './router.js';
//入口组件
import Main from './main.vue';

//导入element-ui包
import ElementUI from 'element-ui';
//导入element-ui的主题样式文件
import 'element-ui/lib/theme-chalk/index.css';
//导入按屏幕尺寸隐藏dom元素的css类文件
import 'element-ui/lib/theme-chalk/display.css';

//使用vue-router
Vue.use(VueRouter);
//使用element-ui包，并指定默认样式的尺寸（mini/small/medium）
Vue.use(ElementUI, { size: 'medium' });

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
