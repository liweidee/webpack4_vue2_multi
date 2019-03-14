// 跟业务无关的事件交互
let actionListeners = {};
let actionIdMap = {};

export default {
    data () {
        return {
            pageData: {}
        };
    },
    created () {
        this.pageData = window.pageData;
    },
    methods: {
        /**
         * 向当前客户端添加action监听，当客户端传送信号是会执行回调
         * @param action {String} 需要监听的方法名
         * @param listener {Function} 收到监听信号的时候需要执行的操作
         *
         */
        addActionListener (action, listener) {
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
        removeActionListener (action, listener) {
            let actionIds = actionIdMap[action];

            if (actionIds && actionIds.length) {
                if (arguments.length === 1) {
                    actionIds.forEach(id => {
                        actionIds.shift();
                        delete actionListeners[id];
                    });
                    delete actionIdMap[action];
                } else if (arguments.length === 2) {
                    actionIds.forEach((id, index) => {
                        if (listener === actionListeners[id]) {
                            actionIds.splice(index, 1);
                            delete actionListeners[id];
                        }
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
        triggerAction (action, data) {
            if (typeof actionIdMap[action] !== 'undefined') {
                let actionIds = actionIdMap[action];

                // 后绑定的listener先执行
                if (actionIds && actionIds.length) {
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
         * @param action {String} 与后端协调好的方法名
         * @param paramsObj {Object} 传送到后端的参数
         * @param callback {Function} 客户端收到后端响应后传送回来的回调
         *
         */
        sendNative (action, paramsObj, callback) {
            // 监听客户端的回调
            if (typeof callback === 'function') {
                this.addActionListener(action, (data) => {
                    this.removeActionListener(action, callback);
                    callback(data);
                });
            }

            /* eslint-disable */
            transAction(action, JSON.stringify(paramsObj));
            /* eslint-disable */
        }
    },

}
