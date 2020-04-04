import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.3/eventFlux/EventFlux.js';
new EventFlux();
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.4.10/webApp/httpRPC.js';
export class ContactsVM {
    constructor() {
        console.log('cons');
        HttpRPC.regInst('vm', this);
        let THIZ = this;
        ContactsVM.rpc = new HttpRPC('http', 'localhost', 8888);
        this.goFetch();
        defEventFlux.reigster('contacts-get', function (arg) {
            THIZ.goFetch();
        });
    }
    goFetch() {
        let args = {};
        console.log('fetch', args);
        ContactsVM.rpc.invoke('api', 'contacts', args)
            .then(function (resp) {
            console.log('got data');
            defEventFlux.dispatch('contacts-data', resp)
                .catch(function (err) {
                console.warn('goFetch err ', err);
            });
        });
    }
    isIn() {
        return ContactsVM.rpc.hasJWToken();
    }
}
ContactsVM.entity = 'contacts';
new ContactsVM();
