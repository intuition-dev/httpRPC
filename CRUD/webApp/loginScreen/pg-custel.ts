
declare var defEventFlux

import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.11/eventFlux/EventFlux.js'

import { CompElement } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.11/custel/custel1/custel/CompElement.js';

class PgCustel extends CompElement {
// https://fontstruct.com/fontstructions/show/1106896/password_dots_2
template = `
   <style>
   .msg {
      display: none;
   }
   
   .pswd { 
      -webkit-text-security: disc;
   }
   </style>
   
   <b>I'm a Cust. El</b>
   <slot></slot>
   `;

constructor() {
   super();
   EventFlux.init()

   console.log('pgComp');
   this.setup(this.template) // just a helper function for boiler plate.

   this.sr.addEventListener('click', function (e) {
      console.log(e.composedPath()[0]);
   }); //click

   const THIZ = this
   THIZ.addScript('https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js', function() {
      THIZ.addScript('https://cdn.jsdelivr.net/npm/disableautofill@1.2.8/src/jquery.disableAutoFill.min.js',  THIZ.disAutoReady )
   })

   defEventFlux.register('login-ok', this.onOK)
   defEventFlux.register('login-fail', this.onFail)
   
   // end load /////////////////////////////////////////////////////////
   this.sr.getElementById('loginBut').addEventListener('click', this.onLoginBut)
   
}

disAutoReady() {
      $('#loginF').disableAutoFill()
      console.log('dis ready')
}

onLoginBut() {
   console.log('klik')

   const inputs = document.getElementsByTagName('input')
   let obj = this.getInputsValue(inputs)
   console.log(obj)
   defEventFlux.doAction('login-check', obj)
}

onOK() {
   console.log('ok')
   window.location.href='/contactScreen'
}

onFail() {
   console.log('fail')
   document.getElementById('Fail').style.display= 'block'
}

} //custel

customElements.define('pg-custel', PgCustel)
console.log('loaded')
