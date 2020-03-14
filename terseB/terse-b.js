"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
class TerseB {
    constructor(name) {
        const formatOut = bformat({ outputMode: 'short' });
        const DEV = process.env.DEV;
        let log;
        if (!DEV) // prod
            log = bunyan.createLogger({ src: false, level: 31, stream: formatOut, name: name });
        else { // log all
            log = bunyan.createLogger({ src: true, stream: formatOut, name: name });
            console.log('DEVlog', name);
        }
        return log;
    } //()
} //class
exports.TerseB = TerseB;
