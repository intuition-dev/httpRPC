var httpRPC = (function () {
    function httpRPC(httpOrs, host, port) {
        this.user = '';
        this.pswd = '';
        this.token = '';
        this.httpOrs = httpOrs;
        this.host = host;
        this.port = port;
        console.log(this.httpOrs, this.host, this.port);
    }
    httpRPC.prototype.setUser = function (user, pswd) {
        this.user = user;
        this.pswd = pswd;
    };
    httpRPC.prototype.setToken = function (token) {
        this.token = token;
    };
    httpRPC.prototype.invoke = function (route, method, params) {
        if (!params)
            params = {};
        params.method = method;
        params.user = btoa(this.user);
        params.pswd = btoa(this.pswd);
        params.token = btoa(this.token);
        params.view = window.location.href;
        var str = JSON.stringify(params);
        var compressed = LZString.compressToEncodedURIComponent(str);
        var THIZ = this;
        return new Promise(function (resolve, reject) {
            var url = THIZ.httpOrs + '://' + THIZ.host + (THIZ.port ? (':' + THIZ.port) : '') + '/' + route;
            url = url + '/?p=' + compressed;
            fetch(url, {
                method: 'GET',
                cache: 'default',
                redirect: 'follow',
                mode: 'cors',
                keepalive: true
            })
                .then(function (fullResp) {
                if (!fullResp.ok)
                    reject('HRRP protcol error in RPC: ' + fullResp);
                else {
                    return fullResp.text();
                }
            })
                .then(function (compressed) {
                var str = LZString.decompress(compressed);
                var resp = JSON.parse(str);
                if ((!resp) || resp.errorMessage) {
                    reject(resp);
                }
                resolve(resp.result);
            })
                .catch(function (err) {
                console.log('fetch err', err);
                reject(err);
            });
        });
    };
    httpRPC.prototype.setItem = function (key, val) {
        sessionStorage.setItem(key, val);
    };
    httpRPC.prototype.getItem = function (key) {
        return sessionStorage.getItem(key);
    };
    httpRPC.prototype.log = function (msg, level, className) {
        var THIZ = this;
        var p = {
            msg: msg,
            page: window.location.pathname,
            level: level,
            className: className
        };
        try {
            if (window.ENV)
                p['ENV'] = window.ENV;
            p['view'] = window.location.href;
            p['appVersion'] = btoa(navigator.appVersion);
            p['userAgent'] = btoa(navigator.userAgent);
            p['platform'] = btoa(navigator.platform);
        }
        catch (err) {
            console.log(err);
        }
        setTimeout(function () {
            THIZ.invoke('log', 'log', p);
        }, 1);
        if (className)
            console.log(className, level, msg);
        else
            console.log(msg);
    };
    return httpRPC;
}());
