
import { TerseB } from "./terse-b"

class C {

    log:any = new TerseB(this.constructor.name)

    tst() {
        
        console.log('DEV:',process.env.DEV)

        this.log.info('oh?')
        this.log.warn('War!')

    }

}

new C().tst()