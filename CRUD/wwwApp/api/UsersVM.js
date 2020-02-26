import { httpRPC } from '/api/httpRPC.js'

export class UsersVM {
    constructor() {
        console.log('cons')
        this.rpc = new httpRPC('http', 'localhost', 8888);
        this.fetch('a', 1);
        let THIZ = this
        depp.require(['lz-defEventBus'], function() {

        defEventBus.addListener('uFetch', function(arg) {
            depp.require(['lz-defEventBus'], function() {
            THIZ.fetch(arg.srch, arg.o)
            })
        })
    })
    }

    fetch(srch, o) {
        var _rpcS = Date.now();
        let args = {};
        args['srch'] = srch;
        args['o'] = o;
        console.log('fetch', args);
        this.rpc.invoke('uapi', 'srch', args)
            .then(function(resp) {
                console.log('here')
                defEventBus.dispatch('onUData', resp)
            })
    }

}

new UsersVM()