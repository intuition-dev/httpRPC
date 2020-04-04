"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terse_b_1 = require("terse-b/terse-b");
const Serv_1 = require("http-rpc/lib/Serv");
const FakeDL_1 = require("../dl/FakeDL");
const dl = new FakeDL_1.FakeDL();
class ContactHandler extends Serv_1.BaseRPCMethodHandler {
    constructor(db) {
        super(1, 1); // cache
        this.log = new terse_b_1.TerseB(this.constructor.name);
    }
    contacts(params) {
        this.log.info(params);
        try {
            dl.validateToken(params['token'], params['remoteAddress']);
        }
        catch (err) {
            this.log.info(err);
            return [null, 'error'];
        }
        let ret = dl.getData();
        return [params['token'], ret];
    } //()
} //class
exports.ContactHandler = ContactHandler;
