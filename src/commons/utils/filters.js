/**
 * 格式化数字为带K单位
 * @param {String} 数字格式的字符串
 * @return {String} 大于或等于1000的数字会被格式化为带K的数字
 **/

function numFormat (value) {
    value = parseInt(value, 10);
    if (isNaN(value)) return 0;

    if (value >= 1000 && value <= 99000) {
        value = Math.round(value / 100) / 10 + 'k';
    } else if (value > 99000) {
        value = '99k+';
    } else {
        // ...
    }

    return value;
}

export {
    numFormat
};
