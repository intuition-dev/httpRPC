"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const terse_b_1 = require("./terse-b");
class C {
    constructor() {
        this.log = new terse_b_1.TerseB(this.constructor.name);
    }
    tst() {
        this.log.info('oh?');
        this.log.warn('War!');
    }
}
new C().tst();
console.log('XXXXXXXXXXXXX');
