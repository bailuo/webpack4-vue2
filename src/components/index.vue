<template>
    <div id="body">
        <h1>{{msg}}</h1>
        <p>这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件这是index组件</p>
        <div>
            <router-link to="/about">关于</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            transitionName: '',
            msg: '首页111'
        };
    }
};
</script>

<style lang="scss" scoped>
h1 {
    color: #06c;
    margin: 0;
    padding: 0;
}
</style>
