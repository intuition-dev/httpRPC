
import { TerseB } from "terse-b/terse-b"

import { getData } from "../bl/FakeDB"
import { BaseRPCMethodHandler } from 'http-rpc/lib/Serv'

import { jwT } from 'http-rpc/lib/jwtUtil'
const JWT = new jwT()

export class ContactsHandler extends BaseRPCMethodHandler {
  
   log:any = new TerseB(this.constructor.name)
   
   constructor(db?) {
      super(1,1)// cache
   }

   contacts(params) {

      this.log.info(params)

      let ret  = getData()
      return ret
   }//()


}//class