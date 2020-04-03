
import { TerseB } from "terse-b/terse-b"

import { BaseRPCMethodHandler } from 'http-rpc/lib/Serv'

import { FakeDL } from "../dl/FakeDL"
const dl = new FakeDL()

export class LoginHandler extends BaseRPCMethodHandler {
  
   log:any = new TerseB(this.constructor.name)

   constructor(db?) {
      super(1,1)// cache
   }

   login(params) {

      this.log.info(params)

      let valid  = dl.isValidPswd(params['email'], null)

      let jwt
      if (valid)
         jwt = dl.makeToken(params['email'],params['remoteAddress'] )
      else jwt = dl.makeOldToken()

      return [jwt, valid]
   }//()

   logout() {

   }

}//class