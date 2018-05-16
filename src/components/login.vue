<template>
    <div id="body">
        <h1>后台管理</h1>
        <p v-if="showMsg" style="color: #F00;"><strong>{{msg}}</strong></p>
        <div>
            <form id="form">
                <p>账号：<input type="text" id="username" name="username" placeholder="请输入账号"></p>
                <p>账号：<input type="password" id="password" name="password" placeholder="请输入密码"></p>
                <p><button id="submit">登录</button></p>
            </form>
        </div>
        <div>
            <router-link to="/">首页</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        //定义数据
        data() {
            return {
                transitionName: '',
                msg: '',
                showMsg: false,
            };
        },
        //组件挂载前的事件
        beforeMount() {
            //获得get参数
            if (this.$route.query.msg!=='' && this.$route.query.msg!==undefined && this.$route.query.msg!==null) {
                console.log(this.$route.query.msg);
                this.msg=this.$route.query.msg;
                this.showMsg=true;
            }
        }
    };
</script>