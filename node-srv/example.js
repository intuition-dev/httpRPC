"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "mainEx" });
const Serv_1 = require("./lib/Serv");
let allowedDomains = [];
allowedDomains.push('one.com');
allowedDomains.push('two.org');
const service = new Serv_1.Serv(['*']);
class Handler1 extends Serv_1.BaseRPCMethodHandler {
    multiply(params) {
        let a = params.a;
        let b = params.b;
        return multiply(a, b);
    }
}
const h1 = new Handler1(1);
service.routeRPC('api', h1);
service.setLogger(handleLog, 0);
function multiply(a, b) {
    return a * b;
}
function handleLog(params) {
    log.info(params);
    log.info(params.msg);
}
service.listen(8888);
class CheckX {
    auth(user, pswd, resp, ctx) {
        return new Promise(function (resolve, reject) {
            return resolve('OK');
        });
    }
}
