var t="function"==typeof fetch?fetch.bind():function(t,e){return e=e||{},new Promise(function(r,n){var s=new XMLHttpRequest;for(var i in s.open(e.method||"get",t),e.headers)s.setRequestHeader(i,e.headers[i]);function o(){var t,e=[],r=[],n={};return s.getAllResponseHeaders().replace(/^(.*?):\s*([\s\S]*?)$/gm,function(s,i,o){e.push(i=i.toLowerCase()),r.push([i,o]),n[i]=(t=n[i])?t+","+o:o}),{ok:1==(s.status/200|0),status:s.status,statusText:s.statusText,url:s.responseURL,clone:o,text:function(){return Promise.resolve(s.responseText)},json:function(){return Promise.resolve(s.responseText).then(JSON.parse)},blob:function(){return Promise.resolve(new Blob([s.response]))},headers:{keys:function(){return e},entries:function(){return r},get:function(t){return n[t.toLowerCase()]},has:function(t){return t.toLowerCase()in n}}}}s.withCredentials="include"==e.credentials,s.onload=function(){r(o())},s.onerror=n,s.send(e.body)})},e=function(t){this.url=t,this.getDefaultPrinter=this.getDefaultPrinter.bind(this),this.getAllPrinters=this.getAllPrinters.bind(this)};e.prototype.getDefaultPrinter=function(){var e=this;return t(this.url+"/default?type=printer").then(function(t){return t.status>=200&&t.status<300?t.json():Promise.reject(t.status)}).then(function(t){return new r(e.url,t)})},e.prototype.getAllPrinters=function(){var e=this;return t(this.url+"/available").then(function(t){return t.status>=200&&t.status<300?t.json():Promise.reject(t.status)}).then(function(t){return t.printer.map(function(t){return new r({url:e.url,device:t})})})};var r=function(t){var e=t.device;this.url=t.url,this.name=e.name,this.uid=e.uid,this.device=e};r.prototype.post=function(e,r){return t(""+this.url+e,{method:"POST",body:JSON.stringify(r)}).then(function(t){return t.status>=200&&t.status<300?t.json():Promise.reject(t.status)})},r.prototype.read=function(){return this.post("/read",{device:this.device})},r.prototype.write=function(t){this.post("/write",{device:this.device,data:t})},r.prototype.print=function(t){return this.write(t)},r.prototype.save=function(){return{url:this.url,device:this.device}};export{e as Server,r as Printer};
//# sourceMappingURL=zebra-connect.m.js.map