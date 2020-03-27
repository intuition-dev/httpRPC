
import { HttpRPC } from './httpRPC.min.js'

const rpc = new HttpRPC('http', 'localhost', 8888)

rpc.setItem('jwt', 'blank')

rpc.invoke('api', 'multiply', {a:5, b:2}, 600 )
   .then(function(resp) {
      console.log(resp[1])
      console.log(resp[0]) //token
 
   })


// Error example: there is no method multiplyXXX
/*
const proErr = rpc.invoke('api','multiplyXXX', {a:5, b:2})
proErr.then(function(resp) {
  console.log(resp)
}).catch(function (err) {
    console.log('err'r)
})
*/

// rpc.log('oh hi')