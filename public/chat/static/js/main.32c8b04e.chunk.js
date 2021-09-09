(this.webpackJsonpchat=this.webpackJsonpchat||[]).push([[0],{17:function(e,n,t){},18:function(e,n,t){},21:function(e,n,t){"use strict";t.r(n);var s,c=t(3),r=t.n(c),u=t(11),a=t.n(u),i=(t(17),t(12)),o=t(7),l=(t(18),t(4)),b=t.n(l),f=t(9);function d(e){switch(e.type){case s.Subscribe:return function(e){var n,t="".concat(s.Subscribe);if(!(null===(n=e.subjects)||void 0===n?void 0:n.length))return null;return e.subjects.forEach((function(e){t+=" "+e})),t+="\n"}(e);case s.Unsubscribe:return function(e){var n,t="".concat(s.Unsubscribe);if(!(null===(n=e.subjects)||void 0===n?void 0:n.length))return null;return e.subjects.forEach((function(e){t+=" "+e})),t+="\n"}(e);case s.Request:return function(e){var n,t,c,r="".concat(s.Request," ");if(!e.uri)return null;if(r+=e.uri+" ",!e.inbox)return null;return r+=e.inbox+" ",r+=null!==(n=null===(t=e.payload)||void 0===t?void 0:t.length)&&void 0!==n?n:0,r+="\n",r+=null!==(c=e.payload)&&void 0!==c?c:""}(e);case s.Response:return function(e){var n,t,c,r="".concat(s.Response," ");if(!e.uri)return null;if(r+=e.uri+" ",!e.inbox)return null;return r+=e.inbox+" ",r+=null!==(n=null===(t=e.payload)||void 0===t?void 0:t.length)&&void 0!==n?n:0,r+="\n",r+=null!==(c=e.payload)&&void 0!==c?c:""}(e);case s.Publish:return function(e){var n,t,c="".concat(s.Publish," ");if(!e.subject)return null;return c+=e.subject+" ",c+=null!==(n=null===(t=e.payload)||void 0===t?void 0:t.length)&&void 0!==n?n:0,c+="\n",c+=e.payload}(e)}}!function(e){e.Subscribe="SUB",e.Unsubscribe="UNSUB",e.Request="REQ",e.Response="RSP",e.Publish="PUB"}(s||(s={}));var j=t(25);function v(e){var n=new WebSocket(e),t=new Promise((function(e){n.readyState===n.OPEN?e(void 0):n.onopen=e}));function c(){return(c=Object(f.a)(b.a.mark((function e(s){var c;return b.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t;case 2:null!==(c=d(s))&&n.send(c);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return{send:function(e){return c.apply(this,arguments)},addMessageEventListener:function(e){n.addEventListener("message",(function(n){var t=function(e){var n=e.split("\n");if(n.length<=1)return null;var t=n[0].split(" "),c=t[0],r={type:c};switch(t=t.slice(1),c){case s.Subscribe:case s.Unsubscribe:r.subjects=t;break;case s.Request:case s.Response:r.uri=t[0],r.inbox=t[1];break;case s.Publish:r.subject=t[0]}var u=n.slice(1).join("\n");return r.payload=u,r}(n.data);null!==t&&e(t)}))}}}function p(e){var n=v(e),t=function(e){var n={};function t(){return(t=Object(f.a)(b.a.mark((function t(c,r){var u,a,i,o;return b.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return u=Object(j.a)(),a={type:s.Request,uri:c,inbox:u,payload:JSON.stringify(null!==r&&void 0!==r?r:{})},i=new Promise((function(e){n[u]=e})),e.send(a),t.next=6,i;case 6:if((o=t.sent).payload){t.next=9;break}return t.abrupt("return",null);case 9:return t.abrupt("return",JSON.parse(o.payload));case 10:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return e.addMessageEventListener((function(e){if(e.type===s.Response&&e.inbox){var t=n[e.inbox];t&&(t(e),delete n[e.inbox])}})),{request:function(e,n){return t.apply(this,arguments)},close:function(){}}}(n),c=function(e){var n={};return e.addMessageEventListener((function(e){if(e.type===s.Publish&&e.subject){var t=n[e.subject];t&&e.payload&&t(JSON.parse(e.payload))}})),{subscribe:function(t,c){n[t]=c,e.send({type:s.Subscribe,subjects:[t]})},unsubscribe:function(t){e.send({type:s.Unsubscribe,subjects:[t]}),delete n[t]},close:function(){}}}(n);return{request:t.request,subscribe:c.subscribe,close:function(){t.close(),c.close()}}}var h=t(26),O=t(24),m=t(1);function x(e){return"mantil-project-demo-chat-chat.".concat(e)}function y(e){var n=e.messages,t=Object(c.useRef)(null);Object(c.useEffect)((function(){!function(){var e;null===(e=t.current)||void 0===e||e.scrollIntoView()}()}),[n]);return Object(m.jsxs)("div",{className:"messages",children:[n.map((function(e){return Object(m.jsxs)("div",{className:"message",children:[Object(m.jsxs)("div",{className:"info-row",children:[Object(m.jsx)("div",{className:"user",children:e.user}),Object(m.jsx)("div",{className:"time",children:(n=e,Object(h.a)(new Date,new Date(n.createdAt))>=1?Object(O.a)(new Date(n.createdAt),"M.d. H:m:ss"):Object(O.a)(new Date(n.createdAt),"H:m:ss"))})]}),Object(m.jsx)("div",{className:"content",children:e.content})]},e.id);var n})),Object(m.jsx)("div",{ref:t})]})}function g(e){var n=e.api,t=e.username,s=Object(c.useState)(""),r=Object(o.a)(s,2),u=r[0],a=r[1],i=Object(c.useCallback)((function(e){"Enter"===e.key&&(n.request(x("add"),{message:{user:t,content:u}}),a(""))}),[u,n]),l=Object(c.useRef)(null);return Object(c.useEffect)((function(){var e;null===(e=l.current)||void 0===e||e.focus()}),[]),Object(m.jsx)("input",{ref:l,className:"input",type:"text",value:u,onChange:function(e){return a(e.target.value)},onKeyDown:i})}function w(e){var n=e.setUsername,t=Object(c.useState)(""),s=Object(o.a)(t,2),r=s[0],u=s[1],a=Object(c.useCallback)((function(e){"Enter"===e.key&&n(r)}),[n,r]);return Object(m.jsxs)("div",{className:"user-prompt",children:["Enter your username:",Object(m.jsx)("input",{className:"user-input",type:"text",value:r,onChange:function(e){return u(e.target.value)},onKeyPress:a})]})}var S=function(){var e=Object(c.useState)([]),n=Object(o.a)(e,2),t=n[0],s=n[1],r=Object(c.useMemo)((function(){return p("wss://uaejc9t3ga.execute-api.eu-central-1.amazonaws.com/$default")}),[]);Object(c.useEffect)((function(){r.subscribe("chat-messages",(function(e){s((function(n){return[].concat(Object(i.a)(n),[e])}))})),r.request(x("get"),null).then((function(e){s(e.messages)}))}),[]);var u=Object(c.useState)(""),a=Object(o.a)(u,2),l=a[0],b=a[1];return Object(m.jsx)("div",{className:"App",children:Object(m.jsx)("div",{className:"chat",children:""===l?Object(m.jsx)(w,{setUsername:b}):Object(m.jsxs)(m.Fragment,{children:[Object(m.jsx)(y,{messages:t}),Object(m.jsx)(g,{api:r,username:l})]})})})},N=function(e){e&&e instanceof Function&&t.e(3).then(t.bind(null,27)).then((function(n){var t=n.getCLS,s=n.getFID,c=n.getFCP,r=n.getLCP,u=n.getTTFB;t(e),s(e),c(e),r(e),u(e)}))};a.a.render(Object(m.jsx)(r.a.StrictMode,{children:Object(m.jsx)(S,{})}),document.getElementById("root")),N()}},[[21,1,2]]]);
//# sourceMappingURL=main.32c8b04e.chunk.js.map