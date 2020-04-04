"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terse_b_1 = require("terse-b/terse-b");
const Serv_1 = require("http-rpc/lib/Serv");
const FakeDL_1 = require("../dl/FakeDL");
const dl = new FakeDL_1.FakeDL();
class LoginHandler extends Serv_1.BaseRPCMethodHandler {
    constructor(db) {
        super(1, 1); // cache
        this.log = new terse_b_1.TerseB(this.constructor.name);
    }
    login(params) {
        this.log.info(params);
        let valid = dl.isValidPswd(params['email'], null);
        let jwt;
        if (valid)
            jwt = dl.makeToken(params['email'], params['remoteAddress']);
        else
            jwt = null;
        return [jwt, valid];
    } //()
    logout() {
    }
} //class
exports.LoginHandler = LoginHandler;
