
import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.2.3/eventFlux/EventFlux.js'
new EventFlux() // makes defEventBus var

// req for rpc
import { httpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.2.1/browser/httpRPC.min.js'

export class UsersVM {

    constructor() {
        console.log('cons')
        let THIZ = this
        
        depp.require(['lz-string'], function() { // after we have lz-string we can RPC
            THIZ.rpc = new httpRPC('http', 'localhost', 8888);
            THIZ.fetch('a', 1);
    
            defEventBus.addListener('uFetch', function(arg) {
                THIZ.fetch(arg.srch, arg.o)
            })

        })//req
    }//

    fetch(srch, o) {
        var _rpcS = Date.now();
        let args = {};
        args['srch'] = srch;
        args['o'] = o;
        console.log('fetch', args);
        this.rpc.invoke('uapi', 'srch', args)
            .then(function(resp) {
                console.log('got data')
                defEventBus.dispatch('onUData', resp)
            })
    }//()

}//class

new UsersVM()