
// const URL = require('url')

// from mbake
import { BaseRPCMethodHandler, Serv } from './lib/Serv'
import { HttpRPC } from "./lib/SrvRPC"

let allowedDomains = []
allowedDomains.push('one.com') // get from config.yaml, should never be '*'
allowedDomains.push('two.org') // XXX host or local would match localhost

// pass in the CORS domains 
const service = new Serv(['*'],4 *1024)

// handler
class Handler1 extends BaseRPCMethodHandler {

   constructor() {
      super(2,1) // example of 2 second browser cache and 1 second CDN/edge cache. You can set to 0,0 to disable.
   }

   async multiply(params) {
      let a = params.a
      let b = params.b

      let result = await doMultiply(a,b)
      return  result
   }//()

}//c
// RPC Example: (should be a class)
async function doMultiply(a,b) {// simulate wait
   return new Promise(function(resolve, reject) {
      setTimeout(function(){
         resolve( a*b )
      },500)
   })

}

const h1 = new Handler1()
service.routeRPC('api', h1 ) // route to handler

service.listen(8888)

// part II: server side

let params = {a:5, b:2}
foo(params)
async function foo(params) {
   const rpc = new HttpRPC('http', 'localhost', 8888)
   let ans = await rpc.invoke('api', 'multiply',  params  )
   console.log(ans)
}

