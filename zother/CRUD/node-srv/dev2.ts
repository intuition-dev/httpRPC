
import { IDB } from 'intu/node-srv/lib/IDB';

const idb = new IDB(process.cwd(), '/IDB.sqlite')

async function f() {
    await idb.isSetupDone()
}
f()