<template>
    <div id="vue-main">
        <!-- 路由视图 -->
        <transition :name="transitionName">
            <router-view/>
        </transition>
    </div>
</template>

<style>
    @import './global/common.scss';
</style>
<style scoped>
    /* 滑动过程中的样式 */
    .left-enter-active, .left-leave-active, .right-enter-active, .right-leave-active {
        will-change: transform;
        transition: all .5s;
    }
    /* 从左边滑入前的位置 */
    .left-enter {
        transform: translateX(-100%);
    }
    /* 从左边滑入后的位置 */
    .left-enter-to {
        transform: translateX(0);
    }
    /* 从左边滑入的组件在离开前的位置 */
    .left-leave {
        transform: translateX(0);
    }
    /* 从左边滑入的组件在离开后的位置 */
    .left-leave-to {
        transform: translateX(-100%);
    }

    /* 从右边滑入前的位置 */
    .right-enter {
        transform: translateX(100%);
    }
    /* 从右边滑入后的位置 */
    .right-enter-to {
        transform: translateX(0);
    }
    /* 从右边滑入的组件在离开前的位置 */
    .right-leave {
        transform: translateX(0);
    }
    /* 从右边滑入的组件在离开后的位置 */
    .right-leave-to {
        transform: translateX(100%);
    }
</style>

<script>
    export default {
        //定义页面数据
        data() {
            return {
                transitionName: ''
            };
        },
        //监控路由切换
        watch: {
            $route(to, from) {
                //更改页面标题
                if (to.meta.title !== undefined && to.meta.title !== null && to.meta.title !== '') {
                    document.title = to.meta.title;
                }
                //如果to索引大于from索引,判断为前进,否则为后退
                if (to.meta.index > from.meta.index) {
                    //从右边进入屏幕
                    this.transitionName = 'right';
                } else {
                    //从左边进入屏幕
                    this.transitionName = 'left';
                }
            }
        }
    };
</script>