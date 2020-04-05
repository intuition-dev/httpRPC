import { EventFlux } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.11/eventFlux/EventFlux.js';
import { AbsSlotComp } from 'https://cdn.jsdelivr.net/gh/intuition-dev/mbToolBelt@v8.4.11/src/slotComp/AbsSlotComp.js';
class PgCustel extends AbsSlotComp {
    constructor() {
        super();
        this.template = `
   <style>
   .msg {
      display: none;
   }
   
   .pswd { 
      -webkit-text-security: disc;
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
        defEventFlux.register('login-fail', this.onFail);
        this.getSlotElById('loginBut').addEventListener('click', this.onLoginBut);
    }
    getSlotElById(id) {
        let ret;
        this.slotEls.map(function (n) {
            if (n.id == id)
                ret = n;
        });
        return ret;
    }
    get slotEls() {
        return this.sr.querySelector('slot').assignedElements();
    }
    disAutoReady() {
        $('#loginF').disableAutoFill();
        console.log('dis ready');
    }
    onLoginBut() {
        console.log('klik');
        const inputs = document.getElementsByTagName('input');
        let obj = PgCustel.getInputsValue(inputs);
        console.log(obj);
        defEventFlux.doAction('login-check', obj);
    }
    onOK() {
        console.log('ok');
        window.location.href = '/contactScreen';
    }
    onFail() {
        console.log('fail');
        document.getElementById('Fail').style.display = 'block';
    }
    static getInputsValue(inputs) {
        const obj = {};
        for (var input in inputs) {
            const value = inputs[input].value;
            const key = inputs[input].id;
            if (!key)
                continue;
            obj[key] = value;
        }
        return obj;
    }
}
customElements.define('pg-custel', PgCustel);
console.log('loaded');
