
const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "geoapp"})

import { GDB } from './GDB'

const csv = require('csv-parser')
const fs = require('fs-extra')

const perfy = require('perfy')

const csvFile = 'dbip.csv'

const db = new GDB()

export class Load {

async import() {
   perfy.start('imp')
   await fs.createReadStream(csvFile)
   .pipe(csv({headers:false}))
   .on('data', async (row) => {
         await db.ins(row)
   })
   .on('end', () => {
      let time = perfy.end('imp')
      console.log(':i:')
      log.info(time)

      this.check()
   })
}//()

private async check() {
   await db.count()

   await db.get()
}

}//class