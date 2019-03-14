import getClient from './getClient.js';

// 跟业务无关的事件交互
let actionListeners = {};
let actionIdMap = {};
let jsBridge = {
    /**
     * 向当前客户端添加action监听，当客户端传送信号是会执行回调
     * @param action {String} 需要监听的方法名
     * @param listener {Function} 收到监听信号的时候需要执行的操作
     *
     */
    addActionListener: function (action, listener) {
        let actionUID = action + '_' + Date.now();

        if (typeof listener !== 'function') return;
        actionListeners[actionUID] = listener;

        if (typeof actionIdMap[action] === 'undefined') {
            actionIdMap[action] = [];
        }

        actionIdMap[action].push(actionUID);
    },

    /**
     * 移除action监听
     * @param action {String} 需要移除的监听方法名
     * @param listener {Function} 需要移除监听的函数
     * 只传入action不传listener的时候，会移除所有与action绑定的函数
     *
     */
    removeActionListener: function (action, listener) {
        let actionIds = actionIdMap[action];
        console.log('执行删除了', action, actionIds.length);
        if (actionIds && actionIds.length) {
            if (arguments.length === 1) {
                actionIds.forEach(id => {
                    actionIds.shift();
                    delete actionListeners[id];
                });
                delete actionIdMap[action];
            } else if (arguments.length === 2) {
                actionIds.forEach((id, index) => {
                    console.log('listener', listener);
                    console.log('actionListeners[id]', actionListeners[id]);
                    // if (listener === actionListeners[id]) {
                    console.log('好像这里不想当呀');
                    actionIds.splice(index, 1);
                    delete actionListeners[id];
                    // }
                });

                if (actionIds.length === 0) {
                    delete actionIdMap[action];
                }
            } else {
                // ...
            }
        }
    },

    /**
     * 当收到客户端发送来的信号是，触发已经监听的action
     * @param action {String} 后端传回来的方法名
     * @param data {Object} 后对传回来的数据
     *
     */
    triggerAction: function (action, data) {
        if (typeof actionIdMap[action] !== 'undefined') {
            let actionIds = actionIdMap[action];
            // 后绑定的listener先执行
            if (actionIds && actionIds.length) {
                console.log(actionIds.length);
                actionIds.reverse().forEach((id) => {
                    let listener = actionListeners[id];

                    if (typeof listener === 'function') {
                        listener(data);
                    }
                });
            }
        }
    },

    /**
     * 向客户端发送信号
     * @param message {String} 新规范中是一个传给后端的json,
     * 老版本中是action与后端协调好的方法名;
     * @param paramsObj {Object} 传送到后端的参数
     * @param callback {Function} 客户端收到后端响应后传送回来的回调
     * @param paramsGa {String or Object} 客户端处理统计需要用到的参数
     */
    sendNative: function (message = '', paramsObj = '', callback = '', paramsGa = '') {
        if (arguments.length === 1) { // 如果只有一个参数 说明是按照新规范再走 此时action是一个对象
            console.log(message);
            let action = `${message.module}&${message.action}`;
            let callbackFunc = message.callbackFunc;
            if (typeof callbackFunc === 'function') {
                this.addActionListener(action, (data) => {
                    this.removeActionListener(action, callbackFunc);
                    callbackFunc(data);
                });
                message.callbackFunc = 'peformAction';
            }
            message = JSON.stringify(message);
            this.callNative(message);
        } else {
            // 监听客户端的回调
            if (typeof callback === 'function') {
                this.addActionListener(message, (data) => {
                    this.removeActionListener(message, callback);
                    callback(data);
                });
            }
            /* eslint-disable */
            if (getClient.isWkWebview) {
                let params = {
                    'jaction': message,
                    'jparams': JSON.stringify(paramsObj),
                    'jtitle': ''
                };
                window.webkit.messageHandlers.transAction.postMessage(params);
            } else {
                transAction(message, JSON.stringify(paramsObj), paramsGa);
            }
            /* eslint-disable */
        }
    },
    callNative: function (message) {
        console.log('发送信息');
        if (getClient.isAndroid) {
            if (window.smzdm && window.smzdm.callNative) {
                console.log('给安卓发送消息：', message);
                window.smzdm.callNative(message);
            }
        } else if (getClient.isiOS) {
            if (getClient.isWkWebview) {
                window.webkit.messageHandlers.callNative.postMessage(message);
            } else {
                if (typeof window.callNative == 'function') {
                    console.log('给客户端发送信息', message);
                    window.callNative(message);
                }
            }
        }
    }
};

// 接受客户端信号
window.peformAction = (data) => {
    console.log('收到消息：', data);
    // tagCbFlag = true;
    // let backData;
    let dataObj;
    let action;
    // 隐藏关注loading
    if (typeof data === 'object') {
        dataObj = data;
        // backData = 'Object\n' + JSON.stringify(data, null, 2);
    } else {
        try {
            dataObj = JSON.parse(data);
        } catch (e) {
            throw e;
        }
    }
    if (dataObj.module) { //说明是新规范
        if (dataObj.module === 'service_guanzhu') {
            dataObj = dataObj.map.json_data;
            if (typeof dataObj === 'object') {

            } else {
                try {
                    dataObj = JSON.parse(dataObj);
                } catch (e) {
                    throw e;
                }
            }
        } else {
            dataObj = dataObj.map;
        }
        action = `${data.module}&${data.action}`;
    }
    console.log('dataobj', dataObj);
    jsBridge.triggerAction(action, dataObj);
};
export default jsBridge;
