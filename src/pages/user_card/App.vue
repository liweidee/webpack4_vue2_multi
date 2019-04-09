<template>
    <div class="container">
        <div class="content">
            <template v-if="(pageData.user_coupon_list && !pageData.user_coupon_list.length) && (pageData.user_reward_card_list && pageData.user_reward_card_list.length)">
                <card-item 
                    :pageData="pageData" 
                    @onCardGA="onCardGA"></card-item>
                <ticket-item 
                    :pageData="pageData" 
                    @onCopy="onCopy" 
                    @onTicketGA="onTicketGA"></ticket-item>
            </template>
            <template v-else>
                <ticket-item 
                    :pageData="pageData" 
                    @onCopy="onCopy" 
                    @onTicketGA="onTicketGA"></ticket-item>
                <card-item 
                    :pageData="pageData" 
                    @onCardGA="onCardGA"></card-item>
            </template>
        </div>
        <copy-alert ref="copyPop" :code="code" :acturl="actURL"></copy-alert>
    </div>
</template>

<script>
    import getClient from '../../commons/utils/getClient';
    import copyAlert from './components/copyAlert.vue';
    import ticketItem from './components/ticketItem.vue';
    import cardItem from './components/cardItem.vue';
    import axios from 'axios';
    import {Toast} from 'mint-ui';

    export default {
        data () {
            return {
                pageData: {
                    user_coupon_list: [],
                    user_reward_card_list: []
                },
                code: '',
                actURL: '',
                screenWidth: document.body.clientWidth || document.documentElement.clientWidth
            };
        },
        components: {
            ticketItem,
            cardItem,
            copyAlert
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
            this.getPageData();
            window.onresize = () => {
                return (() => {
                    window.screenWidth = document.body.clientWidth || document.documentElement.clientWidth;
                    this.screenWidth = window.screenWidth;
                })();
            };
        },
        methods: {
            getPageData () {
                axios({
                    method: 'get',
                    url: 'https://zhiyou.m.smzdm.com/activity/card_coupon/ajax_card_coupon_list/',
                    responseType: 'json'
                })
                .then((resp) => {
                    let respData = resp.data;
                    if (respData.error_code === 0) {
                        this.pageData = respData.data;
                        console.log(respData.data);
                    } else {
                        Toast(respData.error_msg);
                    }
                })
                .catch((err) => {
                    console.log('Error', err.message);
                });
            },
            callNative (message) {
                let ua = navigator.userAgent;
                let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
                let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

                message = JSON.stringify(message);
                if (isAndroid) {
                    if (window.smzdm && window.smzdm.callNative) {
                        console.log('给安卓发送消息：', message);
                        window.smzdm.callNative(message);
                    }
                } else if (isiOS) {
                    if (getClient.isWkWebview) {
                        console.log('给IOS客户端发送信息', message);
                        window.webkit.messageHandlers.callNative.postMessage(message);
                    } else {
                        if (typeof window.callNative === 'function') {
                            console.log('给客户端发送信息', message);
                            window.callNative(message);
                        }
                    }
                }
            },
            onCopy (copyObj) {
                this.code = copyObj.code;
                this.actURL = copyObj.acturl;
                this.$refs.copyPop.onShow();
                this.callNative({
                    module: 'service_ga',
                    action: 'event',
                    map: {
                        category: 'WAP站_优惠券',
                        action: '我的卡券',
                        label: `优惠券_查看券码`
                    }
                });
            },
            onCardGA (cardid) {
                this.callNative({
                    module: 'service_ga',
                    action: 'event',
                    map: {
                        category: 'WAP站_优惠券',
                        action: '我的卡券',
                        label: `卡_${cardid}`
                    }
                });
            },
            onTicketGA (couponid) {
                this.callNative({
                    module: 'service_ga',
                    action: 'event',
                    map: {
                        category: 'WAP站_优惠券',
                        action: '我的卡券',
                        label: `优惠券_${couponid}`
                    }
                });
            },
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

    @mixin border-1px ($color) {
        position: relative;
        &::after {
            content: '';
            pointer-events: none; // 防止点击触发
            display: block;
            position: absolute;
            left: 0;
            bottom: 0;
            width: 100%;
            border-bottom: 1px solid $color;
        }
        @media (-webkit-min-device-pixel-ratio: 1.5), (min-device-pixel-ratio: 1.5) {
            &::after {
                -webkit-transform:scaleY(0.7);
                transform:scaleY(0.7);
            }
        }
        @media (-webkit-min-device-pixel-ratio: 2), (min-device-pixel-ratio: 2) {
            &::after {
                -webkit-transform:scaleY(0.5);
                transform:scaleY(0.5);
            }
        }
        @media (-webkit-min-device-pixel-ratio: 3), (min-device-pixel-ratio: 3) {
            &::after {
                -webkit-transform:scaleY(0.3);
                transform:scaleY(0.3);
            }
        }
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
        padding: rem(50) rem(30) rem(40);
    }

    .module {
        .head {
            a {
                display: block;
                display: flex;
                flex-direction: row;
                width: 100%;
            }
            .title {
                flex: 1;
                height: 21px;
                &:after {
                    content: '';
                    display: inline-block;
                    width: 0;
                    height: 21px;
                    vertical-align: middle;
                }
                i {
                    color: #333;
                    font-size: 16px;
                    vertical-align: middle;
                }
                span {
                    margin-left: 8px;
                    color: #333;
                    font-size: 15px;
                    font-weight: bold;
                    vertical-align: middle;
                }
            }
            .more {
                height: 21px;
                &:after {
                    content: '';
                    display: inline-block;
                    width: 0;
                    height: 21px;
                    vertical-align: middle;
                }
                span {
                    margin-right: 6px;
                    color: #999;
                    font-size: 14px;
                    vertical-align: middle;
                }
                i {
                    color: #999;
                    font-size: 12px;
                    vertical-align: middle;
                }
            }
        }
        .body {
            list-style: none;
            .list-item {
                position: relative;
                margin-top: 15px;
                width: 100%;
                a {
                    display: block;
                    padding: 10px 10px 12px;
                    box-sizing: border-box;
                }
            }
        }
    }

    .ticket {
        .list-item {
            box-shadow: 0 5px 18px 0 rgba(0,0,0,0.10);
            border-radius: 2px;
            overflow: hidden;
        }
        .item-top {
            display: flex;
            flex-direction: row;
            .left {
                position: relative;
                width: 130px;
                height: 65px;
                overflow: hidden;
                background-repeat: no-repeat;
                background-position: center;
                background-size: contain;
                img {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .right {
                margin-left: rem(20);
                flex: 1;
                overflow: hidden;
                .date {
                    color: #999;
                    font-size: 11px;
                    @include ellipsis;
                }
                .desc {
                    margin-top: 6px;
                    height: 42px;
                    line-height: 21px;
                    color: #333;
                    font-size: 14px;
                    display: -webkit-box;
                    /* autoprefixer: off */
                    -webkit-box-orient: vertical;
                    /* autoprefixer: on */
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
            }
        }
        .item-bottom {
            margin-top: 12px;
            display: flex;
            flex-direction: row;
            .end {
                flex: 1;
                line-height: 24px;
                color: #999;
                font-size: 11px;
                @include ellipsis;
            }
            .ticket-btn {
                width: 68px;
                height: 24px;
            }
        }
        .btn {
            display: block;    
            padding: 0 10px;
            position: absolute;
            right: rem(20);
            bottom: rem(24);
            width: auto;
            height: 24px;
            color: #fff;
            font-size: 12px;
            text-align: center;
            font-weight: bold;
            background-image: linear-gradient(-180deg, #F36F5D 0%, #F04848 100%);
            border-radius: 12px;
            outline: none;
            -webkit-appearance: none;
            border: 0;
        }
    }

    .card {
        .body {
            .list-item {
                position: relative;
                background-color: #fff;
                a {
                    padding: 0;
                    box-shadow: 0 5px 18px 0 rgba(0,0,0,0.10);
                    border-radius: 2px;
                    overflow: hidden;
                }
            }
            .new {
                display: block;
                position: absolute;
                top: -2px;
                right: -2px;
                width: 44px;
                height: 30px;
                background: url(./assets/label@2x.png) no-repeat center / 44px 30px;
            }
        }
        .item-top {
            display: flex;
            flex-direction: row;
            padding: rem(20);
            box-sizing: border-box;
            background-image: linear-gradient(-180deg, #F77262 0%, #F04848 100%);
            .left {
                position: relative;
                width: 65px;
                height: 65px;
                background-color: #fff;
                border-radius: 2px;
                overflow: hidden;
                img {
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }
            .right {
                margin-left: rem(20);
                flex: 1;
                overflow: hidden;
                .price {
                    margin-top: 8px;
                    color: #fff;
                    font-size: 14px;
                    @include ellipsis;
                }
                .desc {
                    max-height: 42px;
                    line-height: 21px;
                    color: #fff;
                    font-size: 14px;
                    text-overflow: -o-ellipsis-lastline;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
        .item-bottom {
            height: 40px;
            .end {
                padding: 0 rem(20);
                line-height: 40px;
                color: #999;
                font-size: 11px;
                @include ellipsis;
            }
        }
    }

    .empty {
        margin-top: 35px;
    }
    .b-empty {
        margin-top: 25px;
    }

    .mint-toast {
        padding: 0!important;
        width: 116px;
        height: 50px;
        font-size: 16px!important;
        line-height: 50px;
        border-radius: 3px!important;
        background: rgba(51,51,51,0.80)!important;
    }
</style>
