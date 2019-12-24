"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Serv_1 = require("./lib/Serv");
let allowedDomains = [];
allowedDomains.push('one.com');
allowedDomains.push('two.org');
const service = new Serv_1.Serv(['*']);
class Handler1 extends Serv_1.BaseRPCMethodHandler {
    constructor() {
        super(2, 1);
    }
    multiply(params) {
        let a = params.a;
        let b = params.b;
        return doMultiply(a, b);
    }
}
const h1 = new Handler1();
service.routeRPC('api', h1);
function doMultiply(a, b) {
    return a * b;
}
service.listen(8888);
