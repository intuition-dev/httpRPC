
// https://nitayneeman.com/posts/getting-to-know-puppeteer-using-practical-examples
// https://michaljanaszek.com/blog/test-website-performance-with-puppeteer

// https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md

// https://fdalvi.github.io/blog/2018-02-05-puppeteer-network-throttle

declare var window: any // needed to compile ts

import puppeteer from 'puppeteer'
import { Utils } from './Utils'

const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })
const log = bunyan.createLogger({src: true, stream: formatOut, name: "pup"})

const perfy = require('perfy')

export class Pupp {

   // returns load time, load domains, time to first paint, time it took function to run, screen shot
   async grade(url) {
      const browser = await puppeteer.launch({
         devtools: true,
         headless:true
      })
      const [page] = await browser.pages();
      const client = await page.target().createCDPSession()
      await client.send('Performance.enable')
   
      //slow to 4g
      await client.send('Network.enable')
      await client.send('Network.clearBrowserCache')
      await client.send('Network.emulateNetworkConditions', {
         'offline': false,
         'latency': 25,
         'downloadThroughput': 4 * 1024 * 1024 / 8,
         'uploadThroughput': 3 * 1024 * 1024 / 8
       })
      await client.send('Emulation.setCPUThrottlingRate', { rate: 4 });
   
      const domains = {}
      page.on('response', response => {
         const url:string = response.url()
         let domain:string = Utils.getDomain(url)
         if(domain.includes('data:image'))
            return
         log.info( ' ', url.substring(0, 90) )
         domain = Pupp.reverseString(domain)
         if(domains[domain])
            domains[domain]  = domains[domain] + 1
         else domains[domain] = 1
      })
   
      await page.goto(url, { waitUntil: ['networkidle', 'load'], timeout: 120 * 1000,  networkIdleTimeout: 5 * 1000  })
      await page.waitFor(200)
      const screenShot:string = await page.screenshot({fullPage: true, encoding: 'base64', })

      const performanceTiming = await JSON.parse( // this goes to the browsers itself
         await page.evaluate(() => JSON.stringify(window.performance.timing))
      )
   
      const pMetrics = await client.send('Performance.getMetrics')
      const performanceMetrics = this.aToObj ( pMetrics.metrics )
   
      const ordered = {}
      Object.keys(domains).sort().forEach(function(key) {
         ordered[Pupp.reverseString(key)] = domains[key]
      })
      await browser.close()
   
      console.log('domains', ordered )
      console.log('domains', Object.keys(ordered).length )
   
      console.log( 'firstMP', performanceMetrics['FirstMeaningfulPaint'] - performanceMetrics['NavigationStart'])
      console.log( 'load', ( performanceTiming['loadEventEnd'] - performanceTiming['navigationStart']) /1000)
   
   }//()

   static reverseString(str) {
      // Step 1. Use the split() method to return a new array
      var splitString = str.split(""); // var splitString = "hello".split("");
      // ["h", "e", "l", "l", "o"]
   
      // Step 2. Use the reverse() method to reverse the new created array
      var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
      // ["o", "l", "l", "e", "h"]
   
      // Step 3. Use the join() method to join all elements of the array into a string
      var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
      // "olleh"
      
      //Step 4. Return the reversed string
      return joinArray; // "olleh"
   }
   
   aToObj(a) {
      var rv = {};
      for (let i = 0; i < a.length; ++i) {
         let row = a[i]
         rv[row.name] = row.value
      }
      return rv
   }


}