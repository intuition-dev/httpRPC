"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0
// NOTE: You can extend these classes!
var express_1 = require("express");
var lz_string_1 = require("lz-string");
var URL = require('url');
var serveStatic = require('serve-static');
//log
var bunyan_1 = require("bunyan");
var bunyan_format2_1 = require("bunyan-format2");
var formatOut = bunyan_format2_1["default"]({ outputMode: 'short' });
var log = bunyan_1["default"].createLogger({ src: true, stream: formatOut, name: "Serv" });
var CustomCors = /** @class */ (function () {
    function CustomCors(validOrigins) {
        return function (request, response, next) {
            var origin = request.get('origin');
            var origin2 = request.headers.origin;
            if (!origin) {
                return next();
            }
            var approved = false;
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
    CustomCors.getReqAsOrigin = function (req) {
        var proto = req.connection.encrypted ? 'https' : 'http';
        var host = req.hostname;
        var original = req.originalUrl;
        log.info(original);
        var origin = proto + '://' + host;
        return origin;
    };
    return CustomCors;
}()); //class
exports.CustomCors = CustomCors;
/*
Handler class
This is called by the RPC router
*/
var BaseRPCMethodHandler = /** @class */ (function () {
    /**
     * You likely want browser cache to be a bit larger than edge cache
     * @param broT browser cache
     * @param cdnT  CDN/edge cache
     */
    function BaseRPCMethodHandler(broT, cdnT) {
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
    BaseRPCMethodHandler.prototype._ret = function (resp, result) {
        var ret = {}; // new return
        ret.result = result;
        resp.setHeader('Cache-Control', this.cache);
        resp.setHeader('x-intu-ts', new Date().toISOString());
        //let json = JSON.stringify(ret)
        if (this.DEBUG)
            log.warn(ret);
        // const r:string = lz.compress(json)
        resp.json(ret);
    }; //()
    /**
     * @param resp
     * @param msg
     * @param broT careful: defaults to 1, maybe 0 is best for your cache
     * @param cdnT careful: defaults to 1, maybe 0 is best for your cache
     */
    BaseRPCMethodHandler.prototype._retErr = function (resp, msg) {
        if ((!msg) || msg.length < 1)
            throw new Error('no message');
        log.warn(msg);
        var ret = {}; // new return
        ret.errorLevel = -1;
        ret.errorMessage = msg;
        resp.setHeader('Cache-Control', this.cache);
        resp.setHeader('x-intu-ts', new Date().toISOString());
        resp.json(ret);
    }; //()
    /**
     * In the background this method dynamically invokes the called method
     * @param req
     * @param resp
     */
    BaseRPCMethodHandler.prototype.handleRPC = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var THIZ, method, qstr, compressed, str, params, ans, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this)
                            throw new Error('bind of class instance needed');
                        THIZ = this;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        qstr = URL.parse(req.url, true).query;
                        compressed = qstr['p'];
                        str = lz_string_1["default"].decompressFromEncodedURIComponent(compressed);
                        if (THIZ.DEBUG)
                            log.info(str);
                        params = JSON.parse(str);
                        method = params.method;
                        if (typeof THIZ[method] != 'function') {
                            this._retErr(res, 'no such method ' + method);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, THIZ[method](params)];
                    case 2:
                        ans = _a.sent();
                        if (THIZ.DEBUG)
                            log.warn(method, ans);
                        THIZ._ret(res, ans);
                        return [3 /*break*/, 4];
                    case 3:
                        err_1 = _a.sent();
                        log.warn('c', err_1);
                        THIZ._retErr(res, method);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        });
    }; //()
    return BaseRPCMethodHandler;
}()); //class
exports.BaseRPCMethodHandler = BaseRPCMethodHandler;
var LogHandler = /** @class */ (function (_super) {
    __extends(LogHandler, _super);
    function LogHandler(foo, bro, cdn) {
        var _this = _super.call(this, bro, cdn) || this;
        _this._foo = foo;
        return _this;
    }
    LogHandler.prototype.log = function (params) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: // 'log', 'log'
                    return [4 /*yield*/, this._foo(params)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, 'OK'];
                }
            });
        });
    };
    return LogHandler;
}(BaseRPCMethodHandler)); //()
/**
 * Should be single socket for everything.
 * Don't use methods here for Upload, use the expInst property to do it 'manually'
 */
var Serv = /** @class */ (function () {
    /**
     * @param origins An array of string that would match a domain. So host would match localhost. eg ['*']
     */
    function Serv(origins) {
        this._origins = origins;
        // does it already exist?
        if (Serv._expInst)
            throw new Error('one instance of express app already exists');
        log.info('Allowed >>> ', origins);
        var cors = new CustomCors(origins);
        Serv._expInst = express_1["default"]();
        // Serv._expInst.set('trust proxy', true)
        Serv._expInst.use(cors);
    } //()
    Serv.prototype.setLogger = function (foo, bro, cdn) {
        this.routeRPC('log', new LogHandler(foo, bro, cdn));
    };
    /**
     * Route to a handler
     * @param route
     * @param foo
    */
    Serv.prototype.routeRPC = function (route, handler) {
        var r = '/' + route;
        Serv._expInst.get(r, handler.handleRPC.bind(handler));
    };
    /**
     * Set the cache header and time
     *
     * @param path
     * @param broT Bro(wser) cache time in seconds- 1800
     * @param cdnT CDN /one less in seconds- 1799
     * The longer the better! Max is 1 year in seconds ( 60*60*24*364 ). You can flush CDN at CDN and flush browser at browser.
     */
    Serv.prototype.serveStatic = function (path, broT, cdnT) {
        if (!broT)
            broT = 24 * 60 * 60 + 1;
        if (!cdnT)
            cdnT = 24 * 60 * 60; // cdn is less than bro
        log.info('Serving root:', path, broT, cdnT);
        //filter forbidden
        Serv._expInst.use(function (req, res, next) {
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
    }; //()
    /**
     * Start server
     * @param port
     */
    Serv.prototype.listen = function (port) {
        Serv._expInst.listen(port, function () {
            log.info('services running on port:', port);
        });
    };
    return Serv;
}()); //class
exports.Serv = Serv;
