"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Load_1 = require("./lib/Load");
const l = new Load_1.Load();
async function foo() {
    await l.import();
}
foo();
