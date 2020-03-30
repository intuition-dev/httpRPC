
import { TerseB } from "terse-b/terse-b"

import { getData } from "../bl/FakeDB"
import { BaseRPCMethodHandler } from 'http-rpc/lib/Serv'

export class LoginHandler extends BaseRPCMethodHandler {
  
   log:any = new TerseB(this.constructor.name)

   constructor(db?) {
      super(1,1)// cache
   }

   srch(params) {

      log.info(params)

      let ret  = getData()
      return ret
   }//()


}//class