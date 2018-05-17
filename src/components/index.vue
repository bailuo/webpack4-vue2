<template>
    <div id="vue-main">
        <!-- 路由视图 -->
        <transition :name="transitionName">
            <router-view/>
        </transition>
    </div>
</template>

<script>
export default {
    //定义页面数据
    data() {
        return {
            transitionName: ''
        };
    },
    //监视状态
    watch: {
        //路由
        $route(to, from) {
            //更改页面标题
            if (
                to.meta.title !== undefined &&
                to.meta.title !== null &&
                to.meta.title !== ''
            ) {
                document.title = to.meta.title;
            }
            //如果to索引大于from索引,判断为前进,否则为后退
            if (to.meta.index > from.meta.index) {
                //新组件从右边进入屏幕，旧组件从左边离开屏幕
                this.transitionName = 'right';
            } else {
                //新组件从左边进入屏幕，旧组件从右边离开屏幕
                this.transitionName = 'left';
            }
        }
    }
};
</script>
