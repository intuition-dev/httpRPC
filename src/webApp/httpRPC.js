export class HttpRPC {
    constructor(httpOrs, host, port) {
        this.token = '';
        this.DEBUG = false;
        this.httpOrs = httpOrs;
        this.host = host;
        this.port = port;
        console.log(this.httpOrs, this.host, this.port);
    }
    static regInst(name, inst) {
        if (!window.regInstances)
            window.regInstances = [];
        window.regInstances[name] = inst;
    }
    static getInst(name) {
        if (!window.regInstances)
            window.regInstances = [];
        return window.regInstances[name];
    }
    __addScript(callback) {
        var s = document.createElement('script');
        s.setAttribute('src', 'https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js');
        s.async = false;
        if (callback)
            s.onload = callback;
        document.getElementsByTagName('body')[0].appendChild(s);
    }
    _addScript() {
        const THIZ = this;
        return new Promise((resolve, reject) => {
            if (HttpRPC.lzStringAdded)
                resolve();
            THIZ.__addScript(function () {
                HttpRPC.lzStringAdded = true;
                resolve();
            });
        });
    }
    invoke(route, method, params, timeout) {
        if (!timeout)
            timeout = 2000;
        if (!params)
            params = {};
        params.method = method;
        try {
            params.token = this.getItem('jwt');
        }
        catch (err) { }
        params.view = window.location.href;
        var str = JSON.stringify(params);
        const THIZ = this;
        const pro1 = new Promise(function (resolve, reject) {
            let url = THIZ.httpOrs + '://' + THIZ.host + (THIZ.port ? (':' + THIZ.port) : '') + '/' + route;
            THIZ._addScript().then(function () {
                url = url + '/?p=' + LZString.compressToEncodedURIComponent(str);
                fetch(url, {
                    method: 'GET',
                    cache: 'default',
                    redirect: 'follow',
                    mode: 'cors',
                    keepalive: true
                })
                    .then(function (fullResp) {
                    if (!fullResp.ok) {
                        console.warn('HTTP protocol error in RPC: ' + fullResp.status + fullResp);
                        reject('HTTP protocol error in RPC: ' + fullResp.status + fullResp);
                    }
                    else
                        return fullResp.text();
                })
                    .then(function (str) {
                    var resp = JSON.parse(str);
                    if ((!resp) || resp.errorMessage) {
                        console.info(method + ' ' + str);
                        reject(method + ' ' + str);
                    }
                    THIZ.setItem('jwt', resp.result[0]);
                    resolve(resp.result);
                })
                    .catch(function (err) {
                    console.warn('fetch err ', method, err);
                    reject(method + ' ' + err);
                });
            });
        });
        const pro2 = new Promise(function (resolve, reject) {
            setTimeout(() => reject('timeout'), timeout);
        });
        return Promise.race([pro1, pro2]);
    }
    hasJWToken() {
        let token = this.getItem('jwt');
        if (!token)
            return false;
        return true;
    }
    setItem(key, val) {
        localStorage.setItem(key, val);
    }
    getItem(key) {
        return localStorage.getItem(key);
    }
    getUrlVars() {
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    }
    static genGUID() {
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
            d += performance.now();
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });
    }
    static removeAllStore() {
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
    }
}
HttpRPC.lzStringAdded = false;
