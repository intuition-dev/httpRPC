import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.3/eventFlux/EventFlux.js';
new EventFlux(); // also creates global defEventFlux var
// req for rpc
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.4.1/webApp/httpRPC.min.js';

export class LoginVM {
    constructor() {
        console.log('cons');
        let THIZ = this;
        THIZ.rpc = new HttpRPC('http', 'localhost', 8888);
        defEventFlux.register('checkLogin', this.checkLogin);
    } //()
    
    checkLogin(args) {
        console.log('fetch', args);
        this.rpc.invoke('apis', 'login', args)
            .then(function (resp) {
               
                this.doLoginOK(resp);
        });
    } //()

    doLoginOK(rep) {
        console.log('got data', resp);


    }


} //class
new LoginVM();
