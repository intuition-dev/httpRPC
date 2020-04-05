console.log('UI:');
import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.12/eventFlux/EventFlux.js';
EventFlux.init();
class UIBinding {
    constructor() {
        defEventFlux.addListener('contact-data', UIBinding.onData);
    }
    static onData(data) {
        console.log('onData');
        let options = {
            valueNames: ['fname', 'lname', 'email', 'pass'],
            item: `<tr> 
               <td class="fname"></td>
               <td class="lname"></td>
               <td class="email"></td>
               <td class="org"> </td>
            </tr>`
        };
        if (!(UIBinding.contactLst)) {
            let contactLstEl = document.getElementById('contactLst');
            UIBinding.contactLst = new List(contactLstEl, options, data);
        }
        else {
            UIBinding.contactLst.add(data);
        }
        console.log('listjs', data);
    }
}
new UIBinding();
