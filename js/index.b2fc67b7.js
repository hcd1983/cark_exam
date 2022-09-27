(function(){"use strict";var e={1312:function(e,t,l){var a=l(1931),n=l(6265),s=l.n(n);const r=(e,t)=>{e.sort(((e,l)=>{const a=e[t],n=l[t],s=Math.min(a.length,n.length);for(let t=0;t<s;t++)if(a[t].charCodeAt()!==n[t].charCodeAt())return a[t].charCodeAt()-n[t].charCodeAt();return a.length-n.length}))},u=(e,t)=>{e.sort(((e,l)=>e[t]-l[t]))};async function o(){const e={url:"https://api.spacexdata.com/v5/launches",method:"get"},{data:t}=await s()(e),l=t.map((e=>e.name));return(0,a.n0)({models:{launch:a.Hn,keyword:a.Hn},seeds(e){t.forEach((t=>{e.create("launch",{...t})}))},routes(){this.get("/api/launches",((e,t)=>{const l={perPage:20,page:1,isSuccess:null,search:null,sortBy:"date_unix",sort:"asc"},{models:a}=e.launches.all(),{page:n,perPage:s,search:o,sortBy:i,isSuccess:c,sort:p}={...l,...t.queryParams};let d=[...a];if(o){const e=o,t=new RegExp(e,"gi");d=d.filter((e=>t.test(e.name)))}null!==c&&(d=d.filter((e=>e.success===("true"===c)))),i&&p&&("date_unix"===i?u(d,i):"name"===i&&r(d,i),"desc"===p&&d.reverse());const g=d.length,v=(n-1)*s;return d=d.slice(v,v+s),{total:g,launches:d}})),this.get("/api/suggestions",((e,t)=>{const{search:a}=t.queryParams;if(!a)return[];const n=a,s=new RegExp(n,"gi");return l.filter((e=>s.test(e))).slice(0,10)}))}}),Promise.resolve()}var i=l(9242),c=l(3396),p=l(4870),d=l(7139);const g=(e,t)=>{if(!e)return;const l=l=>{const a=e.value;a&&(a.contains(l.target)||"function"===typeof t&&t())};(0,c.bv)((()=>{window.addEventListener("click",l)})),(0,c.Jd)((()=>{window.removeEventListener("click",l)}))};var v=g;const m=["value","placeholder","onKeydown"],f={key:0,class:"absolute w-full top-full bg-gray-100"},y={class:"grid gap-2"},w=["onClick","onMouseenter","onFocus"];var h={__name:"AutocompleteInput",props:{suggestions:Array,placeholder:String},emits:["change","submit"],setup(e,{emit:t}){const l=e,{suggestions:a,placeholder:n}=(0,p.BK)(l),s=(0,p.iH)(null),r=(0,p.iH)(""),u=(0,p.iH)(null),o=(0,p.iH)(!0),g=(0,c.Fl)((()=>a.value.length&&null!==u.value?a.value[u.value]:null)),h=()=>{u.value=null,o.value=!1},b=e=>{o.value=!0,t("change",e.target.value),r.value=e.target.value},x=()=>{o.value&&(u.value?u.value-=1:u.value=a.value.length-1)},k=()=>{o.value&&(null===u.value||u.value===a.value.length-1?u.value=0:u.value+=1)},_=e=>{e.preventDefault(),o.value?h():(r.value="",t("submit",null))},D=e=>{g.value?(r.value=g.value,t("submit",g.value)):t("submit",e.target.value),h()},P=e=>{u.value=e,r.value=g.value,t("submit",g.value),h()};return v(s,h),(e,t)=>((0,c.wg)(),(0,c.iD)("div",{ref_key:"el",ref:s,class:"relative"},[(0,c._)("input",{value:r.value,placeholder:(0,p.SU)(n),onInput:b,onKeydown:[(0,i.D2)(x,["up"]),(0,i.D2)(k,["down"]),(0,i.D2)(_,["esc"]),(0,i.D2)(D,["enter"])],type:"search",class:"border-gray-700 border w-full py-3 px-2 outline-none rounded-md"},null,40,m),o.value?((0,c.wg)(),(0,c.iD)("div",f,[(0,c._)("ul",y,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)((0,p.SU)(a),((e,l)=>((0,c.wg)(),(0,c.iD)("li",{key:e,class:(0,d.C_)([""+(u.value===l?"bg-gray-700 text-white":"")])},[(0,c._)("button",{onClick:(0,i.iM)((e=>P(l)),["prevent"]),onMouseenter:(0,i.iM)((e=>u.value=l),["prevent"]),onMouseleave:t[0]||(t[0]=(0,i.iM)((e=>u.value=null),["prevent"])),onFocus:e=>u.value=l,onBlur:t[1]||(t[1]=e=>u.value=null),class:"w-full flex items-center justify-start px-1 py-2 outline-none"},(0,d.zw)(e),41,w)],2)))),128))])])):(0,c.kq)("",!0)],512))}};const b=h;var x=b;const k={key:0},_={class:"bg-black text-white"},D=(0,c.Uk)(" No Data ");var P={__name:"DataTable",props:{cols:{type:Array,default(){return[]}},rows:{type:Array,default(){return[]}}},setup(e){const t=e,{cols:l,rows:a}=(0,p.BK)(t);return(e,t)=>(0,p.SU)(l).length&&(0,p.SU)(a).length?((0,c.wg)(),(0,c.iD)("table",k,[(0,c._)("thead",_,[(0,c._)("tr",null,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)((0,p.SU)(l),(e=>((0,c.wg)(),(0,c.iD)("th",{key:e.key},(0,d.zw)(e.label),1)))),128))])]),(0,c._)("tbody",null,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)((0,p.SU)(a),((t,a)=>((0,c.wg)(),(0,c.iD)("tr",{key:a,class:"even:bg-gray-200"},[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)((0,p.SU)(l),(l=>((0,c.wg)(),(0,c.iD)("td",{key:`${a}-${l.key}`,class:(0,d.C_)([l.tdClass,"py-1 align-middle"])},[(0,c.WI)(e.$slots,l.key,{data:t},(()=>[(0,c.Uk)((0,d.zw)(`${["string","number","boolean"].includes(typeof t[l.key])?t[l.key]:""}`),1)]))],2)))),128))])))),128))])])):((0,c.wg)(),(0,c.iD)(c.HY,{key:1},[D],64))}};const C=P;var S=C;const H={key:0,class:"flex gap-3 items-center"},U={class:"font-bold"},j=["onUpdate:modelValue"],M=["value","selected"];var K={__name:"FilterPanel",props:{inputs:Array,values:Object},setup(e){const t=e,{inputs:l,values:a}=(0,p.BK)(t);return(e,t)=>((0,c.wg)(),(0,c.iD)("div",null,[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)((0,p.SU)(l),(e=>((0,c.wg)(),(0,c.iD)(c.HY,{key:e.key},["select"===e.type?((0,c.wg)(),(0,c.iD)("div",H,[(0,c._)("label",U,(0,d.zw)(e.label),1),(0,c.wy)((0,c._)("select",{"onUpdate:modelValue":t=>(0,p.SU)(a)[e.key]=t,class:"flex-1 border px-2 py-1"},[((0,c.wg)(!0),(0,c.iD)(c.HY,null,(0,c.Ko)(e.options,(({value:t,text:l})=>((0,c.wg)(),(0,c.iD)("option",{key:t,value:t,selected:t===(0,p.SU)(a)[e.key]},(0,d.zw)(l),9,M)))),128))],8,j),[[i.bM,(0,p.SU)(a)[e.key]]])])):(0,c.kq)("",!0)],64)))),128))]))}};const O=K;var Y=O,A={props:{time:Date},setup(e){return()=>`${e.time.getFullYear()} / ${e.time.getMonth()+1} / ${e.time.getDate()}`}};const q=A;var F=q,B={name:"Pagination",props:{totalItems:Number,perPage:Number,current:Number},setup(e,t){const{totalItems:l,perPage:a,current:n}=(0,p.BK)(e),s=(0,c.Fl)((()=>{const e=Math.ceil(l.value/a.value),t=n.value<e?n.value+1:null,s=n.value>1?n.value-1:null;return{totalPages:e,current:n,totalItems:l,nextPage:t,prevPage:s}}));return()=>t.slots.default?.(s.value)??""}};const I=B;var z=I;let E=null;function T(e,t){return function(...l){E&&clearTimeout(E);const a=this;E=setTimeout((()=>{e.apply(a,l)}),t)}}var $=T;const N={id:"wrap"},W={class:"container mx-auto px-3 py-10 max-w-[900px]"},L=(0,c._)("h2",{class:"text-3xl font-bold mb-3"},"Autocomplete with debounce",-1),R=(0,c._)("h2",{class:"text-3xl font-bold mt-10"},"Object Piker Filter",-1),V=(0,c._)("h2",{class:"text-3xl font-bold mt-10 mb-3"},"Pagination with renderless component",-1),J={key:0,class:"flex justify-center justify-between"},G={class:"flex gap-3 items-center"},Q=(0,c._)("label",null,"每頁顯示",-1),X=["value"],Z={class:"flex items-center gap-2"},ee={class:"grid grid-cols-2"},te=["disabled","onClick"],le=["disabled","onClick"],ae=(0,c._)("h2",{class:"text-3xl font-bold mt-10"},"DataTable",-1),ne=["src","alt"],se={key:0,class:"py-1 px-2 bg-green-700 text-white text-sm rounded-lg flex w-fit mx-auto"},re={key:1,class:"py-1 px-2 bg-red-700 text-white text-sm rounded-lg flex w-fit mx-auto"};var ue={__name:"App",setup(e){const t=(0,p.iH)([]),l=(0,p.iH)([]),a=(0,p.iH)(""),n=(0,p.iH)(0),r=(0,p.qj)({perPage:20,page:1}),u=(0,p.qj)({isSuccess:null,sortBy:"date_unix",sort:"asc"}),o=(0,c.Fl)((()=>({search:a.value,...u,...r}))),g=[{label:"Mission",key:"name",tdClass:"text-center font-bold w-[150px]"},{label:"Date",key:"date",tdClass:"text-center w-[150px]"},{label:"Description",key:"details",tdClass:"line-clamp-3"},{label:"Logo",key:"logo",tdClass:"w-[120px]"},{label:"Status",key:"success",tdClass:"w-[100px]"}],v=[{type:"select",key:"sortBy",label:"排序依",options:[{text:"任務名稱",value:"name"},{text:"任務日期",value:"date_unix"}]},{type:"select",key:"sort",label:"排序",options:[{text:"ASC",value:"asc"},{text:"DESC",value:"desc"}]},{type:"select",key:"isSuccess",label:"任務狀態",options:[{text:"全部顯示",value:null},{text:"成功",value:!0},{text:"失敗",value:!1}]}],m=()=>{const e={params:o.value};s().get("/api/launches",e).then((({data:e})=>{t.value=e.launches,n.value=e.total}))},f=$((e=>{const t={params:{search:e}};s().get("/api/suggestions",t).then((({data:e})=>{l.value=e}))}),500),y=e=>{a.value=e};return(0,c.Rh)((()=>{m()})),(0,c.YP)(u,(()=>{r.page=1}),{deep:!0}),(0,c.YP)((()=>r.perPage),((e,t)=>{e!==t&&(r.page=1)})),(0,c.YP)(a,(()=>{r.page=1,u.isSuccess=null})),(e,a)=>((0,c.wg)(),(0,c.iD)("div",N,[(0,c._)("div",W,[L,(0,c.Wm)(x,{suggestions:l.value,placeholder:"Please Type Mission Name",onChange:(0,p.SU)(f),onSubmit:y},null,8,["suggestions","onChange"]),R,(0,c.Wm)(Y,{class:"grid grid-cols-2 gap-5 md:grid-cols-3 mt-3",inputs:v,values:u,"onUpdate:values":a[0]||(a[0]=e=>(0,p.dq)(u)?u.value=e:null)},null,8,["values"]),(0,c.Wm)(z,{totalItems:n.value,perPage:r.perPage,current:r.page},{default:(0,c.w5)((({totalPages:e,totalItems:t,nextPage:l,prevPage:n,current:s})=>[V,e>1?((0,c.wg)(),(0,c.iD)("div",J,[(0,c._)("div",G,[Q,(0,c.wy)((0,c._)("select",{"onUpdate:modelValue":a[1]||(a[1]=e=>r.perPage=e),class:"flex-1 border px-2 py-1"},[((0,c.wg)(),(0,c.iD)(c.HY,null,(0,c.Ko)([5,10,20,30],(e=>(0,c._)("option",{key:e,value:e},(0,d.zw)(e),9,X))),64))],512),[[i.bM,r.perPage]])]),(0,c._)("div",Z,[(0,c._)("div",ee,[(0,c._)("button",{disabled:!n,onClick:e=>r.page=n,class:"flex items-center justify-center w-[100px] text-white bg-gray-600 cursor-pointer hover:bg-black border-r border-gray-100 rounded-l-lg"}," Prev ",8,te),(0,c._)("button",{disabled:!l,onClick:e=>r.page=l,class:"flex items-center justify-center w-[100px] text-white bg-gray-600 cursor-pointer hover:bg-black border-l border-gray-100 rounded-r-lg"}," Next ",8,le)]),(0,c._)("div",null,(0,d.zw)(s)+" / "+(0,d.zw)(e),1)])])):(0,c.kq)("",!0)])),_:1},8,["totalItems","perPage","current"]),ae,(0,c.Wm)(S,{rows:t.value,cols:g,class:"mt-10 w-full"},{logo:(0,c.w5)((({data:e})=>[e.links.patch.small?((0,c.wg)(),(0,c.iD)("img",{key:0,src:e.links.patch.small,alt:e.name,class:"w-[100px] h-[100px] mx-auto object-contain"},null,8,ne)):(0,c.kq)("",!0)])),date:(0,c.w5)((({data:e})=>[(0,c.Wm)(F,{time:new Date(1e3*e.date_unix)},null,8,["time"])])),success:(0,c.w5)((({data:e})=>[!0===e.success?((0,c.wg)(),(0,c.iD)("div",se," Success ")):!1===e.success?((0,c.wg)(),(0,c.iD)("div",re," Fail ")):(0,c.kq)("",!0)])),_:1},8,["rows"])])]))}};const oe=ue;var ie=oe;const ce=async()=>{await o(),(0,i.ri)(ie).mount("#app")};ce()}},t={};function l(a){var n=t[a];if(void 0!==n)return n.exports;var s=t[a]={id:a,loaded:!1,exports:{}};return e[a](s,s.exports,l),s.loaded=!0,s.exports}l.m=e,function(){var e=[];l.O=function(t,a,n,s){if(!a){var r=1/0;for(c=0;c<e.length;c++){a=e[c][0],n=e[c][1],s=e[c][2];for(var u=!0,o=0;o<a.length;o++)(!1&s||r>=s)&&Object.keys(l.O).every((function(e){return l.O[e](a[o])}))?a.splice(o--,1):(u=!1,s<r&&(r=s));if(u){e.splice(c--,1);var i=n();void 0!==i&&(t=i)}}return t}s=s||0;for(var c=e.length;c>0&&e[c-1][2]>s;c--)e[c]=e[c-1];e[c]=[a,n,s]}}(),function(){l.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return l.d(t,{a:t}),t}}(),function(){l.d=function(e,t){for(var a in t)l.o(t,a)&&!l.o(e,a)&&Object.defineProperty(e,a,{enumerable:!0,get:t[a]})}}(),function(){l.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"===typeof window)return window}}()}(),function(){l.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)}}(),function(){l.nmd=function(e){return e.paths=[],e.children||(e.children=[]),e}}(),function(){var e={826:0};l.O.j=function(t){return 0===e[t]};var t=function(t,a){var n,s,r=a[0],u=a[1],o=a[2],i=0;if(r.some((function(t){return 0!==e[t]}))){for(n in u)l.o(u,n)&&(l.m[n]=u[n]);if(o)var c=o(l)}for(t&&t(a);i<r.length;i++)s=r[i],l.o(e,s)&&e[s]&&e[s][0](),e[s]=0;return l.O(c)},a=self["webpackChunkcark_exam"]=self["webpackChunkcark_exam"]||[];a.forEach(t.bind(null,0)),a.push=t.bind(null,a.push.bind(a))}();var a=l.O(void 0,[998],(function(){return l(1312)}));a=l.O(a)})();
//# sourceMappingURL=index.b2fc67b7.js.map