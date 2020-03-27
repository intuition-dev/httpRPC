"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan_1 = __importDefault(require("bunyan"));
const bunyan_format2_1 = __importDefault(require("bunyan-format2"));
class TerseB {
    constructor(name) {
        const DEV = process.env.DEV;
        let log;
        if (!DEV) { // prod
            let formatOut = bunyan_format2_1.default({ outputMode: 'bunyan' });
            log = bunyan_1.default.createLogger({ src: false, level: 31, stream: formatOut, name: name });
        }
        else { // dev
            let formatOut = bunyan_format2_1.default({ outputMode: 'long' });
            log = bunyan_1.default.createLogger({ src: true, stream: formatOut, name: name });
            console.log('log DEV=true', name);
        }
        return log;
    } //()
} //class
exports.TerseB = TerseB;
