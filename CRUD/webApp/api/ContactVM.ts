declare var defEventFlux


import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.3/eventFlux/EventFlux.js';
new EventFlux(); // also creates global defEventFlux var
// req for rpc
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.4.9/webApp/httpRPC.min.js';

export class ContactsVM {

    static entity ='contacts'
    
    rpc

    constructor() {
        console.log('cons');
        HttpRPC.regInst('vm', this)
        let THIZ = this;
        THIZ.rpc = new HttpRPC('http', 'localhost', 8888);
        this.goFetch() // populate asap
        
        defEventFlux.reigster('contacts-get', function (arg) {
            THIZ.goFetch();
        });
    } //

    goFetch() {
        let args = {};
      
        console.log('fetch', args);
        this.rpc.invoke('apis', 'contacts', args)
            .then(function (resp) {
                console.log('got data');
                defEventFlux.dispatch('contacts-data', resp)
            .catch(function(err) {
                console.warn('goFetch err ', err);
            })
        })
    } //()

    isIn() { 
        return this.rpc.hasJWToken()
    }

} //class
new ContactsVM();
