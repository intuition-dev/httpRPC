
console.log('UI:')

declare var depp
declare var List
declare var DeventBus

class UIBinding {
   constructor() {
   
      DeventBus.addListener('onUData', UIBinding.onData)

   }//()

   static userLst
   static onData(data) {
      console.log('onData')
      let options = {
         valueNames: [ 'fname', 'lname', 'email', 'pass' ],
         item: 
            `<tr> 
               <td class="fname"></td>
               <td class="lname"></td>
               <td class="email"></td>
               <td class="pass"> </td>
            </tr>`
         }      
      
      if(!(UIBinding.userLst)) {
         let userLstEl = document.getElementById('userLst')
         UIBinding.userLst = new List(userLstEl, options, data)
      }
      else { //list exists
         UIBinding.userLst.add(data)
      }
      console.log('listjs', data)
   }//()
}

depp.require(['DOM', 'listjs'], function() {
   console.log('ready')
   new UIBinding()
}) 

