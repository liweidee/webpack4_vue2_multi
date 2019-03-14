<template>
    <div class="copy-pop" v-show="isShowPop">
        <div class="shadow"></div>
        <div class="content">
            <div class="code">券码：<span>{{code}}</span></div>
            <div class="btn">
                <a class="cancel-btn" href="javascript:;" @click="onCopyCode">复制券码</a>
                <a class="commit-btn" :href="acturl">去使用</a>
            </div>
            <a href="javascript:void(0);" class="close-btn" @click="onClose"></a>
        </div>   
    </div>
</template>

<script>
    import getClient from '../../../commons/utils/getClient';

    export default {
        name: 'confirm',
        props: {
            code: {
                type: String,
                default: ''
            },
            acturl: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                isShowPop: false
            };
        },
        methods: {
            onShow () {
                this.isShowPop = true;
            },
            onClose () {
                this.isShowPop = false;
            },
            onCopyCode () {
                let message = this.code;
                this.isShowPop = false;
                if (/smzdmapp/i.test(navigator.userAgent)) {
                    if (getClient.isWkWebview) {
                        window.webkit.messageHandlers.call_client_copy_coupon_code.postMessage(message);
                    } else {
                        if (typeof window.call_client_copy_coupon_code === 'function') {
                            window.call_client_copy_coupon_code(message);
                        }
                    }
                }
            }
        }
    };
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .copy-pop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 101;
        .shadow {
            position: inherit;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            background-color: #000;
            opacity: .6;
        }
        .content {
            position: inherit;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            box-sizing: border-box;
            padding: 15px;
            width: 286px;
            background-color: #fff;
            border-radius: 11px;
            .code {
                margin: 16px 0 32px;
                line-height: 25px;
                color: #333;
                font-size: 15px;
                text-align: center;
            }
            .btn {
                display: flex;
                flex-direction: row;
                width: 100%;
                height: 40px;
                a {
                    display: block;
                    flex: 1;
                    height: 40px;
                    line-height: 40px;
                    font-size: 14px;
                    text-align: center;
                    border-radius: 3px;
                }
                .cancel-btn {
                    margin-right: 10px;
                    box-sizing: border-box;
                    line-height: 38px;
                    color: #666;
                    border: 1px solid #999;
                }
                .commit-btn {
                    color: #fff;
                    background: url(../assets/ok_bg.png) repeat-x left;
                    background-size: auto 40px;
                    border: 0;
                }
            }
            .close-btn {
                display: block;
                position: inherit;
                left: 50%;
                bottom: -55px;
                margin-left: -15px;
                width: 30px;
                height: 30px;
                background: url(../assets/close_btn.png) no-repeat left;
                background-size: 30px 30px;
            }
        }
    }
</style>
