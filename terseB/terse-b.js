"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
class TerseB {
    constructor(name) {
        let log;
        if (true) // prod
            log = bunyan.createLogger({ src: false, level: 31, stream: formatOut, name: name });
        else // log all
            log = bunyan.createLogger({ src: true, stream: formatOut, name: name });
        return log;
    } //()
} //class
exports.TerseB = TerseB;
