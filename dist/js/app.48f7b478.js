(function(t){function e(e){for(var r,a,o=e[0],u=e[1],c=e[2],d=0,f=[];d<o.length;d++)a=o[d],Object.prototype.hasOwnProperty.call(s,a)&&s[a]&&f.push(s[a][0]),s[a]=0;for(r in u)Object.prototype.hasOwnProperty.call(u,r)&&(t[r]=u[r]);l&&l(e);while(f.length)f.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var t,e=0;e<i.length;e++){for(var n=i[e],r=!0,a=1;a<n.length;a++){var o=n[a];0!==s[o]&&(r=!1)}r&&(i.splice(e--,1),t=u(u.s=n[0]))}return t}var r={},a={app:0},s={app:0},i=[];function o(t){return u.p+"js/"+({}[t]||t)+"."+{"chunk-ba394f2c":"d43fce40","chunk-f2871e72":"89ab8d5d"}[t]+".js"}function u(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(t){var e=[],n={"chunk-ba394f2c":1,"chunk-f2871e72":1};a[t]?e.push(a[t]):0!==a[t]&&n[t]&&e.push(a[t]=new Promise((function(e,n){for(var r="css/"+({}[t]||t)+"."+{"chunk-ba394f2c":"bd9687c4","chunk-f2871e72":"b2edebf7"}[t]+".css",s=u.p+r,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var c=i[o],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===r||d===s))return e()}var f=document.getElementsByTagName("style");for(o=0;o<f.length;o++){c=f[o],d=c.getAttribute("data-href");if(d===r||d===s)return e()}var l=document.createElement("link");l.rel="stylesheet",l.type="text/css",l.onload=e,l.onerror=function(e){var r=e&&e.target&&e.target.src||s,i=new Error("Loading CSS chunk "+t+" failed.\n("+r+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=r,delete a[t],l.parentNode.removeChild(l),n(i)},l.href=s;var m=document.getElementsByTagName("head")[0];m.appendChild(l)})).then((function(){a[t]=0})));var r=s[t];if(0!==r)if(r)e.push(r[2]);else{var i=new Promise((function(e,n){r=s[t]=[e,n]}));e.push(r[2]=i);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,u.nc&&d.setAttribute("nonce",u.nc),d.src=o(t);var f=new Error;c=function(e){d.onerror=d.onload=null,clearTimeout(l);var n=s[t];if(0!==n){if(n){var r=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;f.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",f.name="ChunkLoadError",f.type=r,f.request=a,n[1](f)}s[t]=void 0}};var l=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(e)},u.m=t,u.c=r,u.d=function(t,e,n){u.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},u.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},u.t=function(t,e){if(1&e&&(t=u(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)u.d(n,r,function(e){return t[e]}.bind(null,r));return n},u.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return u.d(e,"a",e),e},u.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},u.p="/dongbb/",u.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=e,c=c.slice();for(var f=0;f<c.length;f++)e(c[f]);var l=d;i.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},"22db":function(t,e,n){"use strict";n.d(e,"f",(function(){return o})),n.d(e,"i",(function(){return u})),n.d(e,"a",(function(){return c})),n.d(e,"d",(function(){return d})),n.d(e,"c",(function(){return f})),n.d(e,"b",(function(){return l})),n.d(e,"e",(function(){return m})),n.d(e,"h",(function(){return p})),n.d(e,"g",(function(){return g}));n("b0c0");var r=n("365c"),a=n("b279"),s=n("4328"),i=n.n(s),o=function(t){return r["b"].request({url:"/sysmenu/tree",method:"post",data:i.a.stringify({menuNameLike:t.name,menuStatus:t.status})})},u=function(t){return r["b"].request({url:"/sysmenu/update",method:"post",data:t})},c=function(t){return r["b"].request({url:"/sysmenu/add",method:"post",data:t})},d=function(t){return r["b"].request({url:"/sysmenu/delete",method:"post",data:t})},f=function(t,e){return r["b"].request({url:"/sysmenu/status/change",method:"post",data:i.a.stringify({menuId:t,status:e})})},l=function(t,e){return r["b"].request({url:"/sysmenu/hidden/change",method:"post",data:i.a.stringify({menuId:t,hidden:e})})},m=function(t){return r["b"].request({url:"/sysmenu/checkedtree",method:"post",data:i.a.stringify({roleId:t})})},p=function(t,e){return r["b"].request({url:"/sysmenu/savekeys",method:"post",data:{roleId:t,checkedIds:e}})},g=function(){return r["b"].request({url:"/sysmenu/tree/user",method:"post",data:i.a.stringify({username:Object(a["b"])()})})}},"365c":function(t,e,n){"use strict";n("d3b7");var r=n("d4ec"),a=n("bee2"),s=n("bc3a"),i=n.n(s),o=n("b279"),u=n("5c96"),c=function(){function t(e){Object(r["a"])(this,t),this.baseUrl=e}return Object(a["a"])(t,[{key:"initConfig",value:function(){var t={baseURL:this.baseUrl,headers:{}};return t}},{key:"request",value:function(t){var e=i.a.create();return e.interceptors.response.use((function(t){var e=t.data;if(e.isok)return e;throw e}),(function(t){if(t&&t.response)switch(t.response.status){case 400:t.message=t.response.data.message;break;case 401:t.message="未授权，请重新登录";break;case 403:t.message="访问权限不足，拒绝访问！";break;case 404:t.message="请求错误,未找到该资源";break;case 405:t.message="请求方法未允许";break;case 408:t.message="请求超时";break;case 500:t.message=t.response.data.message;break;case 501:t.message="网络未实现";break;case 502:t.message="网络错误";break;case 503:t.message="服务不可用";break;case 504:t.message="网络超时";break;case 505:t.message="http版本不支持该请求";break;default:t.message="未知错误".concat(t.response.data.message)}else t.message="连接到服务器失败";return Object(u["Message"])({message:t.message,type:"error"}),Promise.reject(t)})),e.interceptors.request.use((function(t){return"/authentication"!==t.url&&(t.headers["JWTHeaderName"]=Object(o["a"])()),t})),t=Object.assign(this.initConfig(),t),e(t)}}]),t}(),d=c;n.d(e,"a",(function(){return f})),n.d(e,"b",(function(){return l}));var f="http://localhost:8201",l=new d(f)},4032:function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"d",(function(){return o})),n.d(e,"e",(function(){return u})),n.d(e,"a",(function(){return c})),n.d(e,"b",(function(){return d}));var r=n("365c"),a=n("4328"),s=n.n(a),i=function(){return r["b"].request({url:"/sysdict/all",method:"post"})},o=function(t,e){return r["b"].request({url:"/sysdict/query",method:"post",data:s.a.stringify({groupName:t,groupCode:e})})},u=function(t){return r["b"].request({url:"/sysdict/update",method:"post",data:t})},c=function(t){return r["b"].request({url:"/sysdict/add",method:"post",data:t})},d=function(t){return r["b"].request({url:"/sysdict/delete",method:"post",data:s.a.stringify({id:t})})}},"438f":function(t,e,n){t.exports=n.p+"img/register.993f7d29.svg"},"44ef":function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("router-view")],1)},s=[],i={name:"app",components:{}},o=i,u=(n("5c0b"),n("2877")),c=Object(u["a"])(o,a,s,!1,null,null,null),d=c.exports,f=(n("b0c0"),n("2909")),l=n("8c4f"),m=(n("d3b7"),n("a55b")),p=[{path:"/",name:"login",component:m["default"]},{path:"/home",component:function(){return n.e("chunk-ba394f2c").then(n.bind(null,"bb51"))},children:[{path:"",redirect:"firstpage"}]}],g=n("5fe0"),b=n("b279"),h=n("2f62"),v={},y={},w={},k=(n("7db0"),n("6ec8")),C=n("4032"),q=n("bc3a"),j=n.n(q),O={sysconfig:[],sysdict:[]},_={loadSysConfig:function(t){var e=t.state;return new Promise((function(t,n){(e.sysconfig.length<=0||e.sysdict.length<=0)&&j.a.all([Object(k["c"])(),Object(C["c"])()]).then(j.a.spread((function(t,n){e.sysconfig=t.data,e.sysdict=n.data}))),t()}))},refreshConfig:function(t){var e=t.state;return new Promise((function(t,n){Object(k["e"])().then((function(n){e.sysconfig=n.data,t()}))}))},refreshDict:function(t){var e=t.state;return new Promise((function(t,n){Object(C["c"])().then((function(n){e.sysdict=n.data,t()}))}))}},S={},N={getSysConfigItem:function(t){return function(e){return t.sysconfig.find((function(t){return t.paramKey===e})).paramValue}},getSysDictName:function(t){return function(e,n){return t.sysdict.find((function(t){return t.groupCode===e&&t.itemValue===String(n)})).itemName}}},T={state:O,actions:_,mutations:S,getters:N},x=(n("4de4"),n("4160"),n("45fc"),n("ac1f"),n("5319"),n("159b"),n("22db")),E="/home",L=E+"/firstpage",P={maintabs:[{route:L,name:"首页",closable:!1}],activeRoute:L,activeTabName:"",menuList:[]},F={addTab:function(t,e){var n=t.state,r=t.commit;Object(x["g"])().then((function(t){n.menuList=t.data,r("addTabMutation",e)}))}},I={addTabMutation:function(t,e){var n=t.maintabs.some((function(t){return t.route===e}));this.commit("findMenuNameByRoute",e),t.activeRoute=e,n||""===t.activeTabName||t.maintabs.push({route:e,name:t.activeTabName});var r=[];for(var a in R(t.menuList,r),p)p[a].path===E&&(p[a].children=r);D.$addRoutes(p)},removeTab:function(t,e){e!==L&&(t.maintabs=t.maintabs.filter((function(t){return t.route!==e})),t.activeRoute=t.maintabs[t.maintabs.length-1].route)},findMenuNameByRoute:function(t,e){var n;for(var r in t.menuList){var a=t.menuList[r].children.filter((function(t){return t.path===e}));if(a.length>0){n=a[0];break}}t.activeTabName=n?n.name:""}},M={};function R(t,e){for(var r in t)t[r].children.forEach((function(t){t.isLeaf?e.push({path:t.url.replace(E+"/",""),name:t.url.replace(E+"/",""),component:function(e){n.e("chunk-f2871e72").then(function(){var r=[n("4b3b")("./"+t.viewImport)];e.apply(null,r)}.bind(this)).catch(n.oe)}}):R(t.children,e)}))}var V={state:P,actions:F,mutations:I,getters:M};r["default"].use(h["a"]);var B=new h["a"].Store({state:{},mutations:v,actions:w,getters:y,modules:{system:T,maintabs:V}}),$=n("323e"),U=n.n($);n("a5d8");r["default"].use(l["a"]);var A=new l["a"]({mode:"history",base:"/dongbb/",routes:Object(f["a"])(p)});A.$addRoutes=function(t){A.matcher=(new l["a"]).matcher,A.addRoutes(t)},A.beforeEach((function(t,e,n){"login"!==t.name?(U.a.start(),Object(g["i"])().then((function(t){null==t.data?(n({name:"login"}),Object(b["c"])("")):(B.dispatch("loadSysConfig").then((function(t){n()})),Object(b["c"])(t.data))}))):(n(),Object(b["c"])(""))})),A.afterEach((function(t,e){"login"!==t.name&&(B.dispatch("addTab",t.path),U.a.done())}));var D=A,J=n("5c96"),z=n.n(J);n("0fae"),n("1f54");r["default"].use(z.a),r["default"].config.productionTip=!1,new r["default"]({router:D,store:B,render:function(t){return t(d)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var r=n("9c0c"),a=n.n(r);a.a},"5fe0":function(t,e,n){"use strict";n.d(e,"g",(function(){return o})),n.d(e,"i",(function(){return u})),n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return d})),n.d(e,"k",(function(){return f})),n.d(e,"a",(function(){return l})),n.d(e,"d",(function(){return m})),n.d(e,"b",(function(){return p})),n.d(e,"j",(function(){return g})),n.d(e,"h",(function(){return b})),n.d(e,"c",(function(){return h}));var r=n("365c"),a=n("b279"),s=n("4328"),i=n.n(s),o=function(t,e){return r["b"].request({url:"/authentication",method:"post",data:{username:t,password:e}})},u=function(){return r["b"].request({url:"/refreshtoken",method:"get"})},c=function(){return r["b"].request({url:"/sysuser/info",method:"get",params:{username:Object(a["b"])()}})},d=function(t,e){return r["b"].request({url:"/sysuser/query",method:"post",data:i.a.stringify({orgId:t.orgId,username:t.username,phone:t.phone,email:t.email,enabled:t.enabled,createStartTime:t.timeRange[0],createEndTime:t.timeRange[1],pageNum:e.pageNum,pageSize:e.pageSize})})},f=function(t){return r["b"].request({url:"/sysuser/update",method:"post",data:t})},l=function(t){return r["b"].request({url:"/sysuser/add",method:"post",data:t})},m=function(t){return r["b"].request({url:"/sysuser/delete",method:"post",data:i.a.stringify({username:t})})},p=function(t,e){return r["b"].request({url:"/sysuser/enabled/change",method:"post",data:i.a.stringify({username:t,enabled:e})})},g=function(t){return r["b"].request({url:"/sysuser/pwd/reset",method:"post",data:i.a.stringify({username:t})})},b=function(){return r["b"].request({url:"/sysuser/pwd/isdefault",method:"post",data:i.a.stringify({username:Object(a["b"])()})})},h=function(t,e){return r["b"].request({url:"/sysuser/pwd/change",method:"post",data:i.a.stringify({username:Object(a["b"])(),oldPass:t,newPass:e})})}},"6ec8":function(t,e,n){"use strict";n.d(e,"c",(function(){return i})),n.d(e,"e",(function(){return o})),n.d(e,"d",(function(){return u})),n.d(e,"f",(function(){return c})),n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return f}));var r=n("365c"),a=n("4328"),s=n.n(a),i=function(){return r["b"].request({url:"/sysconfig/all",method:"post"})},o=function(){return r["b"].request({url:"/sysconfig/refresh",method:"post"})},u=function(t){return r["b"].request({url:"/sysconfig/query",method:"post",data:s.a.stringify({configLike:t})})},c=function(t){return r["b"].request({url:"/sysconfig/update",method:"post",data:t})},d=function(t){return r["b"].request({url:"/sysconfig/add",method:"post",data:t})},f=function(t){return r["b"].request({url:"/sysconfig/delete",method:"post",data:s.a.stringify({configId:t})})}},"711a":function(t,e,n){t.exports=n.p+"img/wx-zimug-ketang.593ad9d4.png"},7570:function(t,e,n){"use strict";var r=n("44ef"),a=n.n(r);a.a},"9c0c":function(t,e,n){},a55b:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"forms-container"},[r("div",{staticClass:"signin-signup"},[r("form",{staticClass:"sign-in-form",attrs:{action:""}},[r("h2",{staticClass:"title"},[t._v("DongBB")]),r("h2",{staticClass:"title"},[t._v("前后端分离权限管理系统")]),r("div",{staticClass:"input-field"},[r("i",{staticClass:"fa fa-user"}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.loginForm.username,expression:"loginForm.username"}],attrs:{type:"text",placeholder:"Username"},domProps:{value:t.loginForm.username},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"username",e.target.value)}}})]),r("div",{staticClass:"input-field"},[r("i",{staticClass:"fa fa-lock"}),r("input",{directives:[{name:"model",rawName:"v-model",value:t.loginForm.password,expression:"loginForm.password"}],attrs:{type:"password",placeholder:"Password"},domProps:{value:t.loginForm.password},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"password",e.target.value)}}})]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.loginForm.errorVisible,expression:"loginForm.errorVisible"}]},[t._v(" "+t._s(t.loginForm.errorMsg)+" ")]),r("el-row",{attrs:{gutter:20}},[r("el-col",{attrs:{span:12}},[r("input",{staticClass:"btn solid",attrs:{type:"button",value:"登 录"},on:{click:t.userpwdLogin}})]),r("el-col",{attrs:{span:12}},[r("input",{staticClass:"btn solid",attrs:{type:"button",value:"获取密码"},on:{click:function(e){t.dialogVisible=!0}}})])],1)],1),t._m(0)]),t._m(1)]),r("el-dialog",{attrs:{title:"扫描二维码",visible:t.dialogVisible,width:"20%"},on:{"update:visible":function(e){t.dialogVisible=e}}},[r("span",[t._v("关注公众号，回复'dongbb'，字母哥所有资源均在此首发")]),r("img",{staticStyle:{height:"200px"},attrs:{src:n("711a")}}),r("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[r("el-button",{attrs:{type:"primary"},on:{click:function(e){t.dialogVisible=!1}}},[t._v("关闭")])],1)])],1)},a=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("form",{staticClass:"sign-up-form",attrs:{action:""}},[n("h2",{staticClass:"title"},[t._v("用户注册")]),n("div",{staticClass:"input-field"},[n("i",{staticClass:"fa fa-user"}),n("input",{attrs:{type:"text",placeholder:"Username"}})]),n("div",{staticClass:"input-field"},[n("i",{staticClass:"fa fa-envelope"}),n("input",{attrs:{type:"text",placeholder:"Email"}})]),n("div",{staticClass:"input-field"},[n("i",{staticClass:"fa fa-lock"}),n("input",{attrs:{type:"password",placeholder:"password"}})]),n("input",{staticClass:"btn solid",attrs:{type:"button",value:"注 册"}})])},function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"panels-container"},[r("div",{staticClass:"panel left-panel"},[r("div",{staticClass:"content"},[r("h3",[t._v("新用户注册")]),r("p",[t._v("DongBB 权限管理系统是一个使用Spring Boot、Spring Security(JWT)、Vue开发的前后端分离的基础权限框架.")]),r("button",{staticClass:"btn transparent",attrs:{id:"sign-up-btn"}},[t._v("去注册")])]),r("img",{staticClass:"image",attrs:{src:n("f0fa"),alt:""}})]),r("div",{staticClass:"panel right-panel"},[r("div",{staticClass:"content"},[r("h3",[t._v("已经注册过？")]),r("p",[t._v("因为注册功能不具有普适性，所以目前只是一个demo页面。需要你根据自己的业务设计提交注册信息，并自己编码实现.")]),r("button",{staticClass:"btn transparent",attrs:{id:"sign-in-btn"}},[t._v("去登陆")])]),r("img",{staticClass:"image",attrs:{src:n("438f"),alt:""}})])])}],s=n("b279"),i=n("5fe0"),o={name:"login",data:function(){return{loginForm:{username:"",password:"",errorMsg:"",errorVisible:!1},dialogVisible:!1}},mounted:function(){var t=document.querySelector("#sign-in-btn"),e=document.querySelector("#sign-up-btn"),n=document.querySelector(".container");e.addEventListener("click",(function(){n.classList.add("sign-up-mode")})),t.addEventListener("click",(function(){n.classList.remove("sign-up-mode")}))},methods:{userpwdLogin:function(){var t=this;Object(i["g"])(this.loginForm.username,this.loginForm.password).then((function(e){Object(s["c"])(e.data),t.$router.push({path:"/home"})})).catch((function(e){t.loginForm.errorMsg=e.message,t.loginForm.errorVisible=!0}))},getPassword:function(){}}},u=o,c=(n("7570"),n("2877")),d=Object(c["a"])(u,r,a,!1,null,"7fd9dec0",null);e["default"]=d.exports},b279:function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return i}));n("ac1f"),n("1276"),n("4c53");var r="jskdfls",a=function(t){sessionStorage.setItem(r,t)},s=function(){return sessionStorage.getItem(r)},i=function(){var t=decodeURIComponent(window.atob(s().split(".")[1]));return JSON.parse(t).sub}},f0fa:function(t,e,n){t.exports=n.p+"img/log.797bb368.svg"}});
//# sourceMappingURL=app.48f7b478.js.map