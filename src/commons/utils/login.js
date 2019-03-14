import getClient from 'src/commons/utils/getClient.js';
export default {
    callNativeLogin () {
        if (window.smzdmwebaction && typeof window.smzdmwebaction.call_client_login_android === 'function') {
            window.smzdmwebaction.call_client_login_android();
        } else if (getClient.isWkWebview) {
            // window.call_client_login();
            window.webkit.messageHandlers.call_client_login.postMessage(null);
        } else {
            if (typeof window.call_client_login === 'function') {
                window.call_client_login();
            }
            // ...
        }
    }
};
