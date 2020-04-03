
// const URL = require('url')

import { TerseB } from "terse-b/terse-b"
const log:any = new TerseB("example")

import { BaseRPCMethodHandler, Serv } from './lib/Serv'
import { HttpRPC } from "./lib/SrvRPC"
import { jwT } from "./lib/jwtUtil"

const jwt = new jwT()
let secret = '123'

let allowedDomains = []
allowedDomains.push('one.com') // get from config.yaml, could be '*'
allowedDomains.push('two.org') // XXX host or local would match localhost

// pass in the CORS domains 
const service = new Serv(['*'],4 *1024)

// RPC Example: (should be a class)
async function doMultiply(a,b) {// simulate wait
   return new Promise(function(resolve, reject) {
      setTimeout(function(){
         resolve( a*b )
      },500)
   })
}

// handler
class Handler1 extends BaseRPCMethodHandler {

   constructor() {
      super(2,1) // example of 2 second browser cache and 1 second CDN/edge cache. You can set to 0,0 to disable.
   }

   async multiply(params:any) {
      log.info(params.token, params.remoteAddress)

      let a = params.a
      let b = params.b

      let result = await doMultiply(a,b)
      
      return  [ jwt.newToken5(secret,'me@me.com', 'user', params['remoteAdddress']), result ]
   }//()

}//c

const h1 = new Handler1()
service.routeRPC('api', h1 ) // route to handler

service.listen(8888)

// part II: server side

setTimeout(function() {
   let params = {a:5, b:2}
   foo(params)   
},2000)

// server RPC call
async function foo(params) {
   const rpc = new HttpRPC('http', 'localhost', 8888)
   rpc.setToken(jwt.newToken5(secret,'me@me.com', 'user', params['remoteAdddress']))
   
   let ans:any = await rpc.invoke('api', 'multiply',  params  )

   //console.log(ans[0])//token
   log.warn(ans[1])
}

