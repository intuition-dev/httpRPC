
declare var DeventBus: any // from mbToolBelt, is persistent
declare var depp: any

interface iViewModel{
    
    /**
     * Return 2 objects if 2 forms
     * or return 2 objects if 2 components
     * or 2 arrays if 2 tables.
     * Or a mix: 1 form and 1 table and 1 components is 1 array and 2 objects
     */
    getData(key?:string):Object

    // returns 'OK', else an error message should be shown by View|Binding
    validate():string 
    
    log(...a):void

}//()

/**
 * Used by UI binding
 */
class BaseViewModel {
    E1Listener = {} // ;to store E1Listener data for events

    testE1() {

      depp.require('eventBus', function(){
        console.log('tst:')

        const THIZ:BaseViewModel = this

        // data before
        DeventBus.dispatch('dataB4', 'oh hi b4')
        DeventBus.dispatch('dataB4', 'oh hi b4')
        DeventBus.addListener('dataB4', function(data) {
          console.log('b4', data)
   
        })

        // data after
        DeventBus.addListener('dataAf', function(data) {
          console.log('af:', data)
        })
        DeventBus.dispatch('dataAf', 'oh hi af')
        DeventBus.dispatch('dataAf', 'oh hi af')   

      })
    }//()



  genGUID() { //generates a guid client side so no need to wait
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
      d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = (d + Math.random() * 16) % 16 | 0;
      d = Math.floor(d / 16);
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }
  
  static removeAllStore() { // cookies and storage. For example to log out.
    var cookies = document.cookie.split("; ");
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split(".");
      while (d.length > 0) {
        var cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' + d.join('.') + ' ;path=';
        var p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        }//inner while
        d.shift()
      }//while
    }//for
    localStorage.clear()
    sessionStorage.clear()
  }//()
  
}// class