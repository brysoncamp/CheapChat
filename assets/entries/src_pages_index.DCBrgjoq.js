import{r as h,u as j,j as s,i as P}from"../chunks/chunk-CWLkCeu2.js";/* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      *//* empty css                      */var g="https://js.stripe.com/v3",b=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;var T=function(){for(var e=document.querySelectorAll('script[src^="'.concat(g,'"]')),r=0;r<e.length;r++){var n=e[r];if(b.test(n.src))return n}return null},w=function(e){var r="",n=document.createElement("script");n.src="".concat(g).concat(r);var t=document.head||document.body;if(!t)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return t.appendChild(n),n},z=function(e,r){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"5.6.0",startTime:r})},l=null,c=null,p=null,C=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},A=function(e,r){return function(){window.Stripe?e(window.Stripe):r(new Error("Stripe.js not available"))}},L=function(e){return l!==null?l:(l=new Promise(function(r,n){if(typeof window>"u"||typeof document>"u"){r(null);return}if(window.Stripe){r(window.Stripe);return}try{var t=T();if(!(t&&e)){if(!t)t=w(e);else if(t&&p!==null&&c!==null){var i;t.removeEventListener("load",p),t.removeEventListener("error",c),(i=t.parentNode)===null||i===void 0||i.removeChild(t),t=w(e)}}p=A(r,n),c=C(n),t.addEventListener("load",p),t.addEventListener("error",c)}catch(f){n(f);return}}),l.catch(function(r){return l=null,Promise.reject(r)}))},R=function(e,r,n){if(e===null)return null;var t=e.apply(void 0,r);return z(t,n),t},d,y=!1,x=function(){return d||(d=L(null).catch(function(e){return d=null,Promise.reject(e)}),d)};Promise.resolve().then(function(){return x()}).catch(function(o){y||console.warn(o)});var U=function(){for(var e=arguments.length,r=new Array(e),n=0;n<e;n++)r[n]=arguments[n];y=!0;var t=Date.now();return x().then(function(i){return R(i,r,t)})};const D=U("pk_test_51Qn6p4RoO280mx7jwfqkc7gummGs3CyKz5DPUgDVvzgh0faWbQCd6xZszEMfZbw88OsvZnM7EUd5msyNSslt3xu4000T32JdeY");function k(){const[o,e]=h.useState(""),[r,n]=h.useState(!1),[t,i]=h.useState(""),{ensureValidToken:f,user:m}=j(),E=async()=>{n(!0),i("");try{console.log("Starting payment request with amount:",o);const a=await f();if(!a)throw new Error("Unauthorized: Failed to get authentication token.");const v=await fetch("https://api.cheap.chat/createPaymentSession",{method:"POST",headers:{"Content-Type":"application/json",Authorization:`Bearer ${a}`,Origin:window.location.origin},body:JSON.stringify({amount:Number(o),userId:(m==null?void 0:m.userId)||"unknown"})}),u=await v.json();if(console.log("Response from API:",u),!v.ok||!u.id)throw new Error(u.error||"Failed to create checkout session");const S=await D;if(!S)throw new Error("Stripe failed to initialize");await S.redirectToCheckout({sessionId:u.id})}catch(a){console.error("Payment error:",a),i(a.message),n(!1)}};return s.jsxs("div",{style:{textAlign:"center",padding:"20px"},children:[s.jsx("h1",{children:"Buy CheapChat Credits"}),s.jsx("p",{children:"Enter the amount (in USD) you want to purchase:"}),s.jsx("input",{type:"number",placeholder:"Enter amount",value:o,onChange:a=>e(a.target.value),style:{padding:"10px",margin:"10px",fontSize:"16px",width:"200px"}}),s.jsx("br",{}),s.jsx("button",{onClick:E,disabled:!o||r,style:{backgroundColor:r?"#ccc":"#007bff",color:"white",padding:"10px 20px",fontSize:"18px",border:"none",cursor:r?"not-allowed":"pointer",borderRadius:"5px"},children:r?"Processing...":"Proceed to Payment"}),t&&s.jsx("p",{style:{color:"red",marginTop:"10px"},children:t})]})}const O=Object.freeze(Object.defineProperty({__proto__:null,Page:k},Symbol.toStringTag,{value:"Module"})),G={isClientRuntimeLoaded:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:!0}},onBeforeRenderEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},dataEnv:{type:"computed",definedAtData:null,valueSerialized:{type:"js-serialized",value:null}},hydrationCanBeAborted:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+config.js",fileExportPathToShowToUser:["default","hydrationCanBeAborted"]},valueSerialized:{type:"js-serialized",value:!0}},onRenderClient:{type:"standard",definedAtData:{filePathToShowToUser:"/renderer/+onRenderClient.jsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:P}},Page:{type:"standard",definedAtData:{filePathToShowToUser:"/src/pages/index/+Page.jsx",fileExportPathToShowToUser:[]},valueSerialized:{type:"plus-file",exportValues:O}}};export{G as configValuesSerialized};
