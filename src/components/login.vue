<template>
    <div id="body">
        <h1>登录</h1>
        <p>这是login组件</p>
        <div>
            <router-link to="/">首页</router-link>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                transitionName: ''
            };
        }
    };
</script>

<style lang="scss" scoped>
    h1 {
        color: #F60;
        margin: 0;
        padding: 0;
    }
</style>
