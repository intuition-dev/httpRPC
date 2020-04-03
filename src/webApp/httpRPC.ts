// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
// requires  lz-string 
//    script(src='https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js')

export class HttpRPC {

    /** 
     * So you can control your own sequence
     **/
    __addScript(callback) {
        var s = document.createElement('script')
        s.setAttribute('src', 'https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js')
        s.async = false 
        if (callback) s.onload = callback
        document.getElementsByTagName('body')[0].appendChild(s)
    }
    static lzStringAdded = false

    _addScript() {
        const THIZ = this
        return new Promise((resolve, reject)=> {
            if(HttpRPC.lzStringAdded) resolve()

            THIZ.__addScript(function(){
                console.log('cb script')
                HttpRPC.lzStringAdded = true
                resolve()
            })//script
        })
    }//pro

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

        this.token = '';
        this.DEBUG = false;
        this.httpOrs = httpOrs;
        this.host = host;
        this.port = port;
        console.log(this.httpOrs, this.host, this.port);
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
        
        try {
            params.token = this.getItem('jwt') // auto get old token from storage
        } catch(err){}

        params.view = window.location.href;
        var str = JSON.stringify(params);
        const THIZ = this;
        const pro1 = new Promise(function(resolve, reject) {
            let url = THIZ.httpOrs + '://' + THIZ.host + (THIZ.port ? (':' + THIZ.port) : '') + '/' + route;
            
            THIZ._addScript().then(function(){

                url = url + '/?p=' + LZString.compressToEncodedURIComponent(str);
                
                fetch(url, {
                        method: 'GET',
                        cache: 'default',
                        redirect: 'follow',
                        mode: 'cors',
                        //credentials: 'include',
                        keepalive: true
                    })
                    .then(function(fullResp) {
                        if (!fullResp.ok) {
                            console.warn('HTTP protocol error in RPC: ' + fullResp.status + fullResp);
                            reject('HTTP protocol error in RPC: ' + fullResp.status + fullResp);
                        } else
                            return fullResp.text();
                    })
                    .then(function(str) {
                        var resp = JSON.parse(str);
                        if ((!resp) || resp.errorMessage) {
                            console.warn(method + ' ' + str);
                            reject(method + ' ' + str);
                        }

                        THIZ.setItem('jwt',resp.token) // auto saves token

                        resolve(resp.result);
                    })
                    .catch(function(err) {
                        console.warn('fetch err ', method, err);
                        reject(method + ' ' + err);
                    })
                
            })// add script
            
        })//pro

        const pro2 = new Promise(function(resolve, reject) {
            setTimeout(() => reject('timeout'), timeout);
        });
        return Promise.race([pro1, pro2]);
        
    }//()

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

    static genGUID() { //generates a guid client side so no need to wait
        var d = new Date().getTime();
        if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
        }
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        })
    }
    
    static removeAllStore() { // cookies and storage. For example to log out.
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
            }//inner while
            d.shift()
        }//while
        }//for
        localStorage.clear()
        sessionStorage.clear()
    }//()

}//class