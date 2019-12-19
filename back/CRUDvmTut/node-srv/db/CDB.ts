declare var performance

var bunyan = require('bunyan')
var bformat = require('bunyan-format2')  
var formatOut = bformat({ outputMode: 'short' })
var log = bunyan.createLogger({src: true, stream: formatOut, name: "some name"})

var faker = require('faker')
const hash = require("murmurhash3js")


import { BaseDBL } from 'mbakex/lib/BaseDBL'

export class CDB extends BaseDBL  {

   constructor() {
      super()

      this.schema()
   }//()

   fastCon(path,  fn) {
      this.defCon(path,  fn) 
      
      //this._db.pragma('locking_mode=EXCLUSIVE')
      log.info(this._db.pragma('locking_mode', { simple: true }))

   }

   private schema() {
      this.fastCon(process.cwd(), 'cdb.db')

      const exists = this.tableExists('users')
      if(exists) return

      log.info('.')
      this.write(`CREATE TABLE users( guid, email, pswd_hash, 
         auth_level, fname, lname, title, phone,     
         connections, dt_stamp TEXT) `)
   }//()

   public load10K() {
      this.BEGIN()

      {
      var guid = this.fakeGUID()
      var email = faker.internet.email()
      var pswd = faker.internet.password()
      pswd = hash.x86.hash32(pswd)

      var auth_level = 'user'
      var fname = faker.name.firstName()
      var lname = faker.name.lastName()
      var title = faker.name.title()
      var phone = faker.phone.phoneNumber()

      var date = new Date().toISOString()

      this.write(`INSERT INTO users( guid, email, pswd_hash, 
         auth_level, fname, lname, title, phone,     
         dt_stamp
         )
            VALUES
         ( ?,?, ?,
         ?,?,?,?,?,
         ?
         )`
         ,
         guid, email, pswd, 
         auth_level, fname, lname, title, phone,     
         date
      )
      }

      this.COMMIT()
   }//()


   fakeGUID() { //generates a guid client side so no need to wait
      var d = new Date().getTime();
      if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
      }
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
    }

}