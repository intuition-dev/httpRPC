"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "UserHandler" });
const FakeDBCall_1 = require("./FakeDBCall");
const Serv_1 = require("http-rpc/lib/Serv");
log.info('hand');
class LoginHandler extends Serv_1.BaseRPCMethodHandler {
    constructor(db) {
        super(1, 1); // cache
    }
    this.rpc.invoke('apis', 'login', args)
    (params) {
        log.info(params);
        let ret = FakeDBCall_1.getData();
        return ret;
    } //()
} //class
exports.LoginHandler = LoginHandler;
