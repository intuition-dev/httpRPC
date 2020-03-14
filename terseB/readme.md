#terse-b: Bunyan lib that is terse to use.

I noticed my log files were getting large. Also, I need loggin in each file. So I need something terse without to many LOC.

If node env is  'DEV=true' it will log all, else only above INFO.

eg: `DEV=true node index.js`

If you don't set above during DEV, you won't see the logs!

Takes argument for class to get name:

```
    import { TerseB } from "./terse-b"

    class C {

        log:any = new TerseB(this.constructor.name)

```

See, 2 lines to set up logging, import and a decaration. In .js don't use `:any`.
