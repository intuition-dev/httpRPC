import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.3/eventFlux/EventFlux.js';
new EventFlux(); // also creates global defEventFlux var
// req for rpc
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.4.1/webApp/httpRPC.min.js';
export class LoginVM {
    constructor() {
        console.log('cons');
        let THIZ = this;
        THIZ.rpc = new HttpRPC('http', 'localhost', 8888);
        defEventFlux.register('login-check', this.checkLogin);
    } //()
    checkLogin(args) {
        console.log('fetch', args);
        this.rpc.invoke('apis', 'login', args)
            .then(function (resp) {
            if (resp[1])
                this.doLogin(resp);
            else
                defEventFlux.doAction('login-fail', 'FAIL');
        });
    } //()
    doLogin(rep) {
        console.log('got data', resp[1]);
        defEventFlux.doAction('login-ok', 'OK');
    }
} //class
LoginVM.entity = 'login';
new LoginVM();
