import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.14/eventFlux/EventFlux.min.js';
import { HttpRPC } from 'https://cdn.jsdelivr.nethttps://cdn.jsdelivr.net/npm/http-rpc@2.4.24/webApp/httpRPC..min.js';
EventFlux.init();
export class ContactVM {
    constructor() {
        console.log('cons');
        HttpRPC.regInst('vm', this);
        let THIZ = this;
        ContactVM.rpc = new HttpRPC('http', 'localhost', 8888);
        this.goFetch();
        defEventFlux.register('contact-get', function (arg) {
            THIZ.goFetch();
        });
        console.log(ContactVM.rpc.getItem('jwt'));
    }
    goFetch() {
        let args = {};
        console.log('fetch', args);
        ContactVM.rpc.invoke('api', 'contact', args)
            .then(function (resp) {
            console.log('got data');
            defEventFlux.dispatch('contact-data', resp[1]);
        })
            .catch(function (err) {
            console.warn('goFetch err ', err);
        });
    }
    isIn() {
        return ContactVM.rpc.hasJWToken();
    }
}
new ContactVM();
