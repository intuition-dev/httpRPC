console.log('uvm');
class UsersVM {
    constructor() {
        this.rpc = new httpRPC('http', 'localhost', 8888);
        this.fetch('a', 1);
        let THIZ = this;
        DeventBus.addListener('uFetch', function (arg) {
            THIZ.fetch(arg.srch, arg.o);
        });
    }
    fetch(srch, o) {
        var _rpcS = Date.now();
        let args = {};
        args['srch'] = srch;
        args['o'] = o;
        console.log('fetch', args);
        this.rpc.invoke('uapi', 'srch', args)
            .then(function (resp) {
            console.log(Date.now() - _rpcS);
            DeventBus.dispatch('onUData', resp);
        });
    }
}
depp.require(['eventBus', 'RPC', 'trace'], function () {
    console.log('ready');
    new UsersVM();
});
