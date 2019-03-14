/* 获取元素绝对位置 */
function getElementTop (element) {
    let actualTop = element.offsetTop;
    let current = element.offsetParent;
    while (current !== null){
        actualTop += current.offsetTop;
        current = current.offsetParent;
    }
    return actualTop;
}

export default {
    getElementTop
}