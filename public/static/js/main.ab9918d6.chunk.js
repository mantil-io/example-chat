(this.webpackJsonpchat=this.webpackJsonpchat||[]).push([[0],{16:function(e,t,c){},17:function(e,t,c){},19:function(e,t,c){"use strict";c.r(t);var n=c(3),s=c.n(n),a=c(9),r=c.n(a),u=(c(16),c(11)),i=c(6),j=(c(17),c(10)),o=c(23),b=c(22),l=c(1);function O(e){return"chat.".concat(e)}function d(e){var t=e.messages,c=Object(n.useRef)(null);Object(n.useEffect)((function(){!function(){var e;null===(e=c.current)||void 0===e||e.scrollIntoView()}()}),[t]);return Object(l.jsxs)("div",{className:"messages",children:[t.map((function(e){return Object(l.jsxs)("div",{className:"message",children:[Object(l.jsxs)("div",{className:"info-row",children:[Object(l.jsx)("div",{className:"user",children:e.user}),Object(l.jsx)("div",{className:"time",children:(t=e,Object(o.a)(new Date,new Date(t.createdAt))>=1?Object(b.a)(new Date(t.createdAt),"M.d. H:mm:ss"):Object(b.a)(new Date(t.createdAt),"H:mm:ss"))})]}),Object(l.jsx)("div",{className:"content",children:e.content})]},e.id);var t})),Object(l.jsx)("div",{ref:c})]})}function m(e){var t=e.api,c=e.username,s=Object(n.useState)(""),a=Object(i.a)(s,2),r=a[0],u=a[1],j=Object(n.useCallback)((function(e){"Enter"===e.key&&(t.request(O("add"),{message:{user:c,content:r}}),u(""))}),[r,t]),o=Object(n.useRef)(null);return Object(n.useEffect)((function(){var e;null===(e=o.current)||void 0===e||e.focus()}),[]),Object(l.jsx)("input",{ref:o,className:"input",type:"text",value:r,onChange:function(e){return u(e.target.value)},onKeyDown:j})}function f(e){var t=e.setUsername,c=Object(n.useState)(""),s=Object(i.a)(c,2),a=s[0],r=s[1],u=Object(n.useCallback)((function(e){"Enter"===e.key&&t(a)}),[t,a]);return Object(l.jsxs)("div",{className:"user-prompt",children:["Enter your username:",Object(l.jsx)("input",{className:"user-input",type:"text",value:a,onChange:function(e){return r(e.target.value)},onKeyPress:u})]})}var v=function(){var e=Object(n.useState)([]),t=Object(i.a)(e,2),c=t[0],s=t[1],a=Object(n.useMemo)((function(){return Object(j.a)()}),[]);Object(n.useEffect)((function(){a.subscribe("chat-messages",(function(e){s((function(t){return[].concat(Object(u.a)(t),[e])}))})),a.request(O("get"),null).then((function(e){s(e.messages)}))}),[]);var r=Object(n.useState)(""),o=Object(i.a)(r,2),b=o[0],v=o[1];return Object(l.jsx)("div",{className:"App",children:Object(l.jsx)("div",{className:"chat",children:""===b?Object(l.jsx)(f,{setUsername:v}):Object(l.jsxs)(l.Fragment,{children:[Object(l.jsx)(d,{messages:c}),Object(l.jsx)(m,{api:a,username:b})]})})})};r.a.render(Object(l.jsx)(s.a.StrictMode,{children:Object(l.jsx)(v,{})}),document.getElementById("root"))}},[[19,1,2]]]);
//# sourceMappingURL=main.ab9918d6.chunk.js.map