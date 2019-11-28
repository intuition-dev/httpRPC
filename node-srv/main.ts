
const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "mainEx"})

// const URL = require('url')

// from mbake
import { BaseRPCMethodHandler, Serv, iAuth } from './Serv'

let allowedDomains = []
allowedDomains.push('one.com') // get from config.yaml, should never be '*'
allowedDomains.push('two.org') // XXX host or local would match localhost

// makes a configured express instance
const serviceApp = new Serv(['*'])

class Handler1 extends BaseRPCMethodHandler {

   //THIZ[method](resp, params)
   multiply(res, params) {
      let a = params.a
      let b = params.b

      const resp:any= {} // new response
      resp.result = multiply(a,b)

      log.info(resp)
      this.ret(res, resp, 4, 3)
   }

}//()
const h1 = new Handler1()
serviceApp.routeRPC('api', h1 )
serviceApp.setLogger(handleLog)

// should be class - maybe used by multiple routes
function multiply(a,b) {
   return a*b
}

function handleLog( params) {
   log.info(params)
   log.info(params.msg)
}

serviceApp.listen(8888)

// example impl
class CheckX implements iAuth {
 
   auth(user:string, pswd:string, resp?, ctx?):Promise<string> {
      return new Promise( function (resolve, reject) {
         // check db to see if user and password match and then return level
         return resolve('OK') //or
      })
   }//()
  

}//class