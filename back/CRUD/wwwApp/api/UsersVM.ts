
declare var httpRPC
declare var depp
declare var DeventBus

console.log('uvm')

depp.require(['RPC','eventBus'])

class UsersVM {
   rpc = new httpRPC('http', 'localhost', 8888)
   
   constructor() {
      this.fetch('a',1)
   }

   fetch(srch, o) {    
      console.log('fetch')  
      var _rpcS = Date.now()
      let args = {}
      args['srch'] = srch
      args['o'] = o

      this.rpc.invoke('uapi', 'srch', args)
      .then(function(resp) {
         console.log(Date.now() - _rpcS, resp)
         DeventBus.dispatch('onUData', resp)

   })
   }//()

}//class
