
// const URL = require('url')

// from mbake
import { BaseRPCMethodHandler, Serv, iAuth } from './lib/Serv'

let allowedDomains = []
allowedDomains.push('one.com') // get from config.yaml, should never be '*'
allowedDomains.push('two.org') // XXX host or local would match localhost

// pass in the CORS domains 
const service = new Serv(['*'])

// handler
class Handler1 extends BaseRPCMethodHandler {

   constructor() {
      super(2,1) // example of 2 second browser cache and 1 second CDN/edge cache. You can set to 0,0 to disable.
   }

   multiply(params) {
      let a = params.a
      let b = params.b

      return doMultiply(a,b)
   }//()

}//c
const h1 = new Handler1()
service.routeRPC('api', h1 ) // route to handler

// service.setLogger(handleLog, 0)

// RPC Example: (should be class)
function doMultiply(a,b) {
   return a*b
}

/*function handleLog( params) {
   log.info(params)
}*/

service.listen(8888)

/* example impl of Auth
class CheckX implements iAuth {
   auth(user:string, pswd:string, resp?, ctx?):Promise<string> {
      return new Promise( function (resolve, reject) {
         // check db to see if user and password match and then return level
         return resolve('OK') //or
      })
   }//()
}//c
*/