<template>
    <div id="body">
        <h1>后台管理</h1>
        <p v-if="alertShow" style="color: #F00;"><strong>{{alertText}}</strong></p>
        <div>
            <form @submit.prevent="formSubmit">
                <p>账号：<input v-model="username" type="text" autocomplete="username" placeholder="请输入账号"></p>
                <p>账号：<input v-model="password" type="password" autocomplete="password" placeholder="请输入密码"></p>
                <p>
                    <el-button type="primary">主要按钮</el-button>
                </p>
            </form>
        </div>
    </div>
</template>

<script>
//导入axios
import Axios from 'axios';
//导入js-cookie包
import Cookie from 'js-cookie';
//导入base64解码包
import { Base64Decode } from '../global/common.js';

//定义组件
export default {
    //定义数据
    data() {
        return {
            alertText: '',
            alertShow: false,
            username: '',
            password: ''
        };
    },
    //定义组件挂载前的事件
    beforeMount() {
        //清除cookie
        Cookie.remove('token', { path: '/' });
        //获得get参数
        if (
            this.$route.query.msg !== '' &&
            this.$route.query.msg !== undefined &&
            this.$route.query.msg !== null
        ) {
            this.alertText = Base64Decode(this.$route.query.msg);
            this.alertShow = true;
        }
    },
    //定义组件的方法
    methods: {
        formSubmit(event) {
            const This = this;
            //阻止默认事件
            event.preventDefault();
            //拼装要提交的数据
            let formData = new FormData();
            formData.append('username', this.username);
            formData.append('password', this.password);
            //定义配置
            let config = {
                // headers: {
                //     'Content-Type': 'multipart/form-data'
                // }
            };
            //发起POST请求
            Axios.post('http://127.0.0.1:3000/auth', formData, config)
                .then(function(resp) {
                    //判断服务端响应的状态码
                    switch (resp.status) {
                        case 200:
                            //将token写入cookie
                            Cookie.set('token', resp.data.token, {
                                expires: 20,
                                path: '/'
                            });
                            //重定向到管理首页
                            This.$router.push('/');
                            break;
                        case 500:
                            This.alertText = '内部错误';
                            This.alertShow = true;
                            break;
                        default:
                            This.alertText = resp.data.error;
                            This.alertShow = true;
                            break;
                    }
                })
                .catch(function(error) {
                    This.alertText = '系统错误：' + error;
                    This.alertShow = true;
                });
        }
    }
};
</script>
