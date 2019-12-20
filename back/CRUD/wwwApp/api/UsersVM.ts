

console.log('uvm')

depp.require('RPC', init)

function init() {
   console.log('init')
   const rpc = new httpRPC('http', 'localhost', 8888)

   let args = {}
   args['srch'] = 'vic'
   args['o'] = 1
   
   rpc.invoke('uapi', 'srch', args)
      .then(function(resp) {
         console.log(resp)
   })

}

