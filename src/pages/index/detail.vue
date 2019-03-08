<template>
    <div class="main"><span>{{pageData}}</span></div>
</template>

<script>
    export default {
        data () {
            return {
                pageData: '我是详情'
            };
        }
    };
</script>

<style lang="scss">
    .main {
        span {
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            line-height: 30px;
            color: #333;
            font-size: 18px;
            text-align: center;
        }
    }
</style>
