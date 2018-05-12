<template>
    <div id="root">
        <h1>{{msg}}</h1>
        <p>这是about组件</p>
        <div>
            <router-link to="/">首页</router-link>
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

<style lang="scss" scoped>
h1 {
    color: #F00;
}
</style>
