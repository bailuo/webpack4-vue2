import Vue from 'vue';
import App from './main.vue';

//导入全局scss文件
import '../global/common.scss';

new Vue({
    el:"#app",
    template:'<app/>',
    components:{App}
});