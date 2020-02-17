"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Serv_1 = require("./lib/Serv");
const SrvRPC_1 = require("./lib/SrvRPC");
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
function doMultiply(a, b) {
    return a * b;
}
const h1 = new Handler1();
service.routeRPC('api', h1);
service.listen(8888);
let params = { a: 5, b: 2 };
foo(params);
async function foo(params) {
    const rpc = new SrvRPC_1.HttpRPC('http', 'localhost', 8888);
    let ans = await rpc.invoke('api', 'multiply', params);
    console.log(ans);
}
