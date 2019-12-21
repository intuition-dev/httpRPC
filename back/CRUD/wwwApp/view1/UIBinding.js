
console.log('UI:')

// var vm = new CrmVM()

depp.require(['DOM', 'listjs'], function() {
    console.log('ready')
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

