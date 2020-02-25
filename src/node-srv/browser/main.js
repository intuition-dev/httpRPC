
import { httpRPC } from 'https://cdn.jsdelivr.net/npm/http-rpc@2.2.1/browser/httpRPC.min.js'

const rpc = new httpRPC('http', 'localhost', 8888)

rpc.invoke('api', 'multiply', {a:5, b:2}, 600 )
   .then(function(resp) {
      console.log(resp)
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