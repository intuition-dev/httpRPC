"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "UserHandler" });
const FakeDBCall_1 = require("./FakeDBCall");
const Serv_1 = require("http-rpc/lib/Serv");
log.info('hand');
class UserHandler extends Serv_1.BaseRPCMethodHandler {
    constructor(db) {
        super(1, 1); // cache
    }
    srch(params) {
        log.info(params);
        let ret = FakeDBCall_1.getData();
        return ret;
    } //()
} //class
exports.UserHandler = UserHandler;
