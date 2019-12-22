
console.log('UI:')

declare var depp
declare var UsersVM
declare var List
declare var DeventBus

class UIBinding {
   static uvm
   constructor() {
      UIBinding.uvm = new UsersVM()
      this.setupBut()
   }

   setupBut() {
      document.getElementById("srchBut").addEventListener("click", function(){
         var srch = document.getElementById('srchFld').value
         console.log('klk', srch)
         if(UIBinding.userLst)
            UIBinding.userLst.clear()

         UIBinding.uvm.fetch(srch, 1)       
      })

      DeventBus.addListener('onUData', UIBinding.onData)

   }//()

   static userLst
   static onData(data) {
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
depp.define({'vm':'/api/UsersVM.js'})
depp.require(['DOM', 'listjs', 'eventBus', 'RPC', 'vm'], function() {
   console.log('ready')
   new UIBinding()
}) 
 

// sets the states of the view, such as buttons, click enabled/grayed and others
function pushState() {

}

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

