import Vue from 'vue';

window.onerror = function (msg, url, line) {
    appendMsg('error:' + msg + '\nfile: ' + url + '\nline: ' + line);
    return true;
};

// todo 调试模块
Vue.config.errorHandler = (err, vm) => {
    appendMsg(err.stack);
};

function appendMsg (msg) {
    let errBlock = document.createElement('div');
    let dataBlock = document.createElement('pre');

    errBlock.textContent = msg;
    errBlock.style.color = 'red';
    errBlock.style.paddingTop = '500px';
    errBlock.style.lineHeight = '20px';

    dataBlock.textContent = JSON.stringify(window.pageData, null, 4);
    document.body.prepend(dataBlock);
    document.body.prepend(errBlock);
    document.body.scrollTop = 0;
}
