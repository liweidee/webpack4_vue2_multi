/* eslint-disable */
const navUserAgent = navigator.userAgent;
const isApple = /iP(ad|od|hone)/i.test(navUserAgent);
const isAndriod = /Android/i.test(navUserAgent);

export default {
    toApp (e){
        if(isApple){
            const appleVersion = Number(navUserAgent.match(/OS\s+(\d+_\d+)/)[1].replace(/_/g,"."));
            // ios9及以上版本
            if(appleVersion>=9){
                var params = encodeURIComponent(JSON.stringify({
                    url: window.location.href,
                    v: '8.6',
                    f: 'iphone'
                }));
                window.location = 'https://app.smzdm.com?json=' + params;
            }else{  // ios8及以下版本
                // 这边不区分浏览器
                window.location = '//a.app.qq.com/o/simple.jsp?pkgname=com.smzdm.client.android';
            }
        }else if (isAndriod){ // 安卓
            // 这边不区分浏览器
            window.location = '//a.app.qq.com/o/simple.jsp?pkgname=com.smzdm.client.android';
        }
    }
}
/* eslint-enable */
