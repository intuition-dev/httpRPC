

import { TerseB } from "terse-b/terse-b"
const log:any = new TerseB("example")

import {  Serv }  from 'http-rpc/lib/Serv'

import {  LoginHandler } from "./handlers/LoginHandler"
import {  ContactHandler } from "./handlers/ContactHandler"

const srv = new Serv(['*'], 4 *1024) 

const chandler = new ContactHandler(null)
srv.routeRPC('api',  chandler)

const lhandler = new LoginHandler(null)
srv.routeRPC('login',  lhandler)

srv.serveStatic('./webApp', 60*60, 60)

Serv._expInst.use(function(req,resp, next){
   log.warn('err', req.originalUrl)
})

srv.listen(8080)
// notice api and static is using same port
