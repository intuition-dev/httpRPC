"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "mainEx" });
const Serv_1 = require("./Serv");
let allowedDomains = [];
allowedDomains.push('one.com');
allowedDomains.push('two.org');
const serviceApp = new Serv_1.Serv(['*']);
class Handler1 extends Serv_1.BaseRPCMethodHandler {
    multiply(res, params) {
        let a = params.a;
        let b = params.b;
        const resp = {};
        resp.result = multiply(a, b);
        log.info(resp);
        this.ret(res, resp, 4, 3);
    }
}
const h1 = new Handler1();
serviceApp.routeRPC('api', h1);
serviceApp.setLogger(handleLog);
function multiply(a, b) {
    return a * b;
}
function handleLog(params) {
    log.info(params);
    log.info(params.msg);
}
serviceApp.listen(8888);
class CheckX {
    auth(user, pswd, resp, ctx) {
        return new Promise(function (resolve, reject) {
            return resolve('OK');
        });
    }
}
