console.log('uvm');
depp.require(['RPC', 'eventBus']);
var UsersVM = (function () {
    function UsersVM() {
        this.rpc = new httpRPC('http', 'localhost', 8888);
        this.fetch('a', 1);
        var THIZ = this;
        DeventBus.addListener('uFetch', function (arg) {
            THIZ.fetch(arg.srch, arg.o);
        });
    }
    UsersVM.prototype.fetch = function (srch, o) {
        var _rpcS = Date.now();
        var args = {};
        args['srch'] = srch;
        args['o'] = o;
        console.log('fetch', args);
        this.rpc.invoke('uapi', 'srch', args)
            .then(function (resp) {
            console.log(Date.now() - _rpcS);
            DeventBus.dispatch('onUData', resp);
        });
    };
    return UsersVM;
}());
depp.require(['eventBus', 'RPC'], function () {
    console.log('ready');
    new UsersVM();
});
