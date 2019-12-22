declare var performance

var bunyan = require('bunyan')
var bformat = require('bunyan-format2')  
var formatOut = bformat({ outputMode: 'short' })
var log = bunyan.createLogger({src: true, stream: formatOut, name: "cdb"})

var faker = require('faker')
const hash = require("murmurhash3js")


import { BaseDBL } from 'mbakex/lib/BaseDBL'

export class CDB extends BaseDBL  {

   constructor() {
      super()

      this.schema()
   }//()

   private fastCon(path,  fn) {
      this.defCon(path,  fn) 
      
      this._db.pragma('locking_mode=EXCLUSIVE')
      log.info(this._db.pragma('locking_mode', { simple: true }))
   }

   private schema() {
      this.fastCon(process.cwd(), '/db/cdb.db')

      const exists = this.tableExists('user')
      if(exists) return

      log.info('sch')

      this.write(`CREATE VIRTUAL TABLE user USING fts5( guid UNINDEXED, pswd_hash UNINDEXED, 
         auth_level UNINDEXED, fname, lname, title, phone, email,   
         following_to UNINDEXED, followed_by UNINDEXED, dt_stamp UNINDEXED, tokenize = porter ) `)
   }//()

   srchWpage(srchS, o) {
      let lim = 10
      srchS = '^' +srchS+ '*'
      log.info(srchS)
      const qry = 'SELECT rowid, rank, * FROM user WHERE user MATCH ? ORDER BY rank LIMIT ? OFFSET ?' 
      const rows = this.read(qry, srchS, lim, o)

      return rows
   }//()


   public load1M() {
      this.count()

      let i = 0;
      do {
         this.load10K()
         i++
      }while (i < 100)
      this.count()
      log.info('+')
   }

   private load10K() {
      this.BEGIN()

      let j = 0;
      do {
      var guid = this.fakeGUID()
      var email = faker.internet.email()
      var pswd = faker.internet.password()
      pswd = hash.x86.hash32(pswd)

      var auth_level = 'user'
      var fname = faker.name.firstName()
      var lname = faker.name.lastName()
      var title = faker.name.title()
      var phone = faker.phone.phoneNumber()

      var date:string = new Date().toISOString()

      this.write(`INSERT INTO user( guid, email, pswd_hash, 
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
      j++
      }while (j < 10*1000)

      this.COMMIT()
      log.info('.')
   }//()

   count() {
      let r=this.readOne('SELECT count(*) AS count FROM user')
      log.info(r)
   }

   private fakeGUID() { //generates a guid client side so no need to wait
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