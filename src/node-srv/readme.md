
# HTTP-RPC

#### Inspired by JSON-RPC and gRPC, but works over HTTP: specifically it works with a browser over http protocol.

#### Marketing: Please star our main project here:
- https://github.com/INTUITION-dev/INTU

## HTTP-RPC

Inspired by JSON-RPC, but works over HTTP: specifically it works with a browser over http protocol. Google FireBase use gRPC, based on protocol buffers.  Other alternatives are REST and GraphQL.
HTTP-RPC leverages browsers fetch() command. As a plus, it has built in edge cache: it can use both browser cache and CDN cache.


## Features 

- Handles CORS and does so in a single trip - no preflight or double request
- Built in error handling
- Handles user/password (or any name-value-pair) auth as well as token
- Has a field for the calling entity (or page or screen), so you know what screen/page called the RPC. 
- Can use regular headers for caching at at edge w/ CDN or at the browser.

### Notes
- The https should be provided by the CDN/Edge. It makes for a faster https handshake. Also, some CDN offer QUIC (http v3) protocol.
- Recommended practice is that if you have 2 screens calling same RPC: have 2 distinct RPC handlers back-end, that can later call the
same business logic.

## Questions?
- Open a ticket

# How to use:

### Part I: Server side

Steps:

1. Write a server side method that you want to use. Mostly these are DB CRUD methods, but here is a multiply example, this is the method we will call from the browser:

   ```
   function doMultiply(a,b) {
      return a*b
   }
   ```

2. Write a handler that calls above method. First you'll need to add the package and import :

   ```
   npm add http-rpc
   import { BaseRPCMethodHandler, Serv } from 'http-rpc/node-srv/lib/Serv'
   ```

And an example handler:

   ```
   class Handler1 extends BaseRPCMethodHandler {
      constructor() {
         super(2,1) 
      }

      multiply(params) {
         let a = params.a
         let b = params.b
         return doMultiply(a,b)
      }//()
   }
   ```

Here the doMultiply() calls the method in step 1.
Also our constructor sets the cache to 2,1: the browser will cache for 2 seconds and CDN for 1. You can set this to 0,0.

3. Now we need the http server that will route to the handler(s).

Our service takes an array of approved CORS domains, eg:

   ```
   const service = new Serv(['*'])
   const h1 = new Handler1()
   service.routeRPC('api', h1 ) // route to handler
   service.listen(8888)
   ```

A route /api will be handled by Handler1!
We now have a running service with one handler and that handler has one method 'multiply' (that is then passed on to the business layer).


### Part II: Client side

1. In the browser, load the lib(s from a CDN:

   ```
   <script src="https://cdn.jsdelivr.net/npm/lz-string@1.4.4/libs/lz-string.min.js"></script>
   <script src="https://cdn.jsdelivr.net/gh/INTUITION-dev/httpRPC@1.1.2/src/node-srv/browser/httpRPC.min.js"></script>
   ```

NOTE: lz-string is a compression library used by http-rpc, so it needs to be loaded before:
NOTE: You have to load polyfills for fetch and promise as needed to support ie11 and such.

2. Now call your remote method:

   ```
   const rpc = new httpRPC('http', 'localhost', 8888)

   rpc.invoke('api', 'multiply', {a:5, b:2})
      .then(function(resp) {
         console.log(resp)
      })
   ```

Constructor is self explanatory. 
The invoke() method takes the route ('api') and a method in the handler to call ('multiply'), plus the arguments( 5 and 2).
It returns a promise with a result.

Other: of course you'd likely have more than one handler, and each handler would handle more than one method.

So that is how to use http-rpc in 5 steps.


### Demo

[<img src="http://img.youtube.com/vi/FYZqz-AvwRo/0.jpg" width="400"/>](http://www.youtube.com/watch?v=FYZqz-AvwRo)



### Aside: Why 

For me, RPC solves an organizational issue like so: I manage a back-end team, and a front-end team.
The back-end seemed to be hands-of with any issues related to front-end calling remote services.

So in order to get the back-end team engaged, I made the back-end team responsible for the client side service|api calls to the backend.
Back-end team is responsible for documenting client side API calls, testing, fail-over, handling-time outs, encoding protocol(eg: JSON | MsgPack), versioning, 
capacity planing, performance, etc. If we use Swift, Kotlin, .js on front-end; the back-end team has to write an API in that language. </br>
The front-end developers have a tough job w/ the front-end, among other thing due to a large number of libraries.  So the back-end team helps by writing the API calls
for each and every screen | page.
And the back-end team even help support the ViewModel, reducing any impedance that maybe related to back-end entity mapping. In general if the API call is slow or any issue,
then it is the back-end team's problem. 

So the logical next step for the back-end team: start writing helper classes to call the remote service, hence HTTP-RPC+ was born, as a result of back-end 
team being responsible for the Client side calls.

We did try JSON-RPC, but that had issues over HTTP and world wide web. So we mimicked that and built HTTP-RPC+. There is a node.js reference implementation, and also a Java port.

#### Other RPC links:
- https://thomashunter.name/posts/2017-09-27-is-it-time-to-replace-rest-with-rpc
- https://dzone.com/articles/a-quick-introduction-to-http-rpc


#### More

This repo houses other backend/full stack code and examples