(function (docs, win) {
    var docEls = docs.documentElement,
        resizeEvts = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalcs = function () {
            window.rem = docEls.getBoundingClientRect().width/25; //750/25 =30 rem;
            docEls.style.fontSize = window.rem + 'px';
            console.log(window.rem);
        };
    recalcs();
    if (!docs.addEventListener) return;
    win.addEventListener(resizeEvts, recalcs, false);
})(document, window);