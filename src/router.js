import Index from './components/index.vue';
import About from './components/about.vue';

const routers = [
    // {
    //     path: '*',   //404页面
    //     component: NotFoundComponent
    // },
    {
        path: '/',  //首页
        name: 'index',  //路由名称
        component: Index
    },
    {
        path: '/about',
        name: 'about',
        component: About
    }
];
export default routers;