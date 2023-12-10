const ws=require("ws");exports.C=(function(){o={},(p={}).sh=((a=function(){this.t=2500}).prototype.st=function(c,i=undefined){return setTimeout(c,i||this.t)},a.prototype.si=function(c,i=undefined){return setInterval(c,i||this.t)},new a),p.er=new(function(){var a=function(){};return a.prototype.e=function(e,t,d=0){},a}()),p.a=new(function(){let a=function(){},c,z;return a.prototype.c=function(u,t,g){return this.a={u:u,t:t,c:g||[]},this.s="pending",new Promise((rs,rj)=>{this.b=[rs,rj],this.nw()})},a.prototype.nw=function(){return this.a?this.a.i>this.a.t&&1!=this.a.t?(this.s="error",this.b[1]()):(this.s="pending",void this.nx()):(this.b&&this.b[1](),this.s="error")},a.prototype.nx=function(){this.a.i=this.a.i+1||1,(c=new ws(this.a.u)).onopen=_=>{this.s="open",this.u=[c,_];for(z of this.f||[])z(this.u);for(z of this.a.c||[])z(this.u);this.b[0](this.u)},c.onclose=_=>{if("close"!=this.s)return this.s="close",p.er.e("Connexion perdu avec le serveur"),p.sh.st(()=>{this.nw()})},c.onerror=_=>{if("close"!=this.s)return this.s="close",p.er.e("Connexion impossible avec le serveur"),p.sh.st(()=>{this.nw()})}},a.prototype.close=function(){"open"==this.s&&this.u[0].close(),this.a=this.b=this.u=undefined,this.s="close"},a.prototype.h=function(d){if("open"!=this.s)return!1;try{this.u[0].send("string"==typeof d?d:JSON.stringify(d))}catch(e){return!1}return!0},a}()),p.c={d:(e,d)=>{e.r[0](d),delete p.a.m[e.d.id]},save:(e,d)=>{var part,i,c,parts_id,pp=p,dd=d;if(dd.save&&dd.parts&&dd.parts_id&&dd.maxPayload){pp.save||(pp.save={}),pp.save.maxPayload=dd.maxPayload,pp.save.temps||(pp.save.temps={});let p={};for(let i=0;i<e.d.h.length;i+=pp.save.maxPayload)part=Math.ceil((i+pp.save.maxPayload)/pp.save.maxPayload),p[part]=e.d.h.substr(i,pp.save.maxPayload);c=Object.keys(p).map(Number).sort((c,b)=>c-b),parts_id={};for(i of Object.keys(dd.parts_id))parts_id[dd.parts_id[i]]=i;pp.save.temps[e.d.id]={save:dd.save,parts:dd.parts,parts_id:dd.parts_id,ptsi:parts_id,m:e,p:p,c:c};let d=c.shift();pp.a.h(JSON.stringify({event:"save",data:{id:dd.save,part:pp.save.temps[e.d.id].ptsi[d],data:p[d],end:pp.save.temps[e.d.id].parts==d},id:e.d.id})),pp.save.temps[e.d.id].c=c}else if(dd.part&&dd.id&&dd.recevied&&dd.save){if(!pp.save.temps[e.d.id]&&pp.save.temps[e.d.id].save==dd.save)return;let d=pp.save.temps[e.d.id].c.shift();pp.a.h(JSON.stringify({event:"save",data:{id:pp.save.temps[e.d.id].save,part:pp.save.temps[e.d.id].ptsi[d],data:pp.save.temps[e.d.id].p[d],end:pp.save.temps[e.d.id].parts==d},id:e.d.id}))}else dd.data&&dd.data.saved&&(e.r[0](dd.data),delete p.a.m[e.d.id],delete pp.save.temps[e.d.id]);p=pp},open:(e,d)=>{var j;d.data&&!d.part?e.r[0](d.data):d.parts?(p.open||(p.open={}),p.open[e.d.id]={parts:d.parts,m:e,p:{}}):d.part&&d.data&&p.open&&(p.open[e.d.id].p[d.part]=d.data,p.open[e.d.id].parts==d.part)&&(j=Object.keys(p.open[e.d.id].p).map(Number).sort((c,b)=>c-b).map(cle=>p.open[e.d.id].p[cle]).join(""),e.r[0](j),delete p.a.m[e.d.id],delete p.open[e.d.id])}},p.p=function(d,i,c){var r=d;"save"==d.event&&(d.data.data&&d.data.path||c[1]("Save Error"),r.h=d.data.data,r.data={path:d.data.path,size:("string"==typeof r.h?r.h:JSON.stringify(r.h)).length}),r.id=i,(p.a.m||(p.a.m={}))[i]={d:r,r:c},p.a.h(r)||c[1]("Send Error")},p.s=function(a,b,c){p.p({event:a,data:b},p.a.l?p.a.l++:p.a.l=1,c)},p.m=function(m){let d,i,e;try{d=JSON.parse(m.data)}catch(e){p.er.e(e)}if(i=d.data.id,p.a.m[i])return e=p.a.m[i],"error"==d.event?e.r[1](d.data.type||502):p.c[d.event]?p.c[d.event](e,d.data):p.c.d(e,d.data)},o.start=function(url,b,f){return p.a.c(url,b||!0,f||[(_,__)=>{_[0].onmessage=a=>p.m(a)}])},o.send=function(event,data,timeout=p.sh.t){return!!(event&&data&&timeout&&"open"==p.a.s)&&new Promise((rs,rj)=>{p.sh.st(_=>rj("Timeout"),timeout),p.s(event,data,[rs,rj])})},o.connect=function(username,password){o.send("login",{name:username,password:password}).then(_=>{console.log("Connexion réussie avec la base de données sur l'utilisateur: ", _.login_at);}).catch(_=>{p.er.e(_)})},o.save=function(path,data){return!(!path||!data)&&this.send("save",{data:data,path:path})},o.open=function(path){return!!path&&this.send("open",{path:path})},o.newdb=function(path){return!!path&&this.send("new_db",{path:path})},o.deletedb=function(path){return!!path&&this.send("del_db",{path:path})},o.exist=function(path){return!!path&&this.send("exist_db",{path:path})};return o})();