import HookAuth from './hook/auth.js';

import Index from './components/index.vue';
import About from './components/about.vue';
import Login from './components/login.vue';
import NotFound from './components/404.vue';

//子路由的组件
const children = {
    template: '<router-view></router-view></template>'
};

const routers = [
    //不需要验证token的路由
    {
        path: '/login', component: Login,
        meta: { title: '登录', index: 1 }
    },

    //需要验证token的路由，启用了hook
    {
        //根目录
        path: '/',
        component: children,
        beforeEnter: HookAuth,
        children: [
            //首页
            { path: '/', component: Index, meta: { title: '首页', index: 2 } },
            //关于页面
            { path: 'about', component: About, meta: { title: '关于', index: 3 } }
        ]
    },

    //404页面
    { path: '*', component: NotFound, meta: { title: '404', index: 4 } }
];
export default routers;
