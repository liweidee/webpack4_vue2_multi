<template>
    <div class="card module" :class="{'empty': isEmpty, 'b-empty': bothEmpty}">
        <div class="card-head head">
            <a :href="pageData.user_reward_card_list && pageData.user_reward_card_list.length ? 'https://reward.smzdm.com/user/reward_card/card_list/' : 'https://zhiyou.m.smzdm.com/activity/card_coupon/vacuum/'">
                <div class="title"><i class="zm-icon-card"></i><span>我的卡包</span></div>
                <div class="more"><span v-show="pageData.user_reward_card_list && pageData.user_reward_card_list.length">查看全部</span><i class="zm-icon-arrow-right"></i></div>
            </a>
        </div>
        <ul class="card-body body">
            <li class="list-item" 
                v-if="index < 3" 
                v-for="(item, index) in pageData.user_reward_card_list">
                <a @click="onCardGA(item.card_id)" :href="'https://reward.smzdm.com/user?card_id=' + item.card_id">
                    <div class="item-top">
                        <div class="left"><img :src="item.card_face_img" alt=""></div>
                        <div class="right">
                            <p class="desc">{{item.card_name}}</p>
                            <p class="price">价值 {{item.card_worth}}</p>
                        </div>
                    </div>
                    <div class="item-bottom">
                        <div class="end"><span>{{item.card_expire_time}}</span>止</div>
                    </div>
                </a>
                <i v-show="!item.card_have_read" class="new"></i>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        props: ['pageData'],
        computed: {
            isEmpty () {
                if (this.pageData.user_reward_card_list && !this.pageData.user_reward_card_list.length) {
                    if (this.pageData.user_coupon_list && this.pageData.user_coupon_list.length) return true;
                } else {
                    if (this.pageData.user_coupon_list && this.pageData.user_coupon_list.length) return true;
                }
            },
            bothEmpty () {
                return (this.pageData.user_reward_card_list && !this.pageData.user_reward_card_list.length) && (this.pageData.user_coupon_list && !this.pageData.user_coupon_list.length);
            }
        },
        methods: {
            onCardGA (cardid) {
                this.$emit('onCardGA', cardid);
            }
        }
    };
</script>

<style lang="scss"></style>
