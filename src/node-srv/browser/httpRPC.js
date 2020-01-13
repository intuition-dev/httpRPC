class httpRPC {
    constructor(httpOrs, host, port) {
        this.user = '';
        this.pswd = '';
        this.token = '';
        this.DEBUG = false;
        this.httpOrs = httpOrs;
        this.host = host;
        this.port = port;
        console.log(this.httpOrs, this.host, this.port);
    }
    setUser(user, pswd) {
        this.user = user;
        this.pswd = pswd;
    }
    setToken(token) {
        this.token = token;
    }
    invoke(route, method, params) {
        if (!params)
            params = {};
        params.method = method;
        params.user = btoa(this.user);
        params.pswd = btoa(this.pswd);
        params.token = btoa(this.token);
        params.view = window.location.href;
        var str = JSON.stringify(params);
        var compressed = LZString.compressToEncodedURIComponent(str);
        const THIZ = this;
        return new Promise(function (resolve, reject) {
            let url = THIZ.httpOrs + '://' + THIZ.host + (THIZ.port ? (':' + THIZ.port) : '') + '/' + route;
            url = url + '/?p=' + compressed;
            fetch(url, {
                method: 'GET',
                cache: 'default',
                redirect: 'follow',
                mode: 'cors',
                keepalive: true
            })
                .then(function (fullResp) {
                if (!fullResp.ok) {
                    console.warn('HTTP protocol error in RPC: ' + fullResp);
                    reject('HTTP protocol error in RPC: ' + fullResp);
                }
                else
                    return fullResp.text();
            })
                .then(function (str) {
                console.log(str);
                if (THIZ.DEBUG) {
                    console.log(str);
                }
                var resp = JSON.parse(str);
                if ((!resp) || resp.errorMessage) {
                    console.warn(method + ' ' + str);
                    reject(method + ' ' + str);
                }
                resolve(resp.result);
            })
                .catch(function (err) {
                console.warn('fetch err ', method, err);
                reject(method + ' ' + err);
            });
        });
    }
    setItem(key, val) {
        sessionStorage.setItem(key, val);
    }
    getItem(key) {
        return sessionStorage.getItem(key);
    }
    log(msg, level, className) {
        var THIZ = this;
        let p = {
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
    }
}
