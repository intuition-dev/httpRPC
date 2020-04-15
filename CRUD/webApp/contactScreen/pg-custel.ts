
declare var defEventFlux


import { AbsSlotCustel } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.14/slotCustel/slotCustel/AbsSlotCustel.min.js';

class PgCustel extends AbsSlotCustel {

   template = `

   <slot></slot>

   `;

constructor() {
   super();

   console.log('pgComp');
   this.setup(this.template) // just a helper function for boiler plate.

   this.addScript('https://cdn.jsdelivr.net/npm/list.js@1.5.0/dist/list.min.js', function() {
      console.log('cons')
      defEventFlux.addListener('contact-data', PgCustel.onData)

   })
}

static contactLst

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
   if (!(PgCustel.contactLst)) {
       let contactLstEl = document.getElementById('contactLst');
       PgCustel.contactLst = new List(contactLstEl, options, data);
   }
   else { //list exists
      PgCustel.contactLst.add(data);
   }
   console.log('listjs', data);
} //()

} //custel

customElements.define('pg-custel', PgCustel)
console.log('loaded')
