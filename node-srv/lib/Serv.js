"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const lz_string_1 = __importDefault(require("lz-string"));
const url_1 = __importDefault(require("url"));
const serveStatic = require('serve-static');
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_format2_1 = __importDefault(require("bunyan-format2"));
const formatOut = bunyan_format2_1.default({ outputMode: 'short' });
const log = bunyan_1.default.createLogger({ src: true, stream: formatOut, name: "Serv" });
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
                    approved = true;
            });
            if (approved) {
                response.setHeader('Access-Control-Allow-Origin', origin);
                return next();
            }
            response.status(403).end();
        };
    }
    static getReqAsOrigin(req) {
        let proto = req.connection.encrypted ? 'https' : 'http';
        const host = req.hostname;
        let original = req.originalUrl;
        log.info(original);
        let origin = proto + '://' + host;
        return origin;
    }
}
exports.CustomCors = CustomCors;
class BaseRPCMethodHandler {
    constructor(broT, cdnT) {
        this.DEBUG = false;
        if (!broT)
            broT = 1;
        if (!cdnT)
            cdnT = 1;
        this.cache = 'public, max-age=' + broT + ', s-max-age=' + cdnT;
    }
    _ret(resp, result) {
        const ret = {};
        ret.result = result;
        resp.setHeader('Cache-Control', this.cache);
        resp.setHeader('x-intu-ts', new Date().toISOString());
        let json = JSON.stringify(ret);
        if (this.DEBUG)
            log.warn(json);
        resp.status(200).send(lz_string_1.default.compress(json));
    }
    _retErr(resp, msg) {
        if ((!msg) || msg.length < 1)
            throw new Error('no message');
        log.warn(msg);
        const ret = {};
        ret.errorLevel = -1;
        ret.errorMessage = msg;
        resp.setHeader('Cache-Control', this.cache);
        resp.setHeader('x-intu-ts', new Date().toISOString());
        let json = JSON.stringify(ret);
        resp.status(200).send(lz_string_1.default.compress(json));
    }
    async handleRPC(req, res) {
        if (!this)
            throw new Error('bind of class instance needed');
        const THIZ = this;
        let method;
        let qstr;
        try {
            qstr = url_1.default.parse(req.url, true).query;
            let compressed = qstr['p'];
            let str = lz_string_1.default.decompressFromEncodedURIComponent(compressed);
            if (THIZ.DEBUG)
                log.info(str);
            const params = JSON.parse(str);
            method = params.method;
            if (typeof THIZ[method] != 'function') {
                this._retErr(res, 'no such method ' + method);
                return;
            }
            const ans = await THIZ[method](params);
            if (THIZ.DEBUG)
                log.warn(method, ans);
            THIZ._ret(res, ans);
        }
        catch (err) {
            log.warn('c', err);
            THIZ._retErr(res, method);
        }
    }
}
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
}
class Serv {
    constructor(origins) {
        this._origins = origins;
        if (Serv._expInst)
            throw new Error('one instance of express app already exists');
        log.info('Allowed >>> ', origins);
        const cors = new CustomCors(origins);
        Serv._expInst = express_1.default();
        Serv._expInst.use(cors);
    }
    setLogger(foo, bro, cdn) {
        this.routeRPC('log', new LogHandler(foo, bro, cdn));
    }
    routeRPC(route, handler) {
        const r = '/' + route;
        Serv._expInst.get(r, handler.handleRPC.bind(handler));
    }
    serveStatic(path, broT, cdnT) {
        if (!broT)
            broT = 30 * 60;
        if (!cdnT)
            cdnT = (30 * 60) - 1;
        log.info('Serving root:', path, broT, cdnT);
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
                if (path.endsWith('.yaml') || path.endsWith('.json')) {
                    res.setHeader('Cache-Control', 'public, max-age=' + 300 + ', s-max-age=' + 299);
                }
                res.setHeader('x-intu-ts', new Date().toISOString());
            }
        }));
    }
    listen(port) {
        Serv._expInst.listen(port, () => {
            log.info('services running on port:', port);
        });
    }
}
exports.Serv = Serv;
