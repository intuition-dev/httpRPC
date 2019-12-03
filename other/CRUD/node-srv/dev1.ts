
// Bus. Layer test
import { CDB } from './lib/CDB'
const is = require('is')
const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "some name"})
const perfy = require('perfy')


const cdb = new CDB(process.cwd(), '/CDB.sqlite')

//cdb.init()

tst()

async function tst() {
   perfy.start('loop-stuff');

   for (let i = 0; i < 10; i++) {

      log.info(is.array(await cdb.selectAll()))

   }

   var result = perfy.end('loop-stuff')
   console.log('', result.time )
}//()