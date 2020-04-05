import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.12/eventFlux/EventFlux.js';
import { AbsSlotComp } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.12/src/slotComp/AbsSlotComp.js';
class PgCustel extends AbsSlotComp {
    constructor() {
        super();
        this.template = `
   <style>
   
   ::slotted(.msg) {
      display: none ;
   }
   
   </style>
   
   <slot></slot>

   `;
        EventFlux.init();
        console.log('pgComp');
        this.setup(this.template);
        const THIZ = this;
        THIZ.addScript('https://cdn.jsdelivr.net/npm/jquery@3.4.1/dist/jquery.slim.min.js', function () {
            THIZ.addScript('https://cdn.jsdelivr.net/npm/disableautofill@1.2.8/src/jquery.disableAutoFill.min.js', THIZ.disAutoReady);
        });
        defEventFlux.register('login-ok', this.onOK);
        defEventFlux.register('login-fail', this.onFail.bind(this));
        this.getSlotElById('loginBut').addEventListener('click', this.onLoginBut);
    }
    disAutoReady() {
        $('#loginF').disableAutoFill();
        $(".pswd").css("-webkit-text-security", "disc");
        console.log('dis ready');
    }
    onLoginBut() {
        console.log('klik');
        const inputs = document.getElementsByTagName('input');
        let obj = AbsSlotComp.getInputsValue(inputs);
        console.log(obj);
        defEventFlux.doAction('login-check', obj);
    }
    onOK() {
        console.log('ok');
        window.location.href = '/contactScreen';
    }
    onFail() {
        console.log('fail');
        this.getSlotElById('Fail').style.display = 'block';
    }
}
customElements.define('pg-custel', PgCustel);
console.log('loaded');
