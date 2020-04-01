
import { TerseB } from "terse-b/terse-b"

import { isValid } from "../bl/FakeDB"
import { BaseRPCMethodHandler } from 'http-rpc/lib/Serv'

import { jwT } from 'http-rpc/lib/jwtUtil'
const JWT = new jwT()

export class LoginHandler extends BaseRPCMethodHandler {
  
   log:any = new TerseB(this.constructor.name)

   constructor(db?) {
      super(1,1)// cache
   }

   login(params) {

      this.log.info(params)

      let ret  = isValid(params['email'], null)




      return ret
   }//()


}//class