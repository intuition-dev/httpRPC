"use strict";
// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorhandler = require('errorhandler');
const express_1 = __importDefault(require("express"));
const lz_string_1 = __importDefault(require("lz-string"));
const URL = require('url');
var http = require('http');
const serveStatic = require('serve-static');
const terse_b_1 = require("terse-b/terse-b");
const log = new terse_b_1.TerseB("ServTS");
class CustomCors {
    constructor(validOrigins) {
        return (request, response, next) => {
            const origin = request.get('origin');
            const origin2 = request.headers.origin;
            if (!origin) {
                return next();
            }
            let approved = false;
            validOrigins.forEach(function (ori) {
                if (ori == '*')
                    approved = true;
                if (origin.includes(ori))
                    approved = true; // allow on string match
            });
            if (approved) {
                response.setHeader('Access-Control-Allow-Origin', origin);
                return next();
            }
            //else
            response.status(403).end();
        };
    } //()
    static getReqAsOrigin(req) {
        let proto = req.socket.encrypted ? 'https' : 'http';
        const host = req.hostname;
        let original = req.originalUrl;
        log.info(original);
        let origin = proto + '://' + host;
        return origin;
    }
} //class
exports.CustomCors = CustomCors;
/*
Handler class
This is called by the RPC router
*/
class BaseRPCMethodHandler {
    /**
     * You likely want browser cache to be a bit larger than edge cache
     * @param broT browser cache
     * @param cdnT  CDN/edge cache
     */
    constructor(broT, cdnT) {
        this.DEBUG = false;
        if (!broT)
            broT = 1;
        if (!cdnT)
            cdnT = 1;
        this.cache = 'public, max-age=' + broT + ', s-max-age=' + cdnT;
    }
    /**
     * @param resp
     * @param result
     * @param broT careful: defaults to 1, should be larger than cdnT, maybe 0 is best for your cache
     * @param cdnT careful: defaults to 1, maybe 0 is best for your cache
     */
    _ret(resp, result) {
        const ret = {}; // new return
        ret.result = result;
        resp.setHeader('Cache-Control', this.cache);
        resp.setHeader('x-intu-ts', new Date().toISOString());
        //let json = JSON.stringify(ret)
        if (this.DEBUG)
            log.warn(ret);
        // const r:string = lz.compress(json)
        resp.json(ret);
    } //()
    /**
     * @param resp
     * @param msg
     * @param broT careful: defaults to 1, maybe 0 is best for your cache
     * @param cdnT careful: defaults to 1, maybe 0 is best for your cache
     */
    _retErr(resp, msg) {
        if ((!msg) || msg.length < 1)
            throw new Error('no message');
        log.warn(msg);
        const ret = {}; // new return
        ret.errorLevel = -1;
        ret.errorMessage = msg;
        resp.setHeader('Cache-Control', this.cache);
        resp.setHeader('x-intu-ts', new Date().toISOString());
        resp.json(ret);
    } //()
    /**
     * In the background this method dynamically invokes the called method
     * @param req
     * @param resp
     */
    async handleRPC(req, res) {
        if (!this)
            throw new Error('bind of class instance needed');
        const THIZ = this;
        let method;
        let qstr;
        try {
            qstr = URL.parse(req.url, true).query;
            let compressed = qstr['p'];
            let str = lz_string_1.default.decompressFromEncodedURIComponent(compressed);
            if (THIZ.DEBUG)
                log.info(str);
            const params = JSON.parse(str);
            const ip = res.socket.remoteAddress;
            params.remoteAddress = ip;
            method = params.method;
            if (typeof THIZ[method] != 'function') {
                this._retErr(res, 'no such method ' + method);
                return;
            }
            //invoke the method request
            const ans = await THIZ[method](params);
            if (THIZ.DEBUG)
                log.warn(method, ans);
            THIZ._ret(res, ans);
        }
        catch (err) {
            log.warn('c', err);
            THIZ._retErr(res, method);
        }
    } //()
} //class
exports.BaseRPCMethodHandler = BaseRPCMethodHandler;
class LogHandler extends BaseRPCMethodHandler {
    constructor(foo, bro, cdn) {
        super(bro, cdn);
        this._foo = foo;
    }
    async log(params) {
        await this._foo(params);
        return 'OK';
    }
} //()
/**
 * Should be single socket for everything.
 * Don't use methods here for Upload, use the expInst property to do it 'manually'
 */
class Serv {
    /**
     * @param origins An array of string that would match a domain. So host would match localhost. eg ['*']
     * @param urlK How many K for url + header. Defults to 16 (K)
     */
    constructor(origins, urlK) {
        // https://github.com/nodejs/node/issues/24692#issuecomment-595560987
        // https://github.com/expressjs/express/issues/4131
        if (!urlK)
            urlK = 16;
        process.on('unhandledRejection', (error, promise) => {
            log.warn(' Oh Lord! We forgot to handle a promise rejection here: ', promise);
            log.warn(' The error was: ', error);
        });
        this._origins = origins;
        // does it already exist?
        if (Serv._expInst)
            throw new Error('one instance of express app already exists');
        log.info('Allowed >>> ', origins);
        const cors = new CustomCors(origins);
        Serv._expInst = express_1.default();
        // url + headers defaults to 8 K, here we set it
        http.createServer({ maxHeaderSize: urlK * 1024 }, Serv._expInst);
        // Serv._expInst.set('trust proxy', true)
        Serv._expInst.use(cors);
        Serv._expInst.use(errorhandler({ dumpExceptions: true, showStack: true }));
    } //()
    setLogger(foo, bro, cdn) {
        this.routeRPC('log', new LogHandler(foo, bro, cdn));
    }
    /**
     * Route to a handler
     * @param route
     * @param foo
    */
    routeRPC(route, handler) {
        const r = '/' + route;
        Serv._expInst.get(r, handler.handleRPC.bind(handler));
    }
    /**
     * Set the cache header and time
     *
     * @param path
     * @param broT Bro(wser) cache time in seconds- 1800
     * @param cdnT CDN /one less in seconds- 1799
     * The longer the better! Max is 1 year in seconds ( 60*60*24*364 ). You can flush CDN at CDN and flush browser at browser.
     */
    serveStatic(path, broT, cdnT) {
        if (!broT)
            broT = 24 * 60 * 60 + 1;
        if (!cdnT)
            cdnT = 24 * 60 * 60; // cdn is less than bro
        log.warn('Serving root:', path, broT, cdnT);
        //filter forbidden
        Serv._expInst.use((req, res, next) => {
            if (req.path.endsWith('.ts') || req.path.endsWith('.pug')) {
                res.status(403).send('forbidden');
            }
            else
                next();
        });
        Serv._expInst.use(serveStatic(path, {
            setHeaders: function (res, path) {
                if (serveStatic.mime.lookup(path) === 'text/html') { }
                res.setHeader('Cache-Control', 'public, max-age=' + broT + ', s-max-age=' + cdnT);
                // dynamic is less cache, only 5 minutes
                if (path.endsWith('.yaml') || path.endsWith('.json')) {
                    res.setHeader('Cache-Control', 'public, max-age=' + 300 + ', s-max-age=' + 299);
                }
                res.setHeader('x-intu-ts', new Date().toISOString());
            }
        })); //use
    } //()
    /**
     * Start server
     * @param port
     */
    listen(port) {
        Serv._expInst.listen(port, () => {
            log.warn('services running on port:', port);
        });
    }
} //class
exports.Serv = Serv;
