
const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  

export class TerseB {

    constructor(name) {
        const formatOut = bformat({ outputMode: 'short' })

        let log

        if(true) // prod
            log = bunyan.createLogger({src: false, level: 31, stream: formatOut, name: name })
        else // log all
            log = bunyan.createLogger({src: true, stream: formatOut, name: name })
        
        return log
    }//()

}//class