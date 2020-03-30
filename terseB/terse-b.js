"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_format2_1 = __importDefault(require("bunyan-format2"));
class TerseB {
    constructor(name) {
        const PROD = process.env.NODE_ENV;
        let log;
        if (PROD) { // prod
            let formatOut = bunyan_format2_1.default({ outputMode: 'json' });
            log = bunyan_1.default.createLogger({ src: false, level: 31, stream: formatOut, name: name });
        }
        else { // dev
            let formatOut = bunyan_format2_1.default({ outputMode: 'long' });
            log = bunyan_1.default.createLogger({ src: true, stream: formatOut, name: name });
        }
        return log;
    } //()
} //class
exports.TerseB = TerseB;
