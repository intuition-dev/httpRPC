"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terse_b_1 = require("terse-b/terse-b");
const log = new terse_b_1.TerseB("example");
const Serv_1 = require("http-rpc/lib/Serv");
const LoginHandler_1 = require("./handlers/LoginHandler");
const ContactHandler_1 = require("./handlers/ContactHandler");
const srv = new Serv_1.Serv(['*'], 4 * 1024);
const chandler = new ContactHandler_1.ContactHandler(null);
srv.routeRPC('api', chandler);
const lhandler = new LoginHandler_1.LoginHandler(null);
srv.routeRPC('login', lhandler);
srv.serveStatic('./webApp', 60 * 60, 60);
Serv_1.Serv._expInst.use(function (req, resp, next) {
    log.warn('err', req.originalUrl);
});
srv.listen(8888);
// notice api and static is using same port
