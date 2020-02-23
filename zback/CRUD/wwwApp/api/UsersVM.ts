
declare var httpRPC
declare var depp
declare var DeventBus

console.log('uvm')

class UsersVM {
   rpc = new httpRPC('http', 'localhost', 8888)
   
   constructor() {
      this.fetch('a',1)// initial load
      let THIZ = this
      DeventBus.addListener('uFetch', function(arg) {
         THIZ.fetch(arg.srch,arg.o)
      })
   }

   fetch(srch, o) {    
      var _rpcS = Date.now()
      let args = {}
      args['srch'] = srch
      args['o'] = o
      console.log('fetch', args)  

      this.rpc.invoke('uapi', 'srch', args)
      .then(function(resp) {
         //console.log(Date.now() - _rpcS)
         DeventBus.dispatch('onUData', resp)
   })
   }//()

}//class

depp.require(['RPC'], function() {
   console.log('ready')
   new UsersVM()
}) 
