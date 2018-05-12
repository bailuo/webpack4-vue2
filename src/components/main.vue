<template>
    <div id="main">{{msg}}</div>
</template>

<script>
    export default {
        // name: "main-com",
        data(){
            return {
                msg: "Hello Vue!"
            }
        }
    }
</script>

<style lang="scss" scoped>
    #main {
        color: #F00;
    }
    @media (min-resolution: 2dppx) {
        .image {
            color: #FC0;
        }
    }
</style>