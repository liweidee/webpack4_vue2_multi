<template>
    <div class="ticket module" :class="{'empty': isEmpty}">
        <div class="ticket-head head">
            <a @click="onCouponJump" href="javascript:;">
                <div class="title"><i class="zm-icon-ticket"></i><span>我的优惠券</span></div>
                <div class="more"><span v-show="pageData.user_coupon_list && pageData.user_coupon_list.length">查看全部</span><i class="zm-icon-arrow-right"></i></div>
            </a>
        </div>
        <ul class="ticket-body body">
            <li class="list-item" 
                v-if="index < 3" 
                v-for="(item, index) in pageData.user_coupon_list">
                <a :href="'https://duihuan.smzdm.com/p/' + item.coupon_id + '/'" @click="onTicketGA(item.coupon_id)">
                    <div class="item-top">
                        <div class="left" :style="'backgroundImage:url(' + item.pic_url +')'"></div>
                        <div class="right">
                            <p class="date">{{item.log_time}}</p>
                            <p class="desc">{{item.coupon_title}}</p>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <div class="end"><span>{{item.end_time}}</span>止</div>
                        <div class="ticket-btn"></div>
                    </div>
                </a>
                <button v-show="item.type_id === 1 || item.type_id === 2" class="btn" @click="onCopy(item.code_txt, item.activity_url)">查看券码</button>
            </li>
        </ul>
    </div>
</template>

<script>
    import getClient from '../../../commons/utils/getClient';

    export default {
        props: ['pageData'],
        computed: {
            isEmpty () {
                return (this.pageData.user_coupon_list && !this.pageData.user_coupon_list.length) && (this.pageData.user_reward_card_list && this.pageData.user_reward_card_list.length);
            }
        },
        methods: {
            onCopy (code, acturl) {
                let copyObj = {
                    code,
                    acturl
                };
                this.$emit('onCopy', copyObj);
            },
            onTicketGA (couponid) {
                this.$emit('onTicketGA', couponid);
            },
            onCouponJump () {
                if (/smzdmapp/i.test(navigator.userAgent)) {
                    if (getClient.isWkWebview) {
                        window.webkit.messageHandlers.call_client_exchange_record.postMessage(null);
                    } else {
                        if (typeof window.call_client_exchange_record === 'function') {
                            window.call_client_exchange_record();
                        }
                    }
                }
            }
        }
    };
</script>

<style lang="scss"></style>
