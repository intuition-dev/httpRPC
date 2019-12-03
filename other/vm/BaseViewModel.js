var BaseViewModel = (function () {
    function BaseViewModel() {
        this.E1Listener = {};
    }
    BaseViewModel.prototype.testE1 = function () {
        depp.require('eventBus', function () {
            console.log('tst:');
            var THIZ = this;
            DeventBus.dispatch('dataB4', 'oh hi b4');
            DeventBus.dispatch('dataB4', 'oh hi b4');
            DeventBus.addListener('dataB4', function (data) {
                console.log('b4', data);
            });
            DeventBus.addListener('dataAf', function (data) {
                console.log('af:', data);
            });
            DeventBus.dispatch('dataAf', 'oh hi af');
            DeventBus.dispatch('dataAf', 'oh hi af');
        });
    };
    BaseViewModel.prototype.genGUID = function () {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    };
    BaseViewModel.removeAllStore = function () {
        var cookies = document.cookie.split("; ");
        for (var c = 0; c < cookies.length; c++) {
            var d = window.location.hostname.split(".");
            while (d.length > 0) {
                var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
                var p = location.pathname.split('/');
                document.cookie = cookieBase + '/';
                while (p.length > 0) {
                    document.cookie = cookieBase + p.join('/');
                    p.pop();
                }
                d.shift();
            }
        }
        localStorage.clear();
        sessionStorage.clear();
    };
    return BaseViewModel;
}());
