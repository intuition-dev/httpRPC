const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "UserHandler"})

import { getData } from "./FakeDBCall"
import { BaseRPCMethodHandler } from 'http-rpc/lib/Serv'

log.info('hand')

export class UserHandler extends BaseRPCMethodHandler {
  
   
   constructor(db?) {
      super(1,1)// cache
   }

   srch(params) {

      log.info(params)

      let ret  = getData()
      return ret
   }//()


}//class