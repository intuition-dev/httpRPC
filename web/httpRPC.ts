// All rights reserved by MetaBake (INTUITION.DEV) | Cekvenich, licensed under LGPL 3.0

// requires Promise, lz-string and fetch
class httpRPC {// 
  // uses simple auth
  httpOrs // protocol
  host
  port

  /**
   * 
   * @param httpOrs should be 'https'
   * @param host 
   * @param port 
   * 
   * eg:
      var pro = window.location.protocol
      pro = pro.replace(':', '')
      var host = window.location.hostname
      var port = window.location.port
   */
  constructor(httpOrs, host:string, port) {
    this.httpOrs = httpOrs
    this.host = host
    this.port = port

    console.log(this.httpOrs, this.host, this.port)

  }
  //apiPath=''
  user=''
  pswd=''
  setUser(user,pswd) { // simple auth,
    this.user = user
    this.pswd = pswd 
  }
  token =''
  setToken(token) { 
    this.token=token
  }

  /**
   * @param route api apth, eg api
   * @param method CRUD, insert, check, listAll, etc
   * @param params Object of name value pairs.
   */
  invoke(route, method, params):Promise<string> { // returns promise of results or err
    //if array, return as array
    if(!params) params = {}

    params.method=method
    params.user = btoa(this.user)
    params.pswd = btoa(this.pswd)
    params.token = btoa(this.token)

    params.view = window.location.href

    var str = JSON.stringify(params)
    var compressed = LZString.compressToEncodedURIComponent(str)

    const THIZ = this
    return new Promise(function(resolve, reject) {
      //console.info(formData.get('method'))
      let url:string = THIZ.httpOrs+'://'+THIZ.host + (THIZ.port ? (':' + THIZ.port) : '') + '/'+route 

      url = url + '/?p=' + compressed

      //console.log(url)
  
      fetch(url, {
            method: 'GET',
            cache: 'default',
            redirect: 'follow',
            mode: 'cors',
            //credentials: 'include',
            keepalive: true

          })//fetch
          .then(function(fullResp) {           
            if(!fullResp.ok) 
              reject('HRRP protcol error in RPC: ' + fullResp)
             else {
              return fullResp.text()
            }
          })
          .then(function(compressed) {
            var str = LZString.decompress(compressed)
            var resp=  JSON.parse(str)
            if((!resp) || resp.errorMessage) {
              reject(resp)
            }
            resolve(resp.result)
          })//fetch
          .catch(function (err) {
            console.log('fetch err', err)
            reject(err)
          })
      })//pro
  }//invoke()

  // for example keys
  setItem(key:string, val) {
    sessionStorage.setItem(key, val)
  }

  getItem(key:string) {
    return sessionStorage.getItem(key)
  }

  /**
   * Place this in ViewModel and vm calls the rpc
   * and then in page you can say vm.log(..)
   * @param msg 
   * @param level 
   * @param className 
   */
  log(msg:string, level?:number, className?:string) {
    var THIZ = this
    let p = {
      msg: msg,
      page: window.location.pathname,
      level: level,
      className: className
    }
    
    try {
      if(window.ENV) p['ENV'] = window.ENV
      p['view'] = window.location.href
      p['appVersion'] = btoa(navigator.appVersion)
      p['userAgent'] = btoa(navigator.userAgent)
      p['platform'] = btoa(navigator.platform)
    } catch(err) {console.log(err)}

    setTimeout(function(){
      //send to server
      THIZ.invoke('log', 'log', p)
    },1)
    if(className) console.log(className, level, msg)
    else console.log(msg)
  }//()

}//class

