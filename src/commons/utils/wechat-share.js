import wx from 'wx';
import jsonp from 'jsonp';

const URL_WX_SIGN = 'https://api.smzdm.com/v1/weixin/getSignPackage';
const jsApiList = [
    'checkJsApi',
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'onMenuShareQQ',
    'onMenuShareWeibo',
    'hideMenuItems',
    'showMenuItems',
    'hideAllNonBaseMenuItem',
    'showAllNonBaseMenuItem',
    'translateVoice',
    'startRecord',
    'stopRecord',
    'onRecordEnd',
    'playVoice',
    'pauseVoice',
    'stopVoice',
    'uploadVoice',
    'downloadVoice',
    'chooseImage',
    'previewImage',
    'uploadImage',
    'downloadImage',
    'getNetworkType',
    'openLocation',
    'getLocation',
    'hideOptionMenu',
    'showOptionMenu',
    'closeWindow',
    'scanQRCode',
    'chooseWXPay',
    'openProductSpecificView',
    'addCard',
    'chooseCard',
    'openCard'
];

export default {
    bindEvents (shareData) {
        let url = URL_WX_SIGN + '?url=' + encodeURIComponent(location.href.split('#')[0]);
        return jsonp(url, {
            name: 'callback'
        }, (err, data) => {
            if (err) throw err;

            if (data.error_code === '0') {
                wx.config({
                    debug: false,
                    appId: data.data.appId,
                    timestamp: data.data.timestamp,
                    nonceStr: data.data.nonceStr,
                    signature: data.data.signature,
                    jsApiList: jsApiList
                });

                wx.ready(() => {
                    let defaultData = {
                        title: document.title,
                        desc: '',
                        link: location.href,
                        imgUrl: '',
                        trigger: function (res) {
                            // alert('用户点击发送给朋友aa');
                        },
                        success: function (res) {
                            // alert('成功');
                        },
                        cancel: function (res) {
                            // alert('已取消');
                        },
                        fail: function (res) {
                            // alert('分享失败了');
                        }
                    };

                    shareData = Object.assign(defaultData, shareData);

                    wx.onMenuShareAppMessage(shareData);
                    wx.onMenuShareTimeline(shareData);
                    wx.onMenuShareQQ(shareData);
                    wx.onMenuShareWeibo(shareData);
                    wx.onMenuShareQZone(shareData);
                });
            } else {
                console.error(data.error_msg);
            }
        });
    }
};
