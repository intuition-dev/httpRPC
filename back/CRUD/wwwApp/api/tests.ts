
console.log('tests script')

declare var QUnit
declare var loadQunit
declare var depp
declare var DeventBus


let pro = loadQunit()
pro.then(function(){
   console.log('qunit loaded')

   QUnit.start()
   new TestVM1()
})//pro

class TestVM1 {
   static done1
   static done2
   static assert

   constructor () {
      console.log('testVM1')
      
      DeventBus.addListener('onUData', TestVM1.onVM1Data)
      depp.define({'vm1':'/api/UsersVM.js'})
      depp.require('vm1')

      QUnit.test( "hello test", function( assert_ ) {
         TestVM1.assert = assert_
         TestVM1.done1 = assert_.async()
         //TestVM1.done2 = assert_.async()
      })
   }//()

   static onVM1Data(data) {
      console.log('data')
      TestVM1.assert.ok( true, "Passed!" )
      TestVM1.done1()
   }//()
}


