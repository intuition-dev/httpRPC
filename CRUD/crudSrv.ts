

import { TerseB } from "terse-b/terse-b"
const log:any = new TerseB("example")

import {  Serv }  from 'http-rpc/lib/Serv'

import {  LoginHandler } from "./handlers/LoginHandler"

const srv = new Serv(['*'], 4 *1024) 

const lhandler = new LoginHandler(null)

srv.routeRPC('apis',  lhandler)

srv.serveStatic('../wwwApp', 60*60, 60)

Serv._expInst.use(function(req,resp, next){
   log.warn('err', req.originalUrl)
})

srv.listen(8888)
// notice api and static is using same port
