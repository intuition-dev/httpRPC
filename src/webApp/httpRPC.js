// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
// requires  lz-string 
//    script(src='https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js')
export class HttpRPC {
    /**
     *
     * @param httpOrs should be 'https'
     * @param host
     * @param port
     *
     * eg:
        var pro = window.location.protocol
        pro = pro.replace(':', '')
        var host = window.location.hostname
        var port = window.location.port
     */
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
    /**
     * So you can control your own sequence
     **/
    __addScript(callback) {
        var s = document.createElement('script');
        s.setAttribute('src', 'https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js');
        s.async = true; // it does it anyway, as the script is async
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
                console.log('cb script');
                HttpRPC.lzStringAdded = true;
                resolve();
            }); //script
        });
    } //pro
    setUser(user, pswd) {
        this.user = user;
        this.pswd = pswd;
    }
    setToken(token) {
        this.token = token;
    }
    /**
     * @param route api apth, eg api
     * @param method CRUD, insert, check, listAll, etc
     * @param params Object of name value pairs.
     * @param timeout defaults to 2000
     */
    invoke(route, method, params, timeout) {
        if (!timeout)
            timeout = 2000;
        if (!params)
            params = {};
        params.method = method;
        params.user = btoa(this.user);
        params.pswd = btoa(this.pswd);
        params.token = btoa(this.token);
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
                    //credentials: 'include',
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
                        console.warn(method + ' ' + str);
                        reject(method + ' ' + str);
                    }
                    resolve(resp.result);
                })
                    .catch(function (err) {
                    console.warn('fetch err ', method, err);
                    reject(method + ' ' + err);
                });
            }); // add script
        }); //pro
        const pro2 = new Promise(function (resolve, reject) {
            setTimeout(() => reject('timeout'), timeout);
        });
        return Promise.race([pro1, pro2]);
    } //()
    setItem(key, val) {
        sessionStorage.setItem(key, val);
    }
    getItem(key) {
        return sessionStorage.getItem(key);
    }
    /**
     * Place this in ViewModel and vm calls the rpc
     * and then in page you can say vm.log(..)
     * @param msg
     * @param level
     * @param className
     */
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
    } //()
} //class
HttpRPC.lzStringAdded = false;