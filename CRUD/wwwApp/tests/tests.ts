
console.log('tests script')

declare var QUnit
declare var loadQunit
declare var depp
declare var DeventBus
declare var chance

var pro = loadQunit()
pro.then(function(){
   console.log('qunit loaded')

   QUnit.start()
   new TestVM1()
})//pro

class TestVM1 {
   static done1
   static done2
   static assert
   static listener

   constructor () {
      console.log('testVM1')
      
      TestVM1.listener = DeventBus.addListener('onUData', TestVM1.onVM1Data)
      depp.define({'vm1':'/api/UsersVM.js'})
      depp.require(['vm1', 'chance', 'RPC' ])

      QUnit.test( "hello test", function( assert_ ) {
         TestVM1.assert = assert_
         TestVM1.done1 = assert_.async()
         TestVM1.done2 = assert_.async()
      })
   }//()

   static onVM1Data(data) {
      console.log('data')
      TestVM1.assert.ok( true, "Passed!" )
      TestVM1.done1()
      
      // test 2
      DeventBus.removeListener( TestVM1.listener )
      let arg:any ={}
      arg.srch = chance.character({ alpha: true }) + chance.character({ alpha: true })
      arg.o=1
      DeventBus.dispatch('uFetch', arg)
      DeventBus.addListener('onUData', TestVM1.onVM2Data)
   }//()

   static onVM2Data(data2) {
      console.log('data2')
      TestVM1.assert.ok( true, "Passed!" )
      TestVM1.done2()
      // in here we can call RPC to send data of duration, browser and ip
      // rpc send metrics
      console.log('TestsDone')
   }//()
   
}//class


