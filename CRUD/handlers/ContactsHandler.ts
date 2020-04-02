
import { TerseB } from "terse-b/terse-b"

import { BaseRPCMethodHandler } from 'http-rpc/lib/Serv'

import { FakeDL } from "../dl/FakeDL"
const dl = new FakeDL()

export class ContactsHandler extends BaseRPCMethodHandler {
  
   log:any = new TerseB(this.constructor.name)
   
   constructor(db?) {
      super(1,1)// cache
   }

   contacts(params) {

      this.log.info(params)

      let ret  = dl.getData()
      return ret
   }//()


}//class