"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bunyan = require('bunyan');
const bformat = require('bunyan-format2');
const formatOut = bformat({ outputMode: 'short' });
const log = bunyan.createLogger({ src: true, stream: formatOut, name: "some name" });
const BaseDBL_1 = require("mbakex/lib/BaseDBL");
const ip = require('ip');
const perfy = require('perfy');
class GDB extends BaseDBL_1.BaseDBL {
    constructor() {
        super();
        this.schema();
    }
    ins(p) {
        let fromInt;
        try {
            fromInt = ip.toLong(p['0']);
        }
        catch (err) {
            console.log(p['0']);
            fromInt = 0;
        }
        this.write(`INSERT INTO geo( fromInt, first, last, cont,
            cou, state, city, 
            lat, long
         )
            VALUES
         ( ?,?,?,?,
           ?,?,?,
           ?,?
         )`, fromInt, p['0'], p['1'], p['2'], p['3'], p['4'], p['5'], p['6'], p['7']);
    }
    schema() {
        this.defCon(process.cwd(), '/dbip.db');
        const exists = this.tableExists('geo');
        if (exists)
            return;
        log.info('.');
        this.write(`CREATE TABLE geo( fromInt, 
         cou, state, city,
         first, last, cont,
         lat, long
         ) `);
        this.write(`CREATE INDEX geoLook ON geo (fromInt, cou, state, city DESC)`);
    }
    get(ip) {
        perfy.start('g');
        const row = this.readOne(`SELECT cou, state, city FROM geo
         WHERE ? >= fromInt
         ORDER BY fromInt DESC 
         LIMIT 1
         `, 68257567);
        console.log(':r:');
        console.log(row);
        let time = perfy.end('g');
        log.info(time);
        return row;
    }
    count() {
        perfy.start('c');
        const row = this.readOne(`SELECT count(*) as count FROM geo `);
        log.info(row);
        let time = perfy.end('c');
        console.log(':t:');
    }
}
exports.GDB = GDB;
