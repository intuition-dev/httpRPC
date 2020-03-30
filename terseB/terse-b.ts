
import bunyan from 'bunyan'
import bformat from 'bunyan-format2'  

export class TerseB {

    constructor(name) {

        const PROD = process.env.NODE_ENV
        
        let log
        if(PROD) {// prod
            let formatOut = bformat( { outputMode: 'bunyan' })
            log = bunyan.createLogger({src: false, level: 31, stream: formatOut, name: name })
        } else { // dev
            let formatOut = bformat( { outputMode: 'long' })
            log = bunyan.createLogger({src: true, stream: formatOut, name: name })
        }
        return log
    }//()

}//class