
export class Utils { //copy

   static getHostname(url) {
      var match = url.match(/:\/\/(www[0-9]?\.)?(.[^/:]+)/i)
      if (match != null && match.length > 2 && typeof match[2] === 'string' && match[2].length > 0) 
         return match[2]
      else 
         return null;
   }//()

   static getDomain(url) {
      var hostName = Utils.getHostname(url)
      var domain = hostName
      
      if (hostName != null) {
          var parts = hostName.split('.').reverse()
          
          if (parts != null && parts.length > 1) {
              domain = parts[1] + '.' + parts[0];
                  
              if (hostName.toLowerCase().indexOf('.co.uk') != -1 && parts.length > 2) 
                domain = parts[2] + '.' + domain;
              
          }
      }
      
      return domain
  }//()

}//class