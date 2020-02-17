"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const btoa = function (str) { return Buffer.from(str).toString('base64'); };
const fetch = require('make-fetch-happen');
const LZString = require('lz-string');
class HttpRPC {
    constructor(httpOrs, host, port) {
        this._log = bunyan.createLogger({ src: true, stream: formatOut, name: this.constructor.name });
        this.user = '';
        this.pswd = '';
        this.token = '';
        this.httpOrs = httpOrs;
        this.host = host;
        this.port = port;
        this._log.info(this.httpOrs, this.host, this.port);
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
        let str = JSON.stringify(params);
        const compressed = LZString.compressToEncodedURIComponent(str);
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
                    THIZ._log.warn('HTTP protocol error in RPC: ' + fullResp.status + fullResp);
                    reject('HTTP protocol error in RPC: ' + fullResp.status + fullResp);
                }
                else
                    return fullResp.text();
            })
                .then(function (str) {
                const resp = JSON.parse(str);
                if ((!resp) || resp.errorMessage) {
                    THIZ._log.warn(method + ' ' + str);
                    reject(method + ' ' + str);
                }
                resolve(resp.result);
            })
                .catch(function (err) {
                THIZ._log.warn('fetch err');
                THIZ._log.warn(err);
                reject(err);
            });
        });
    }
}
exports.HttpRPC = HttpRPC;
