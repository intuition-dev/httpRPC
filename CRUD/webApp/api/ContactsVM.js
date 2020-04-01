import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.3/eventFlux/EventFlux.js';
new EventFlux(); // also creates global defEventFlux var
// req for rpc
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.4.1/webApp/httpRPC.min.js';

export class ContactsVM {

    static entity ='contacts'
    
    constructor() {
        console.log('cons');
        let THIZ = this;
        THIZ.rpc = new HttpRPC('http', 'localhost', 8888);
        THIZ.fetch('a', 1);
        defEventFlux.reigster('contacts-get', function (arg) {
            THIZ.fetch(arg.srch, arg.o);
        });
    } //

    fetch(srch, o) {
        let args = {};
        args['srch'] = srch;
        args['o'] = o;
        console.log('fetch', args);
        this.rpc.invoke('apis', 'contacts', args)
            .then(function (resp) {
                console.log('got data');
                defEventFlux.dispatch('contacts-data', resp);
        });
    } //()

} //class
new ContactsVM();
