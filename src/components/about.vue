<template>
    <div id="body">
        <h1>{{msg}}</h1>
        <p>这是about组件</p>
        <div>
            <router-link to="/">首页</router-link>
            <router-link to="/login">重新登录</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '关于'
        };
    }
};
</script>