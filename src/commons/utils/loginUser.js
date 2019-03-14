import jsonp from 'jsonp';
import getClient from 'src/commons/utils/getClient.js';
var baseUrl = 'https://zhiyou.smzdm.com/';

/* eslint-disable */
export default {
    // 判断用户是否登录，此接口不支持跨域请求，所以用了jsonp，补上axios的不足。https://github.com/mzabriskie/axios/blob/master/COOKBOOK.md#jsonp
    userMessage (successCallback, errorCallback) {
        jsonp(baseUrl + 'user/info/jsonp_get_current', {name:'callback'}, function (error, response) {
            if (error) {
                errorCallback && errorCallback(error);
            } else {
                successCallback && successCallback(response);
            }
        });
    },
    // 判断用户是否登录，登录返回true，反之返回false
    // 调用loginUser.isLogin().then((value) => {console.log(value);});
    isLogin () {
        return new Promise(function(resolve, reject) {
            jsonp(baseUrl + 'user/info/jsonp_get_current', {name:'callback'}, function (error, response) {
                if (error) {
                    reject(error);
                } else {
                    // smzdm_id为0表示未登录
                    if (response.smzdm_id === 0) {
                        resolve(false);
                    }else{
                        resolve(true);
                    }
                }
            });
        })
    },
    // 判断是ios还是安卓
    iosOrAdr () {
        var userAgent = navigator.userAgent;

        var isAndroid = userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; // android终端
        var isiOS = !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // iOS终端

        if (isAndroid) {
            return 'android';
        } else if (isiOS) {
            return 'ios';
        }
        return 'ios';
    },
    // 调起原生登录
    nativeLogin(){
        var iosOrAdrStr = this.iosOrAdr();
        if (iosOrAdrStr === 'android') {
            if (window.smzdmwebaction && typeof window.smzdmwebaction.call_client_login_android === 'function') {
                window.smzdmwebaction.call_client_login_android();
            }
        } else if (iosOrAdrStr === 'ios') {
            if (getClient.isWkWebview) {
                window.webkit.messageHandlers.call_client_login.postMessage(null);
            } else {
                if (typeof call_client_login === 'function') {
                    call_client_login();
                }
            }
            // if (typeof call_client_login === 'function') {
            //     call_client_login();
            // }
        }
    }
};
/* eslint-enable */
