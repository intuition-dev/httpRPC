
import { TerseB } from "terse-b/terse-b"

import { BaseRPCMethodHandler } from 'http-rpc/lib/Serv'

import { FakeDL } from "../dl/FakeDL"
const dl = new FakeDL()

export class ContactHandler extends BaseRPCMethodHandler {
  
   log:any = new TerseB(this.constructor.name)
   
   constructor(db?) {
      super(1,1)// cache
   }

   contact(params) {

      this.log.info(params)

      try {
         dl.validateToken(params['token'], params['remoteAddress'])
      } catch(err) {
         this.log.info(err)
         return [null, 'error']
      }

      let ret  = dl.getData()
      return [params['token'], ret]
   }//()


}//class