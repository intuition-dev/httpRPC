
const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "crudApp"})

import {  Serv }  from 'http-rpc/lib/Serv'

import {  UserHandler } from "./handlers/UserHandler"


const srv = new Serv(['*']) 

const uHand = new UserHandler(null)

srv.routeRPC('uapi',  uHand)

srv.serveStatic('../wwwApp', 60*60, 60)

Serv._expInst.use(function(req,resp, next){
   log.warn('err', req.originalUrl)
})

srv.listen(8888)
// notice api and static is using same port
