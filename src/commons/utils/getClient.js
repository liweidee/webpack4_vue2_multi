var ua = navigator.userAgent;
var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1;
var isWkWebview = false;
let isSmzdm = ua.indexOf('smzdm') > -1;
if (isiOS && /smzdmapp/i.test(ua)) {
    if (/wkwebview/ig.test(ua)) {
        isWkWebview = true;
    }
}

module.exports = {
    isWkWebview,
    isiOS,
    isAndroid,
    isSmzdm
};
