"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_format2_1 = __importDefault(require("bunyan-format2"));
class TerseB {
    constructor(name) {
        const formatOut = bunyan_format2_1.default({ outputMode: 'short' });
        const DEV = process.env.DEV;
        let log;
        if (!DEV) // prod
            log = bunyan_1.default.createLogger({ src: false, level: 31, stream: formatOut, name: name });
        else { // log all
            log = bunyan_1.default.createLogger({ src: true, stream: formatOut, name: name });
            console.log('log DEV=true', name);
        }
        return log;
    } //()
} //class
exports.TerseB = TerseB;
