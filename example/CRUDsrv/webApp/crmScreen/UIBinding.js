console.log('UI:');

import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.2.8/eventFlux/EventFlux.js'
new EventFlux() // makes defEventFlux var

class UIBinding {

    constructor() {
        defEventFlux.addListener('onUData', UIBinding.onData);
    } //()
    
    static onData(data) {
        console.log('onData');
        let options = {
            valueNames: ['fname', 'lname', 'email', 'pass'],
            item: `<tr> 
               <td class="fname"></td>
               <td class="lname"></td>
               <td class="email"></td>
               <td class="pass"> </td>
            </tr>`
        };
        if (!(UIBinding.userLst)) {
            let userLstEl = document.getElementById('userLst');
            UIBinding.userLst = new List(userLstEl, options, data);
        }
        else { //list exists
            UIBinding.userLst.add(data);
        }
        console.log('listjs', data);
    } //()
}//

new UIBinding()
