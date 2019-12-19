
var bunyan = require('bunyan')
var bformat = require('bunyan-format2')  
var formatOut = bformat({ outputMode: 'short' })
var log = bunyan.createLogger({src: true, stream: formatOut, name: "crud"})


