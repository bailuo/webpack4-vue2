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
            msg: '[404]Not found'
        };
    }
};
</script>
