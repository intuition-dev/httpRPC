
var bunyan = require('bunyan')
var bformat = require('bunyan-format2')  
var formatOut = bformat({ outputMode: 'short' })
var log = bunyan.createLogger({src: true, stream: formatOut, name: "load"})

import { CDB } from "./db/CDB"

const db = new CDB()

db.load1M()
