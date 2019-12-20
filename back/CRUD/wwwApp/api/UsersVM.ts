


const rpc = new httpRPC('http', 'localhost', 8888)

rpc.invoke('api', 'multiply', {a:5, b:2})
   .then(function(resp) {
      console.log(resp)
})

script(src='https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js')

// lib from CDN w/ version:
script(src='https://cdn.jsdelivr.net/npm/http-rpc@0.6.0/browser/httpRPC.js')

