// All rights reserved by Cekvenich|INTUITION.DEV) |  Cekvenich, licensed under LGPL 3.0

const bunyan = require('bunyan')
const bformat = require('bunyan-format2')  
const formatOut = bformat({ outputMode: 'short' })

const btoa = function(str){ return Buffer.from(str).toString('base64'); }
const fetch = require('make-fetch-happen')
const LZString = require('lz-string')

export class HttpRPC {// 
    // uses simple auth
    httpOrs // protocol
    host
    port

    _log = bunyan.createLogger({src: true, stream: formatOut, name: this.constructor.name })

  
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
  
      this._log.info(this.httpOrs, this.host, this.port)
  
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
     * @param timeout defaults to 2000
     */
    invoke(route, method, params, timeout?):Promise<string> { // returns promise of results or err
      if(!timeout) timeout = 2000
      //if array, return as array
      if(!params) params = {}
  
      params.method=method
      params.user = btoa(this.user)
      params.pswd = btoa(this.pswd)
      params.token = btoa(this.token)
  
      let str = JSON.stringify(params)
      const compressed = LZString.compressToEncodedURIComponent(str)

      const THIZ = this
      return new Promise(function(resolve, reject) {
        //log.info(formData.get('method'))
        let url:string = THIZ.httpOrs+'://'+THIZ.host + (THIZ.port ? (':' + THIZ.port) : '') + '/'+route 
  
        url = url + '/?p=' + compressed
        fetch(url, {
              timeout: timeout,
              method: 'GET',
              cache: 'default',
              redirect: 'follow',
              mode: 'cors',
              //credentials: 'include',
              keepalive: true
  
            })
            .then(function(fullResp) {

              if(!fullResp.ok) {
                THIZ._log.warn('HTTP protocol error in RPC: ' + fullResp.status + fullResp)
                reject('HTTP protocol error in RPC: ' + fullResp.status + fullResp)
             }
              else 
                return fullResp.text()
           })
           .then(function(str) {     
              const resp = JSON.parse(str)
              
              if((!resp) || resp.errorMessage) {
                THIZ._log.warn(method +' '+ str)
                reject(method +' '+ str)
             }
             resolve(resp.result)

            })//fetch
            .catch(function (err) {
              THIZ._log.warn('fetch err')
              THIZ._log.warn(err)
              reject(err)
            })
        })//pro
    }//invoke()
  
  
  }//class
  
  