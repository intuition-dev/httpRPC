
# HTTP-RPC+

#### A like JSON-RPC, but works over HTTP: specifically it works with a browser as client over http protocol and leverages world wide web.

This is the reference implementation ( http://http-rpc.mbake.org )

A Java port is here: - http://java-http-rpc.mbake.org


#### Please star our main project here:
- https://github.com/intuition-dev/INTUITION

## HTTP-RPC+

Google's FireBase use gRPC, and there is JSON-RPC and there a more RPC. But JSON-RPC has issues w/ http and world wide web.
So I wrote a reference implementation in nodejs and Java that works with browser.
Also it leverages browsers fetch(), such as fetch cache. It can use both browser cache and CDN edge cache.



## Features 
The + is for the plus features

- Handles CORS and does so in a single trip - no preflight or double request
- Built in error handling
- Handles user/password (or any name-value-pair) auth as well as token
- Has a field for the calling entity (or page or screen), so you know what screen/page called the RPC. 
- Can use regular headers for caching at at edge w/ CDN or at the browser.

## Server-side (node.js)

```
cd node-srv
tsc
node index.js
```

## Client-side

For front-end to run you need a http server, such as Caddyserver, mbake CLI or intu (from npm); but any http server will work.
So start an http server to run the index.html in www folder. It will make some dummy RPC calls.

In production you should use this front-end:
```https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v3.11.15/http-rpc+/web/httpRPC.min.js ```

### Demo

[<img src="http://img.youtube.com/vi/FYZqz-AvwRo/0.jpg" width="400"/>](http://www.youtube.com/watch?v=FYZqz-AvwRo)

### Code review:

- [Server side](https://github.com/intuition-dev/mbCLI/blob/master/src/lib/Serv.ts )
- [Client side lib](https://github.com/intuition-dev/mbToolBelt/blob/master/http-rpc%2B/web/httpRPC.ts)
- [Server side use](https://github.com/intuition-dev/mbToolBelt/blob/master/http-rpc%2B/node-srv/index.ts)
- [Client side use](https://github.com/intuition-dev/mbToolBelt/blob/master/http-rpc%2B/web/main.js)


### Notes
- The https should be provided by the CDN/Edge. It makes for a faster https handshake. Also, some CDN offer QUIC (http v3) protocol.
- Recommended practice is that if you have 2 screens calling same RPC: have 2 distinct RPC handlers back-end, that can later call the
same business logic.
- You can use this with www.INTUITION.DEV's ViewModel, that example is elsewhere on this site.

## Questions?
- http://forum.mbake.org 


### Aside: Why I like RPC vs REST, GraphQL, etc.

For me, RPC solves an organizational issue like so: I manage a back-end team, and a front-end team.
The back-end seemed to be hands-of with any issues related to front-end calling remote services.

So in order to get the back-end team engaged, I made the back-end team responsible for the client side service|api calls to the back end.
Rather than back-end team exposing and documenting back-end service: the back end now write client side API's that call the remote services.
Back-end team is responsible for documenting client side API calls, testing, fail-over, handling-time outs, encoding protocol(eg: JSON | MsgPack), versioning, 
capacity planing, performance, etc. If we use Swift, Kotlin, .js on front-end; the back-end team has to write an API in that language. </br>
The front-end developers have a tough job w/ the front-end, among other thing due to a large number of libraries.  So the back-end team helps by writing the API calls
for each and every screen | page.
And the back-end team even help support the ViewModel, reducing any impedance that maybe related to back-end entity mapping. In general if the API call is slow or any issue,
then it is the back-end team's problem. The front-end team would not even know if the back end team changed the wire protocol, or if a back end table gets renamed, or even if the back end is document based or SQL or an inverted FTS index. The API testing is now end-to-end, and ads a bit of value: you can go trough a user epic using API only( a user logs on, enters some data and then looks at the produced chart - now can be tested by the server side team; no UI).</br>
Same for 3rd parties. Instead of documenting REST | GraphQL: Back-end teams releases libraries on a CDN with API documentation. The 3rd party user would download the lib and use it.
For in-house front end teams, they don't even do that: the back end team writes and owns each and every screen's remote call. At first it was REST with some GraphQL experiments.

So the logical next step for the back-end team: start writing helper classes to call the remote service, hence HTTP-RPC+ was born, as a result of back-end 
team being responsible for the client-side calls.

We did try JSON-RPC, but that had issues over HTTP and world wide web. So we mimicked that and built HTTP-RPC+. There is a node.js reference implementation, and also a Java port.

Other links:
- https://thomashunter.name/posts/2017-09-27-is-it-time-to-replace-rest-with-rpc
- https://dzone.com/articles/a-quick-introduction-to-http-rpc