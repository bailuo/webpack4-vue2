import HookAuth from './hook/auth.js';

import Main from './page/main.vue';
import Index from './page/index.vue';
import About from './page/about.vue';
import Login from './page/login.vue';

//懒加载404页面组件，可以此该页面生成的js文件从main.js里提取出来
const NotFound = () => import('./page/404.vue');

const routers = [
    //不需要验证token的路由
    {
        path: '/login',
        component: Login,
        meta: { title: '登录', index: 1 }
    },

    //需要验证token的路由，启用了hook
    {
        //根目录
        path: '/',
        component: Index,
        beforeEnter: HookAuth,
        meta: { title: '管理首页', index: 2 },
        children: [
            //管理首页
            {
                path: '/',
                component: Main,
                meta: { title: '管理首页', index: 3 }
            },
            //关于页面
            {
                path: 'about',
                component: About,
                meta: { title: '关于', index: 4 }
            }
        ]
    },

    //404页面
    {
        path: '*',
        component: NotFound,
        meta: { title: '404', index: 4 }
    }
];

export default routers;
