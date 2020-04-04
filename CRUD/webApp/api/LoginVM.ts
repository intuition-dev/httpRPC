declare var defEventFlux

import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.3/eventFlux/EventFlux.js';
new EventFlux(); // also creates global defEventFlux var
// req for rpc
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.4.10/webApp/httpRPC.js';

export class LoginVM {

    static entity ='login'
    
    static rpc
    constructor() {
        console.log('cons');
        HttpRPC.regInst('vm', this)
        let THIZ = this;
        LoginVM.rpc = new HttpRPC('http', 'localhost', 8888);
        defEventFlux.register('login-check', this.checkLogin);
    } //()
    
    checkLogin(args) {
        console.log('fetch', args);
        LoginVM.rpc.invoke('api', 'login', args)
            .then(function (resp) {
                if(resp[1])
                LoginVM.doLogin(resp);
                else
                    defEventFlux.doAction('login-fail', 'FAIL') 
            }).catch(function(err) {
                console.warn('goFetch err ', err);
                defEventFlux.doAction('login-fail', 'FAIL') 
            })
    } //()

    static doLogin(res) {
        console.log('got data', res)
        defEventFlux.doAction('login-ok','OK')

    }
    
    isIn() { 
       return LoginVM.rpc.hasJWToken()
    }


} //class
new LoginVM();
