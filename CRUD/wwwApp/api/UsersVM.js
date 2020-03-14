
import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.2.8/eventFlux/EventFlux.js'
new EventFlux() // makes defEventBus var

// req for rpc
import { HttpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.3.2/browser/httpRPC.min.js'

export class UsersVM {

    constructor() {
        console.log('cons')
        let THIZ = this
        
        THIZ.rpc = new HttpRPC('http', 'localhost', 8888);
        THIZ.fetch('a', 1);

        defEventBus.addListener('uFetch', function(arg) {
            THIZ.fetch(arg.srch, arg.o)
        })

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