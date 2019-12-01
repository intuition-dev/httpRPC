
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

   multiply(params) {
      let a = params.a
      let b = params.b

      return multiply(a,b)
   }//()

}//c
const h1 = new Handler1(1)
service.routeRPC('api', h1 ) // route to handler

// service.setLogger(handleLog, 0)

// Example: (should be class)
function multiply(a,b) {
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