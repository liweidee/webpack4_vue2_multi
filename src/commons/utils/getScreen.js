let winWidth = document.body.offsetWidth;
export default (function () {
    return winWidth <= 320 ? 'small' : (winWidth <= 375 ? 'middle' : 'large');
})();
