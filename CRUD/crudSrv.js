"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "crudApp" });
const Serv_1 = require("http-rpc/lib/Serv");
const UserHandler_1 = require("./handlers/UserHandler");
const srv = new Serv_1.Serv(['*'], 4 * 1024);
const uHand = new UserHandler_1.UserHandler(null);
srv.routeRPC('uapi', uHand);
srv.serveStatic('../wwwApp', 60 * 60, 60);
Serv_1.Serv._expInst.use(function (req, resp, next) {
    log.warn('err', req.originalUrl);
});
srv.listen(8888);
// notice api and static is using same port
