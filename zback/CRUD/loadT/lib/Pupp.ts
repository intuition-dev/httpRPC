
declare var window: any // needed to compile ts

import puppeteer from 'puppeteer'

const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "pup"})

export class Pupp {

   // returns load time, load domains, time to first paint, time it took function to run, screen shot
   async grade(url) {
      const browser = await puppeteer.launch({
         devtools: true,
         headless:true
      })
      const [page] = await browser.pages();
      const client = await page.target().createCDPSession()
   
      await client.send('Network.enable')
      await client.send('Network.clearBrowserCache')
   
      const domains = {}
      page.on('response', response => {
         const url:string = response.url()
      })
  
      page.on('console', msg=> {
         let fs:string = ''
         for (let i = 0; i < msg.args().length; ++i) {
            let s:string = ' '+msg.args()[i]
            s = s.split(':')[1] 
            if(!s) continue
            //if(typeof s == 'undefined') continue
            fs += s + ' '
         }
         fs = fs.trim()
         if(fs.length>0)
            console.log(fs)
         
         if(fs=='TestsDone') browser.close()
      })

      page.goto(url, { waitUntil: ['load'], timeout: 4 * 1000 })

   
   }//()


}//class