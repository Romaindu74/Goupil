var S = 'friend';
// var c, you;
var F = {};

// const edfriend = async (id) => {
//     if (id.event) {
//         var is = false;
//         var ok = id.data.ok;
//         var id = id.data.id;
//     } else {
//         var is = true;
//         var ok = selected == 'friend' ? 0 : 1;
//         send_json({"data": {"id":id,"ok":ok}, "event": "edit-friend"});
//     }

//     var text = gi('edfriend');

//     if (text) {
//         text.innerHTML = ok == 0 ? 'Ajouter l\'amis' : 'Retirer l\'ami'
//     }

//     var el = gi(id);
//     var parentNode = el.parentNode;

//     gi('editbox').style.display = 'none';

//     parentNode.className = ok == 0 ? 'spam' : 'friend';
//     if (is){
//         parentNode.style.display = 'none';
//     } else {
//         parentNode.style.display = (selected == 'friend' && ok == 0) ? 'none' : 'block';
//     }

//     var count = gi('notif-' + (ok == 0 ? 'friend' : 'spam'));
//     count.innerHTML = parseInt(count.innerHTML)-1;

//     var count = gi('notif-' + (ok == 1 ? 'friend' : 'spam'));
//     count.innerHTML = parseInt(count.innerHTML)+1;
// }

// const msg_input = () => {
//     var text = gi('text');
//     var count = gi('counter');
//     count.innerHTML = `${text.value.length} / ${0x8000}`;

//     console.log(0x8000 - text.value.length)
// }

// const here = (ev) => {
//     if (ev.data.here) {
//         gi(`actif-${ev.data.id}`).style.backgroundColor = 'green';
//     } else {
//         gi(`actif-${ev.data.id}`).style.backgroundColor = 'red';
//     }
// }
// const message = (ev, content = undefined) => {
//     console.log(ev.event ? ev.data.uid : ev.uid.toString());
//     var el = gi('dialog');
//     var name = (ev.event ? ev.data.author : ev.author) == 'me' ? globalThis.me.name : globalThis.you.name;
//     var id = (ev.event ? ev.data.author : ev.author) == 'me' ? globalThis.me.id : globalThis.you.id;
//     new Elements('p', el, {
//         className: ev.event ? ev.data.author : ev.author,
//         id: 'msg-' + (ev.event ? ev.data.uid : ev.uid.toString()),
//     }, `<div class="msg-head"><div class="msg-icon" style="background-image: url(${location.origin}/Libraries/Main/api/icon.php?id=${id})"></div><span>${name}</span></div><div class="content"><div id="content-${(ev.event ? ev.data.uid : ev.uid)}"></div></div>`)
    
//     function binaryToString(binary) {
//         let result = '';
//         for (let i = 0; i < binary.length; i += 8) {
//           const code = parseInt(binary.substring(i, i + 8), 2);
//           if (code <= 0xffff) {
//             result += String.fromCharCode(code);
//           } else {
//             // Traite les codes Unicode supérieurs à 0xffff
//             const highSurrogate = Math.floor((code - 0x10000) / 0x400) + 0xd800;
//             const lowSurrogate = (code - 0x10000) % 0x400 + 0xdc00;
//             result += String.fromCharCode(highSurrogate, lowSurrogate);
//           }
//         }
//         return result;
//     }
//     gi(`content-${(ev.event ? ev.data.uid : ev.uid)}`).innerText = content ? binaryToString(content) : binaryToString(ev.data.content);
//     el.scrollTop = el.scrollHeight;
// }
// const newc = (id = undefined) => {
//     if (!id){
//         return;
//     }
//     var id = id.toString();
//     if (self.c != id) {
//         gi('text').style.display = 'block';
//         gi(id).className = 'new-conversation selected';
//         if (self.c) {
//             gi(self.c).className = 'new-conversation';
//         }
//         var name = self.F[id].Name;
//         gi('conversation').innerHTML = name;
//         if (name) {
//             var el = gi('dialog');
//             if (el) {el.innerHTML = '';}
//             globalThis.you = {name: name, id: id};
//             send_json({"data": {"id":id,"name":name}, "event": "get-user"});
//         }
//         self.c = id;
//     }
// }

// const press = (ev) => {
//     if ((ev.code == "Enter" && !ev.shiftKey) && self.c) {
//         var id = (gi('dialog').childNodes.length) + 1;
//         if (!id){
//             id = 1;
//         }

//         var text = gi('text');
//         if (text.value.startsWith('\n')){
//             text.value = text.value.replace('\n', '');
//         }

//         var utf8ToBin = function( s ){
//             s = unescape( encodeURIComponent( s ) );
//             var chr, i = 0, l = s.length, out = '';
//             for( ; i < l; i ++ ){
//                 chr = s.charCodeAt( i ).toString( 2 );
//                 while( chr.length % 8 != 0 ){ chr = '0' + chr; }
//                 out += chr;
//             }
//             return out;
//         };
//         var error = gi('error_input');
//         if (utf8ToBin(text.value).length > 0x40000) {
//             error.innerHTML = 'Il y a trop de caractères';
//             return;
//         } else {
//             error.innerHTML = '';
//         }

//         message({author: "me", uid: id}, utf8ToBin(text.value));
//         if (text.value != ''){
//             send_json({"data": {"id": self.c, "uid": id, "content": utf8ToBin(text.value)}, "event": "send-message"});
//         }
//         text.value = '';
//     }
// }

// const select = (element, other = undefined) => {
//     globalThis.selected = element;
//     var els = document.getElementsByClassName(element);
//     for (el of els) {
//         el.style.display = 'block';
//     }

//     if (other){
//         if (other == 'spam') {
//             gi('spam-bar').display = 'block';
//         }

//         var els = document.getElementsByClassName(other);
//         for (el of els) {
//             el.style.display = 'none';
//         }
//     }
// }

// const dlm = (id) => {
//     if (!id.event) {
//         var is = true;
//         send_json({"data": {"id": self.c, "uid": id.replace('msg-', '')}, "event": "del-message"});
//     } else {
//         var is = false;
//         id = `msg-${id.data.uid}`;
//     }
//     let node = gi(`${id}`);
//     gi('editmessage').style.display = 'none';
//     if (node.className == 'you' && is) {
//         return;
//     }
//     if (node.parentNode) {
//         node.parentNode.removeChild(node);
//     }
// }

// (async function index(root){
//     if (!localStorage.getItem('T')){
//         location.href = `${location.origin}/Connexion`;
//     }

//     var body = gi('after-loading');
//     var el = document.createElement('div');
//     body.appendChild((function(){el.className='msg';id="msg";return el;})());
//     el.innerHTML = `<div id="editmessage" style="display: none;"><div><a name="edbutton" onclick="dlm(this.className);">Supprimer le message</a></div></div><div id="editbox" style="display: none;"><div><a name="edbutton" id="edfriend" onclick="edfriend(this.className)"></a></div></div><div class="friends"><div class="friend-select"><p onclick="_s('friend', 'spam');"><span class="notif" id="notif-friend">0</span> Amis</p><p onclick="_s('spam', 'friend');"><span class="notif" id="notif-spam">0</span> Nouveau Amis</p></div><div id="friends"><p id="no-friends">Tu n'a aucun amis</p></div><div class="messages" id="messages"></div>`
//     var friends = new (class friends{
//         constructor(){
//             this.body = gi('friends');
//         }
//         /**
//          * 
//          * @param {string} name 
//          * @param {number} id 
//          */
//         _new(name, id) {
//             gi('no-friends').style.display='none';
//             var count = gi('notif-friend');
//             count.innerHTML = parseInt(count.innerHTML)+1;
//             this.body.appendChild((function(){
//                 var el = document.createElement('div');
//                 el.className = 'friend';
//                 el.style.display = selected == 'friend' ? 'block' : 'none';
//                 el.innerHTML = `<a class="new-conversation" id="${id}" onclick="newc(${id});"><div class="icon-friend" style="background-image: url(${location.origin}/Libraries/Main/api/icon.php?id=${id});"><div class="actif" id="actif-${id}" style="background-color: red;"></div></div><span>${name}</span></a>`;
//                 return el;
//             })());
//         }
//         /**
//          * 
//          * @param {string} name 
//          * @param {number} id 
//          */
//         _spam(name, id) {
//             gi('no-friends').style.display='none';
//             var count = gi('notif-spam');
//             count.innerHTML = parseInt(count.innerHTML)+1;
//             this.body.appendChild((function(){
//                 var el = document.createElement('div');
//                 el.className = 'spam';
//                 el.style.display = selected == 'spam' ? 'block' : 'none';
//                 el.innerHTML = `<a class="new-conversation" id="${id}" onclick="newc(${id});"><div class="icon-friend" style="background-image: url(${location.origin}/Libraries/Main/api/icon.php?id=${id});"><div class="actif" id="actif-${id}" style="background-color: red;"></div></div><span>${name}</span></a>`;
//                 return el;
//             })());
//         }
//     })();
//     el.appendChild((function(){
//         var _el = document.createElement('div');
//         _el.innerHTML = `<h2 class="conversation" id="conversation">Aucune conversation n'a été séléctionner</h2><div id="dialog"></div><div><textarea style="display:none;" id="text" oninput="msg_input()"></textarea><div class="back-textarea"><p id="error_input"></p><span id="counter">0 / ${0x8000}</span></div></div>`
//         _el.className = 'dialog';
//         return _el;
//     })())
//     Ms['core.js'] = true;

//     var textarea = gi('text');

//     textarea.addEventListener('keypress', press);

//     const rep = await fetch(`${location.origin}/Libraries/Message/api/friends.php`, {headers:{Token:localStorage.getItem('T')}});
//     if (!rep.ok){
//         throw new Error(`${rep.status} on ${rep.url}`);
//     }
//     const _friends = await rep.json();
//     friends = new Map();
//     for (_friend of _friends){
//         friends.set(_friend.Id, _friend.Name);
//         if (_friend.Ok == "1") {
//             friends._new(_friend.Name, _friend.Id);
//         } else {
//             friends._spam(_friend.Name, _friend.Id);
//         }
//     }

//     var editbox;
//     var dialog = gi('dialog');

//     document.addEventListener('contextmenu', event => {event.stopPropagation();event.preventDefault()});
//     document.body.onmousedown = function(ev) {
//         if (editbox && ev.target.name != 'edbutton') {
//             editbox.style.display = 'none';
//             editbox = undefined;
//         }

//         if (ev.which == 3) {
//             if ((ev.srcElement.className == 'new-conversation' || ev.target.parentNode.className == 'new-conversation') || (ev.srcElement.className == 'new-conversation selected' || ev.target.parentNode.className == 'new-conversation selected')) {
//                 var els = document.getElementsByName('edbutton');
//                 for (el of els){
//                     el.className = ev.srcElement.id ? ev.srcElement.id : ev.target.parentNode.id;
//                 }

//                 var x = ev.x;
//                 var y = ev.y;
                
//                 editbox = gi('editbox');
//                 if (!editbox) {
//                     editbox = undefined;
//                 } else {
//                     editbox.style.display = 'block';
//                     editbox.style.top = `${y}px`;
//                     editbox.style.left = `${x}px`;

//                     var text = gi('edfriend');

//                     if (text) {
//                         text.innerHTML = selected == 'spam' ? 'Ajouter l\'amis' : 'Retirer l\'ami'
//                     }
//                 }
//             }
//             else
//             {
//                 var x = ev.x;
//                 var y = ev.y;

//                 var className;
//                 if (ev.target.parentNode.className == 'msg-head') {
//                     className = ev.target.parentNode.parentNode;
//                 } else if (ev.target.parentNode.className == 'me') {
//                     className = ev.target.parentNode;
//                 } else if (ev.target.parentNode.className == 'content') {
//                     className = ev.target.parentNode.parentNode;
//                 }
//                 if (className && (className.className == 'me' || className.className == 'you')) {
//                     var els = document.getElementsByName('edbutton');
//                     for (el of els){
//                         el.className = className.id;
//                     }

//                     editbox = gi('editmessage');

//                     if (!editbox) {
//                         editbox = undefined;
//                     } else {
//                         editbox.style.display = 'block';
//                         editbox.style.top = `${y}px`;
//                         editbox.style.left = `${x}px`;
//                     }
//                 }
//             }
//         }
//     }
//     self.M.add('/Libraries/gateway/Js/', 'gateway-core.js', 'text/javascript');
//     self.M.add('/Libraries/gateway/Js/', 'zlib.min.js', 'text/javascript');
//     self.M.add('/Libraries/AES/Js/', 'AES.js', 'text/javascript');

//     function is_ready(){
//         if (!self.modules.get('gateway-core.js') && !self.modules.get('AES.js')) {
//             setTimeout(() => {
//                 is_ready()
//             }, 100);
//         } else {
//         }
//     }
    
//     setTimeout(() => {
//         ready();
//     }, 1000);

//     // is_ready();
// });


// const statechange = (event) => {
//     if (self.config.state == 'error') {
//         // gi('message').innerHTML = 'Le serveur n\'a pas repondu';
//     } else if (self.config.state == "close") {
//         setTimeout(() => start(), 5000);
//     } else if (self.config.state == 'open') {
//         console.log('Serveur Connecté');
//         // send_json({'event': 'connected', 'data': {'T': self.me.Token}});
//     }
// }

// const connected = (event) => {
//     send_json({'event': 'connected', 'data': {'T': self.me.T}});
// }

// const ping = (ev) => {
//     console.log((new Date().getTime()-ev.time), 'ms')
// }

// const ready = () => {
//     __init__(`${location.host}:8080`);
//     start();

//     self.config.onstatechange = statechange;

//     self.config.modules.set('message', message);
//     self.config.modules.set('here', here);
//     self.config.modules.set('del-message', dlm);
//     self.config.modules.set('ok', edfriend);
//     self.config.modules.set('connected', connected);
//     self.config.modules.set('ping', ping)
// }



























const _s=(e,o=null)=>{self.S=e;for(var el of gbc(e)){el.style.display='block';}if(o){if(o=='spam'){try{gi('spam-bar').display='block';}catch(err){console.error(err);}}for(var el of gbc(o)){el.style.display='none';}}}
const nc=(i=null) => {if (!i){return;}var i = i.toString();if (self.c!=i) {gi('text').style.display='block';gi(i).className='new-conversation selected';if (self.c){gi(self.c).className='new-conversation';}const n = self.F[i].Name;gi('conversation').innerHTML = n;if (n) {const e = gi('dialog');if (e) {e.innerHTML = '';}self.you = {name: n, id: i};try{sj({"data": {"id":i,"name":n}, "event": "get-user"});} catch (err) {console.error(err);}}self.c = i;}}
const mi=()=>{var t=gi('text');var c=gi('counter');c.innerHTML=`${t.value.length} / ${0x8000}`;}
const _m=(e,c)=>{const _e=gi('dialog');const n=(e.event?e.data.author:e.author)=='me'?self.me.name:self.you.name;const i=(e.event?e.data.author:e.author)=='me'?self.me.id:self.you.id;new Elements('p',_e,{className:(e.event?e.data.author:e.author),id:`msg-${(e.event?e.data.uid:e.uid.toString())}`},`<div class="msg-head"><div class="msg-icon" style="background-image: url(${location.origin}/Libraries/Main/api/icon.php?id=${i})"></div><span>${n}</span></div><div class="content"><div id="content-${(e.event?e.data.uid:e.uid)}"></div></div>`);gi(`content-${(e.event?e.data.uid:e.uid)}`).innerText=c?c:e.data.content;_e.scrollTop=_e.scrollHeight;}
class f{constructor(){this.body = gi('friends');}a(n,i){gi('no-friends').style.display = 'none';const c = gi('notif-friend');c.innerHTML = parseInt(c.innerHTML)+1;new Elements('div', this.body, {className:'friend',style:`display:${self.S == 'friend' ? 'block' : 'none'}`}, `<a class="new-conversation" id="${i}" onclick="nc(${i});"><div class="icon-friend" style="background-image: url(${location.origin}/Libraries/Main/api/icon.php?id=${i});"><div class="actif" id="actif-${i}" style="background-color: red;"></div></div><span>${n}</span></a>`);}s(n,i){gi('no-friends').style.display = 'none';const c = gi('notif-spam');c.innerHTML = parseInt(c.innerHTML)+1;new Elements('div', this.body, {className:'spam',style:`display:${self.S == 'spam' ? 'block' : 'none'}`}, `<a class="new-conversation" id="${i}" onclick="nc(${i});"><div class="icon-friend" style="background-image: url(${location.origin}/Libraries/Main/api/icon.php?id=${i});"><div class="actif" id="actif-${i}" style="background-color: red;"></div></div><span>${n}</span></a>`);}};
const fs=(r)=>{for(var R of r){self.F[R.Id]=R;if(R.Ok==='1'){self.f.a(R.Name,R.Id);}else{self.f.s(R.Name,R.Id);}}};
const p = (e) => {if((e.keyCode==13&&!e.shiftKey)&&self.c){var i=(gi('dialog').childNodes.length)+1;if(!i){i=1;}var t=gi('text');if(t.value.startsWith('\n')){t.value=t.value.replace('\n','');}var e=gi('error_input');if(t.value.length>0x8000){e.innerHTML='Il y a trop de caractères';return;}else{e.innerHTML='';};if(t.value!=''){_m({author:'me',uid:i},t.value);try{sj({"data":{"id":self.c,"uid": i,"content":t.value},"event": "send-message"});}catch(err){console.error(err);}}t.value='';}}
(function cb() {
const body = gi('after-loading');
const e = new Elements('div', body, {id:'msg',className:'msg'}, `<div id="editmessage" style="display: none;"><div><a name="edbutton" onclick="dlm(this.className);">Supprimer le message</a></div></div><div id="editbox" style="display: none;"><div><a name="edbutton" id="edfriend" onclick="edfriend(this.className)"></a></div></div><div class="friends"><div class="friend-select"><p onclick="_s('friend', 'spam');"><span class="notif" id="notif-friend">0</span> Amis</p><p onclick="_s('spam', 'friend');"><span class="notif" id="notif-spam">0</span> Nouveau Amis</p></div><div id="friends"><p id="no-friends">Tu n'a aucun amis</p></div><div class="messages" id="messages"></div>`);
new Elements('div', e, {className:'dialog'}, `<h2 class="conversation" id="conversation">Aucune conversation n'a été séléctionner</h2><div id="dialog"></div><div><textarea style="display:none;" id="text" oninput="mi()"></textarea><div class="back-textarea"><p id="error_input"></p><span id="counter">0 / ${0x8000}</span></div></div>`);
self.f = new f();
gi('text').addEventListener('keypress', p);
send(`${location.origin}/Libraries/Message/api/friends.php`, {}, {headers:{T:self.me.T}}).then((r)=>{stj(r,fs)}).catch((err)=>{});
})();

Ms['core.js'] = true;





































// (async function index(root){
//     var editbox;
//     var dialog = gi('dialog');

//     document.addEventListener('contextmenu', event => {event.stopPropagation();event.preventDefault()});
//     document.body.onmousedown = function(ev) {
//         if (editbox && ev.target.name != 'edbutton') {
//             editbox.style.display = 'none';
//             editbox = undefined;
//         }

//         if (ev.which == 3) {
//             if ((ev.srcElement.className == 'new-conversation' || ev.target.parentNode.className == 'new-conversation') || (ev.srcElement.className == 'new-conversation selected' || ev.target.parentNode.className == 'new-conversation selected')) {
//                 var els = document.getElementsByName('edbutton');
//                 for (el of els){
//                     el.className = ev.srcElement.id ? ev.srcElement.id : ev.target.parentNode.id;
//                 }

//                 var x = ev.x;
//                 var y = ev.y;
                
//                 editbox = gi('editbox');
//                 if (!editbox) {
//                     editbox = undefined;
//                 } else {
//                     editbox.style.display = 'block';
//                     editbox.style.top = `${y}px`;
//                     editbox.style.left = `${x}px`;

//                     var text = gi('edfriend');

//                     if (text) {
//                         text.innerHTML = selected == 'spam' ? 'Ajouter l\'amis' : 'Retirer l\'ami'
//                     }
//                 }
//             }
//             else
//             {
//                 var x = ev.x;
//                 var y = ev.y;

//                 var className;
//                 if (ev.target.parentNode.className == 'msg-head') {
//                     className = ev.target.parentNode.parentNode;
//                 } else if (ev.target.parentNode.className == 'me') {
//                     className = ev.target.parentNode;
//                 } else if (ev.target.parentNode.className == 'content') {
//                     className = ev.target.parentNode.parentNode;
//                 }
//                 if (className && (className.className == 'me' || className.className == 'you')) {
//                     var els = document.getElementsByName('edbutton');
//                     for (el of els){
//                         el.className = className.id;
//                     }

//                     editbox = gi('editmessage');

//                     if (!editbox) {
//                         editbox = undefined;
//                     } else {
//                         editbox.style.display = 'block';
//                         editbox.style.top = `${y}px`;
//                         editbox.style.left = `${x}px`;
//                     }
//                 }
//             }
//         }
//     }
//     self.M.add('/Libraries/gateway/Js/', 'gateway-core.js', 'text/javascript');
//     self.M.add('/Libraries/gateway/Js/', 'zlib.min.js', 'text/javascript');
//     self.M.add('/Libraries/AES/Js/', 'AES.js', 'text/javascript');

//     function is_ready(){
//         if (!self.modules.get('gateway-core.js') && !self.modules.get('AES.js')) {
//             setTimeout(() => {
//                 is_ready()
//             }, 100);
//         } else {
//         }
//     }
    
//     setTimeout(() => {
//         ready();
//     }, 1000);

//     // is_ready();
// });


