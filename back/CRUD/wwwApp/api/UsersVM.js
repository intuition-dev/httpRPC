console.log('uvm');
depp.require('RPC', init);
function init() {
    console.log('init');
    var rpc = new httpRPC('http', 'localhost', 8888);
    var args = {};
    args['srch'] = 'vic';
    args['o'] = 1;
    rpc.invoke('uapi', 'srch', args)
        .then(function (resp) {
        console.log(resp);
    });
}
