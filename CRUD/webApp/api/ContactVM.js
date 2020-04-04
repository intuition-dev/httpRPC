import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.3/eventFlux/EventFlux.js';
new EventFlux();
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.4.1/webApp/httpRPC.min.js';
export class ContactsVM {
    constructor() {
        console.log('cons');
        let THIZ = this;
        THIZ.rpc = new HttpRPC('http', 'localhost', 8888);
        this.goFetch();
        defEventFlux.reigster('contacts-get', function (arg) {
            THIZ.goFetch();
        });
    }
    goFetch() {
        let args = {};
        console.log('fetch', args);
        this.rpc.invoke('apis', 'contacts', args)
            .then(function (resp) {
            console.log('got data');
            defEventFlux.dispatch('contacts-data', resp)
                .catch(function (err) {
                console.warn('goFetch err ', err);
            });
        });
    }
    isIn() {
        let token = this.rpc.getItem('jwt');
        if (!token)
            return false;
        return true;
    }
}
ContactsVM.entity = 'contacts';
new ContactsVM();
