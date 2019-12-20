
# Java Version of HTTP-RPC+

The reference implementation is the node.js version, but here is a Java version. Goal is to work like the reference implementation back-end
and be able to handle same front-end library.

Reference implementation is here: http://http-rpc.mbake.org
You should check the features and note there as this here is just a port.

#### Please star our main project here:
- https://github.com/intuition-dev/INTU


### Server-side: run Main.java

To start the java service, run the Main.java. One way to do that is to import this project into Eclipse IDE.
It is a stand alone http server based on
 https://hc.apache.org/httpcomponents-core-5.0.x and there is no Tomcat or container of any kind.

## Client-side

Of course Java does not run front-end, so you have to run the browser side as javascript from the http-rpc+/web folder, and index.html ( https://github.com/intuition-dev/mbToolBelt/tree/master/http-rpc%2B/web )

So start an http server to run the index.html in that folder. It will make some dummy RPC calls.

In production you should use this front-end:
```https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v3.12.14/http-rpc+/web/httpRPC.min.js ```


### Demo


[<img src="http://img.youtube.com/vi/8YjDsUTDFxo/0.jpg" width="400"/>](http://www.youtube.com/watch?v=8YjDsUTDFxo)


### Code review:

- [HTTP Server's Handler.java](https://github.com/intuition-dev/intu-diversity/blob/master/java-workspace/java-http-rpc%2B/src/org/hrp/http/HSrvHandler.java)
- [RPC/Router.java](https://github.com/intuition-dev/intu-diversity/blob/master/java-workspace/java-http-rpc%2B/src/org/hrp/routes/ScreensRouter.java)
- [Optional CORS  rejection example](https://github.com/intuition-dev/intu-diversity/blob/master/java-workspace/java-http-rpc%2B/src/org/hrp/api/AbstractHSrvHandler.java)

## Questions?
- http://forum.mbake.org
