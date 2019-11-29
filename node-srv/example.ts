
const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "mainEx"})

// const URL = require('url')

// from mbake
import { BaseRPCMethodHandler, Serv, iAuth } from './lib/Serv'

let allowedDomains = []
allowedDomains.push('one.com') // get from config.yaml, should never be '*'
allowedDomains.push('two.org') // XXX host or local would match localhost

// makes a configured express instance
const service = new Serv(['*'])

class Handler1 extends BaseRPCMethodHandler {

   //THIZ[method](resp, params)
   multiply(params) {
      let a = params.a
      let b = params.b

      return multiply(a,b)
   }

}//()
const h1 = new Handler1(1)
service.routeRPC('api', h1 )
service.setLogger(handleLog, 0)

// should be class - used by multiple routes
function multiply(a,b) {
   return a*b
}

function handleLog( params) {
   log.info(params)
   log.info(params.msg)
}

service.listen(8888)

// example impl of Auth
class CheckX implements iAuth {
   auth(user:string, pswd:string, resp?, ctx?):Promise<string> {
      return new Promise( function (resolve, reject) {
         // check db to see if user and password match and then return level
         return resolve('OK') //or
      })
   }//()
}//class