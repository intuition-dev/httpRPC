
import bunyan from 'bunyan'
import bformat from 'bunyan-format2'  

export class TerseB {

    constructor(name) {
        const formatOut = bformat({ outputMode: 'short' })

        const DEV = process.env.DEV
        
        let log
        if(!DEV) // prod
            log = bunyan.createLogger({src: false, level: 31, stream: formatOut, name: name })
        else { // log all
            log = bunyan.createLogger({src: true, stream: formatOut, name: name })
            console.log('log DEV=true', name)
        }
        return log
    }//()

}//class