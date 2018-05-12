<template>
    <div id="root">
        <h1>{{msg}}</h1>
        <p>这是index组件</p>
        <div>
            <router-link to="/about">关于</router-link>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            msg: '首页'
        };
    }
};
</script>

<style lang="scss" scoped>
/* 引入外部样式文件，受style的scoped属性限制会在打包后加入作用域 */
@import '../global/common.scss';

h1 {
    color: #06c;
}
/* 测试postcss的autoprefixer */
@media (min-resolution: 2dppx) {
    .image {
        color: #fc0;
    }
}
</style>
