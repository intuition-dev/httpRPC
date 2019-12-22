console.log('uvm');
depp.require(['RPC', 'eventBus']);
var UsersVM = (function () {
    function UsersVM() {
        this.rpc = new httpRPC('http', 'localhost', 8888);
        this.fetch('a', 1);
    }
    UsersVM.prototype.fetch = function (srch, o) {
        console.log('fetch');
        var _rpcS = Date.now();
        var args = {};
        args['srch'] = srch;
        args['o'] = o;
        this.rpc.invoke('uapi', 'srch', args)
            .then(function (resp) {
            console.log(Date.now() - _rpcS, resp);
            DeventBus.dispatch('onUData', resp);
        });
    };
    return UsersVM;
}());
