
console.log('UI:')

declare var depp
declare var List
declare var DeventBus

class UIBinding {
   constructor() {
      this.setupBut()
   }

   setupBut() {
      document.getElementById("srchBut").addEventListener("click", function(){
         var srch = document.getElementById('srchFld').value
         console.log('klk', srch)
         if(UIBinding.userLst) UIBinding.userLst.clear()

         let arg:any ={}
         arg.srch = srch
         arg.o=1
         DeventBus.dispatch('uFetch', arg)
      })

      DeventBus.addListener('onUData', UIBinding.onData)

   }//()

   static userLst
   static onData(data) {
      console.log('onData')
      let options = {
         valueNames: [ 'fname', 'lname', 'email','phone' ],
         item: 
            `<tr> 
               <td class="fname"></td>
               <td class="lname"></td>
               <td class="email"></td>
               <td class="phone"></td>
            </tr>`
         }      
      
      if(!(UIBinding.userLst)) {
         let userLstEl = document.getElementById('userLst')
         UIBinding.userLst = new List(userLstEl, options, data)
      }
      else { //list exists
         UIBinding.userLst.add(data)
      }
      console.log('listjs')
   }//()

}

depp.require(['DOM', 'listjs', 'eventBus'], function() {
   console.log('ready')
   new UIBinding()
}) 
 
function testE1() {

   depp.require('eventBus', function(){
     console.log('tst:')

     // data before
     DeventBus.dispatch('dataB4', 'oh hi b4')
     DeventBus.dispatch('dataB4', 'oh hi b4')
     DeventBus.addListener('dataB4', function(data) {
       console.log('b4', data)
     })

     // data after
     DeventBus.addListener('dataAf', function(data) {
       console.log('af:', data)
     })
     DeventBus.dispatch('dataAf', 'oh hi af')
     DeventBus.dispatch('dataAf', 'oh hi af')   

   })
 }//()

