<template>
    <div id="body">
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