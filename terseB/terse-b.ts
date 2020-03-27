
import bunyan from 'bunyan'
import bformat from 'bunyan-format2'  

export class TerseB {

    constructor(name) {

        const DEV = process.env.DEV
        
        let log
        if(!DEV) {// prod
            let formatOut = bformat( { outputMode: 'bunyan' })
            log = bunyan.createLogger({src: false, level: 31, stream: formatOut, name: name })
        } else { // dev
            let formatOut = bformat( { outputMode: 'long' })
            log = bunyan.createLogger({src: true, stream: formatOut, name: name })
            console.log('log DEV=true', name)
        }
        return log
    }//()

}//class