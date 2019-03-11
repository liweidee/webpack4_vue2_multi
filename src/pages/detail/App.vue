<template>
    <div class="main"><span>{{pageData}}</span></div>
</template>

<script>
    export default {
        data () {
            return {
                pageData: '我是详情页'
            };
        }
    };
</script>

<style lang="scss">
    body {
        background: url(../../assets/card_empty@3x.png) no-repeat top center / 100% auto;
    }
    .main {width: 100%;}
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

            display: -webkit-box;
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
</style>
