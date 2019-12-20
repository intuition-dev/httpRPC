const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "UserHandler"})

import { CDB } from "../db/CDB"
import { BaseRPCMethodHandler } from 'http-rpc/node-srv/lib/Serv'

log.info('hand')

export class UserHandler extends BaseRPCMethodHandler {
  
    _db:CDB
   
   constructor(db) {
      super(2,2)
      this._db = db
   }

   pageViews(params) {

      log.info(params)

      let srch = params.srch
      let o:number = params.o

      let ret  = this._db.srchWpage(srch, o)
      return ret
   }//()


}//class