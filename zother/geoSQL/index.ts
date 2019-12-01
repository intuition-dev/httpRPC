

import { Load} from "./lib/Load"

const l = new Load()

async function foo(){
   await l.import()
}

foo()