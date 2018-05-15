<template>
    <div id="root">
        <h1>{{msg}}</h1>
        <p>这是404页面</p>
        <div>
            <router-link to="/">首页</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            transitionName: '',
            msg: '[404]Not found'
        };
    }
};
</script>

<style lang="scss" scoped>
h1 {
    color: #F00;
    margin: 0;
    padding: 0;
}
</style>
