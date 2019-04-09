<template>
    <div class="container">
        <div class="content">
            <img class="empty" src="https://res.smzdm.com/h5/h5_user/dist/assets/card_empty@3x.png">
            <p class="desc">暂无可用的卡<br>在这里，可以查看您已获得的卡</p>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                screenWidth: document.body.clientWidth || document.documentElement.clientWidth
            };
        },
        components: {
        },
        created () {
            let html = document.querySelector('html');
            let docWidth = html.getBoundingClientRect().width;
            if (!docWidth) return;
            if (docWidth > 750) {
                html.style.fontSize = 750 / 10 + 'px';
            } else {
                html.style.fontSize = docWidth * 0.1 + 'px';
            }
        },
        mounted () {
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
                    this.screenWidth = window.screenWidth;
                })();
            };
        },
        methods: {
            recalc () {
                let html = document.querySelector('html');
                let docWidth = html.getBoundingClientRect().width;
                if (!docWidth) return;
                if (docWidth > 750) {
                    html.style.fontSize = 750 / 10 + 'px';
                } else {
                    html.style.fontSize = docWidth * 0.1 + 'px';
                }
            }
        },
        watch: {
            screenWidth () {
                this.recalc();
            }
        }
    };
</script>

<style lang="scss">
    @import 'src/commons/styles/var.scss';
    @import 'src/commons/styles/mixins.scss';

    @function rem($px){
        @return $px/75 * 1rem;
    }

    html, body, div, span, h1, p, a, img, ul, li {
        margin: 0;
        padding: 0;
        border: 0;
        outline: none;
        -webkit-user-select: none;
        font-size-adjust: none;
        -webkit-text-size-adjust: 100% !important;
        -webkit-touch-callout: none;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    }

    [v-cloak] {
        display: none;
    }

    .container {
        box-sizing: border-box;
        margin: 0 auto;
        width: 10rem;
    }

    .content {
        .empty {
            display: block;
            margin: 135px auto 0;
            width: 149px;
        }
        .desc {
            margin: 20px 0 246px;
            line-height: 31px;
            color: #999;
            font-size: 15px;
            text-align: center;
        }
    }
</style>
