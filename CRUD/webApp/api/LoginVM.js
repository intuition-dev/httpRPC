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
    checkLogin(o) {
        console.log(o);
        if (true)
            return;
        let args = {};
        args['srch'] = srch;
        args['o'] = o;
        console.log('fetch', args);
        this.rpc.invoke('uapi', 'srch', args)
            .then(function (resp) {
            console.log('got data');
            defEventFlux.dispatch('onUData', resp);
        });
    } //()
} //class
new LoginVM();
