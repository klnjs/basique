"use strict";(self.webpackChunk_klnjs_docs=self.webpackChunk_klnjs_docs||[]).push([[454],{2399:(e,n,a)=>{a.r(n),a.d(n,{assets:()=>_,contentTitle:()=>P,default:()=>F,frontMatter:()=>S,metadata:()=>R,toc:()=>E});var t=a(1085),r=a(1184),s=a(9234),i=a(6937),l=a(6858),o=a(1701),c=a(7502),u=a(7033),d=(0,u.q6)({name:"AvatarContext",nameOfHook:"useAvatarContext",nameOfProvider:"<AvatarProvider />"}),f=d[0],v=d[1],h=a(4041),m=["onStatusChange"],p=(0,u.Rf)((function(e,n){var a=e.onStatusChange,r=(0,c.A)(e,m),s=function(e){var n=e.onStatusChange,a=(0,h.useState)("idle"),t=a[0],r=a[1],s=(0,u.c9)(n);return(0,h.useLayoutEffect)((function(){"idle"!==t&&s(t)}),[t,s]),{status:t,setStatus:r}}({onStatusChange:a});return(0,t.jsx)(f,{value:s,children:(0,t.jsx)(u.Du.div,Object.assign({ref:n},r))})})),g=["src","style","onLoad","onLoadStart","onError"],j=(0,u.Rf)((function(e,n){var a=e.src,r=e.style,s=e.onLoad,i=e.onLoadStart,l=e.onError,o=(0,c.A)(e,g),d=v(),f=d.status,h=d.setStatus,m=Object.assign({display:"loaded"!==f?"none":void 0},r),p=(0,u.Pu)(s,(function(){return h("loaded")})),j=(0,u.Pu)(i,(function(){return h("loading")})),x=(0,u.Pu)(l,(function(){return h("error")}));return(0,t.jsx)(u.Du.img,Object.assign({ref:n,src:a,style:m,onLoad:p,onLoadStart:j,onError:x},o))})),x=["delay"],b=(0,u.Rf)((function(e,n){var a=e.delay,r=(0,c.A)(e,x),s=v().status,i=(0,h.useState)(void 0===a),l=i[0],o=i[1];return(0,h.useEffect)((function(){if(void 0!==a){var e=setTimeout((function(){return o(!0)}),a);return function(){clearTimeout(e)}}}),[a]),l&&"loaded"!==s?(0,t.jsx)(u.Du.div,Object.assign({ref:n},r)):null}));const y=a.p+"assets/images/avatar-24f2e5ab40b4f38e02b1c2d5b0d2e487.png",A="avatar_YunA",O="image_cX1b",k="fallback_adAU",w=function(){return(0,t.jsxs)(p,{className:A,children:[(0,t.jsx)(j,{src:y,className:O}),(0,t.jsx)(b,{delay:5e3,className:k,children:"RK"})]})},N="import { Avatar, AvatarImage, AvatarFallback } from '@klnjs/avatar'\nimport src from './avatar.png'\nimport classes from './avatar.module.css'\n\nexport default () => (\n\t<Avatar className={classes.avatar}>\n\t\t<AvatarImage src={src} className={classes.image} />\n\t\t<AvatarFallback delay={5000} className={classes.fallback}>\n\t\t\tRK\n\t\t</AvatarFallback>\n\t</Avatar>\n)\n",C=".avatar {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\twidth: 48px;\n\theight: 48px;\n\tborder-radius: 9999px;\n\toverflow: hidden;\n\tbackground: var(--ifm-color-primary);\n}\n\n.image {\n\tobject-fit: contain;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.fallback {\n\tfont-weight: bold;\n\tfont-size: 24px;\n}\n",S={},P="Avatar",R={id:"components/avatar/avatar",title:"Avatar",description:"An element for representing a user.",source:"@site/src/docs/02-components/avatar/avatar.mdx",sourceDirName:"02-components/avatar",slug:"/components/avatar/",permalink:"/basique/docs/components/avatar/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Accessibility",permalink:"/basique/docs/overview/accessibility"},next:{title:"Calendar",permalink:"/basique/docs/components/calendar/"}},_={},E=[{value:"Showcase",id:"showcase",level:2},{value:"Features",id:"features",level:2},{value:"Installation",id:"installation",level:2},{value:"Reference",id:"reference",level:2},{value:"Avatar (Root)",id:"avatar-root",level:3},{value:"AvatarImage",id:"avatarimage",level:3},{value:"AvatarFallback",id:"avatarfallback",level:3}];function L(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,r.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(n.h1,{id:"avatar",children:"Avatar"}),"\n",(0,t.jsx)(n.p,{children:"An element for representing a user."}),"\n",(0,t.jsx)(n.h2,{id:"showcase",children:"Showcase"}),"\n",(0,t.jsx)(o._,{name:"avatar",sources:[{file:"index.tsx",content:N,language:"jsx"},{file:"index.module.css",content:C,language:"css"}],children:(0,t.jsx)(w,{})}),"\n",(0,t.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,t.jsxs)(s.O,{children:[(0,t.jsx)(s.X,{children:"Image loading status handling."}),(0,t.jsx)(s.X,{children:"Fallback to any content imaginable."}),(0,t.jsx)(s.X,{children:"Delay fallback to avoid flickering."})]}),"\n",(0,t.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,t.jsx)(i.L,{name:"avatar"}),"\n",(0,t.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,t.jsx)(n.h3,{id:"avatar-root",children:"Avatar (Root)"}),"\n",(0,t.jsx)(n.p,{children:"Contains all the parts of an avatar."}),"\n",(0,t.jsx)(l.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"onStatusChange",type:"function",typeAdvanced:"(status: 'idle' | 'loading' | 'loaded' | 'error') => void"}]}),"\n",(0,t.jsx)(n.h3,{id:"avatarimage",children:"AvatarImage"}),"\n",(0,t.jsx)(n.p,{children:"Used to render the image. The image is hidden until it has loaded. Use the root property onStatusChange, to listen to the image status."}),"\n",(0,t.jsx)(l.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"src",type:"string"}]}),"\n",(0,t.jsx)(n.h3,{id:"avatarfallback",children:"AvatarFallback"}),"\n",(0,t.jsxs)(n.p,{children:["Used to render the fallback while the image is loading, or when an error occurs. To prevent flickering between image and fallback use the ",(0,t.jsx)(n.code,{children:"delay"})," property, to delay rendering of the fallback whilst image is loading."]}),"\n",(0,t.jsx)(l.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"delay",type:"number"}]})]})}function F(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(L,{...e})}):L(e)}},9234:(e,n,a)=>{a.d(n,{X:()=>d,O:()=>v});var t=a(7502);const r="features_U5gm",s="list_j8Y4",i="feature_TSSP",l="icon_HJk2",o="description_zjKB";var c=a(1085),u=["children"],d=function(e){var n=e.children,a=(0,t.A)(e,u);return(0,c.jsxs)("li",Object.assign({className:i},a,{children:[(0,c.jsx)("svg",{fill:"currentColor",stroke:"none",viewBox:"0 0 24 24",className:l,"aria-hidden":!0,children:(0,c.jsx)("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})}),(0,c.jsx)("p",{className:o,children:n})]}))},f=["children"],v=function(e){var n=e.children,a=(0,t.A)(e,f);return(0,c.jsx)("div",Object.assign({className:r},a,{children:(0,c.jsx)("ul",{className:s,children:n})}))}},6937:(e,n,a)=>{a.d(n,{L:()=>s});var t=a(3092),r=a(1085),s=function(e){var n=e.name,a=e.manager,s=void 0===a?"bun":a,i=e.dependencies,l=s+" install @klnjs/"+n,o=null!=i?i:[];return(0,r.jsx)(t.Y,{language:"bash",children:[l].concat(o).join(" ")})}},6858:(e,n,a)=>{a.d(n,{a:()=>F,y:()=>L});var t=a(7502),r=a(4357);const s={table:"table_JbMS",cell:"cell_bcjn",th:"th_Zlu8",td:"td_iEyy"};var i=a(1085),l=["className","children"],o=function(e){var n=e.className,a=e.children,o=(0,t.A)(e,l);return(0,i.jsx)("table",Object.assign({className:(0,r.A)(s.table,n)},o,{children:a}))},c=["className","children"],u=function(e){var n=e.className,a=e.children,l=(0,t.A)(e,c);return(0,i.jsx)("tr",Object.assign({className:(0,r.A)(s.row,n)},l,{children:a}))},d=["as","className","children"],f=function(e){var n,a=e.as,l=e.className,o=e.children,c=(0,t.A)(e,d),u=null!=a?a:"td",f=(0,r.A)(s.cell,l,((n={})[s.td]="td"===a||void 0===a,n[s.th]="th"===a,n));return(0,i.jsx)(u,Object.assign({className:f},c,{children:o}))},v=a(7033),h=(0,v.q6)({name:"PopoverContext",nameOfHook:"usePopoverContext",nameOfProvider:"<PopoverProvider />"}),m=h[0],p=h[1],g=a(4041),j=a(6036),x=a(8972),b=a(4682),y=a(2913),A=function(e){var n=e.root,a=e.open,t=e.modal,r=e.offset,s=e.dismiss,i=e.duration,l=void 0===i?0:i,o=e.placement,c=e.defaultOpen,u=e.onOpenChange,d=(0,g.useState)(),f=d[0],h=d[1],m=(0,g.useState)(),p=m[0],A=m[1],O=(0,v.Gx)({value:a,defaultValue:c,onChange:u}),k=O[0],w=O[1],N=(0,j.we)({open:k,placement:o,whileElementsMounted:x.ll,onOpenChange:w,middleware:[(0,b.cY)(r)]}),C=N.refs,S=N.context,P=N.floatingStyles,R=function(e,n){var a=(0,j.$X)(e,{duration:{open:(0,y.E)(n)?n:n.enter,close:(0,y.E)(n)?n:n.leave}}),t=a.isMounted,r=a.status;return{mounted:t,status:"open"===r?"enter":"close"===r?"leave":"mount"}}(S,l),_=R.mounted,E=R.status,L=(0,j.bv)([(0,j.It)(S),(0,j.kp)(S),(0,j.s9)(S,{escapeKey:null==s?void 0:s.onEscapeKey,outsidePress:null==s?void 0:s.onPressOutside,ancestorScroll:null==s?void 0:s.onAncestorScroll})]);return{root:n,refs:C,modal:t,status:E,mounted:_,dismiss:s,context:S,placement:o,floatingStyles:P,open:k,labelId:f,descriptionId:p,setOpen:w,setLabelId:h,setDescriptionId:A,getFloatingProps:L.getFloatingProps,getReferenceProps:L.getReferenceProps}},O=function(e){var n=e.root,a=e.open,t=e.modal,r=e.offset,s=e.dismiss,l=e.duration,o=e.placement,c=e.children,u=e.defaultOpen,d=e.onOpenChange,f=A({root:n,open:a,modal:t,offset:r,dismiss:s,duration:l,placement:o,defaultOpen:u,onOpenChange:d});return(0,i.jsx)(m,{value:f,children:c})},k=((0,v.Rf)((function(e,n){var a=p(),t=a.refs,r=a.status,s=(0,v.Zy)(t.setPositionReference,n);return(0,i.jsx)(v.Du.div,Object.assign({ref:s,"data-status":(0,v.cT)(r)},e))})),(0,v.Rf)((function(e,n){var a=p(),t=a.open,r=a.refs,s=a.status,l=a.getReferenceProps,o=(0,v.Zy)(r.setReference,n);return(0,i.jsx)(v.Du.button,Object.assign({ref:o,type:"button","data-open":(0,v.cT)(t),"data-status":(0,v.cT)(s)},l(e)))}))),w=["style"],N=(0,v.Rf)((function(e,n){var a=e.style,r=(0,t.A)(e,w),s=p(),l=s.root,o=s.refs,c=s.modal,u=void 0!==c&&c,d=s.status,f=s.dismiss,h=s.mounted,m=s.placement,g=s.context,x=s.labelId,b=s.descriptionId,y=s.getFloatingProps,A=(0,v.Zy)(o.setFloating,n),O=null==f?void 0:f.onFocusOut;return h?(0,i.jsx)(j.XF,{id:l,children:(0,i.jsx)(j.s3,{modal:u,guards:!u,context:g,closeOnFocusOut:O,visuallyHiddenDismiss:u,children:(0,i.jsx)(v.Du.div,Object.assign({ref:A,style:Object.assign({},g.floatingStyles,a),"aria-labelledby":x,"aria-describedby":b,"data-status":(0,v.cT)(d),"data-placement":(0,v.cT)(m)},y(r)))})}):null}));const C="table_Iji9",S="prop_XcUk",P="type_6lsl",R="trigger_qVE9",_="content_LiR4";var E=function(e){var n=e.children;return(0,i.jsxs)(O,{offset:5,children:[(0,i.jsx)(k,{className:R,children:">"}),(0,i.jsx)(N,{className:_,children:n})]})},L=function(e){var n=e.props;return(0,i.jsxs)(o,{className:C,children:[(0,i.jsx)("thead",{children:(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{as:"th",children:"Prop"}),(0,i.jsx)(f,{as:"th",children:"Type"}),(0,i.jsx)(f,{as:"th",children:"Default"})]})}),(0,i.jsx)("tbody",{children:n.map((function(e){var n=e.name,a=e.type,t=e.typeAdvanced,r=e.defaultValue,s=void 0===r?"-":r;return(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{className:S,children:n}),(0,i.jsxs)(f,{className:P,children:[a,t?(0,i.jsx)(E,{children:t}):null]}),(0,i.jsx)(f,{children:s})]},n)}))})]})},F=function(e){var n=e.attrs;return(0,i.jsxs)(o,{className:C,children:[(0,i.jsx)("thead",{children:(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{as:"th",children:"Data attribute"}),(0,i.jsx)(f,{as:"th",children:"Present when"})]})}),(0,i.jsx)("tbody",{children:n.map((function(e){var n=e.name,a=e.description;return(0,i.jsxs)(u,{children:[(0,i.jsx)(f,{className:S,children:n}),(0,i.jsx)(f,{children:a})]},n)}))})]})}},1701:(e,n,a)=>{a.d(n,{_:()=>u});var t=a(1732),r=a(3759),s=a(3092);const i="showcase_OZLv",l="snippet_xoYL",o="viewport_Tpbl";var c=a(1085),u=function(e){var n=e.name,a=e.sources,u=e.children;return(0,c.jsxs)("div",{className:i,"aria-label":n,children:[(0,c.jsx)("div",{className:o,children:u}),a?(0,c.jsx)(t.A,{children:a.map((function(e){var n=e.file,a=e.content,t=e.language;return(0,c.jsx)(r.A,{value:n,label:n,children:(0,c.jsx)(s.Y,{language:t,className:l,children:a})},n)}))}):null]})}},3092:(e,n,a)=>{a.d(n,{Y:()=>l});var t=a(4506),r=a(4357);const s="snippet_PC2H";var i=a(1085),l=function(e){var n=e.children,a=e.className,l=e.language,o=e.identation,c=void 0===o?2:o,u=e.showLineNumbers,d=void 0===u||u,f=new Array(c).fill(" ").join("");return(0,i.jsx)("div",{className:(0,r.A)(s,a),children:(0,i.jsx)(t.A,{language:l,showLineNumbers:d,children:n.replace(/\t/g,f)})})}},7033:(e,n,a)=>{a.d(n,{cT:()=>O,q6:()=>r,Rf:()=>j,Du:()=>g,c9:()=>x,Pu:()=>y,wG:()=>k,RO:()=>w,Bi:()=>N,ZC:()=>C,Zy:()=>c,Gx:()=>S});var t=a(4041),r=function(e){var n=e.name,a=void 0===n?"Context":n,r=e.nameOfHook,s=void 0===r?"useContext":r,i=e.nameOfProvider,l=void 0===i?"Provider":i,o=e.defaultValue,c=(0,t.createContext)(o);c.displayName=a;return[c.Provider,function e(n){var r=(void 0===n?{}:n).strict,i=null==r||r,o=(0,t.useContext)(c);if(!o&&i){var u=function(e,n,a){var t=new Error(n+" returned `undefined`. Did you forget to wrap component within "+a);return t.name=e+"Error",t}(a,s,l);throw void 0!==Error.captureStackTrace&&Error.captureStackTrace(u,e),u}return o}]},s=a(7502),i=function(e){return"function"==typeof e},l=a(7515),o=function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return function(e){n.forEach((function(n){i(n)?n(e):(0,l.O)(n)&&(n.current=e)}))}},c=function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return(0,t.useCallback)(o.apply(void 0,n),n)},u=a(7517),d=function(e){return"string"==typeof e};function f(){for(var e=Object.assign({},arguments.length<=0?void 0:arguments[0]),n=1;n<arguments.length;n++){var a=n<0||arguments.length<=n?void 0:arguments[n],t=function(){var n=e[r],t=a[r];"style"===r&&(0,u.u)(n)&&(0,u.u)(t)?e[r]=Object.assign({},n,t):"className"===r&&d(n)&&d(t)?e[r]=n+" "+t:/^on[A-Z]/.test(r)&&i(n)&&i(t)?e[r]=function(){n.apply(void 0,arguments),t.apply(void 0,arguments)}:e[r]=null!=t?t:n};for(var r in a)t()}return e}var v,h=a(1085),m=["asChild","children"],p=function(e){var n=(0,t.forwardRef)((function(n,a){var r=n.asChild,i=n.children,l=(0,s.A)(n,m);if(!r)return(0,h.jsx)(e,Object.assign({ref:a},l,{children:i}));var c=t.Children.only(i);return(0,t.isValidElement)(c)?(0,t.cloneElement)(c,Object.assign({ref:a?o(a,c.ref):c.ref},f(l,c.props))):null}));return n.displayName=e.displayName||e.name,n},g=(v=new Map,new Proxy(p,{apply:function(e,n,a){return p(a[0])},get:function(e,n){return v.has(n)||v.set(n,p(n)),v.get(n)}})),j=function(e){return(0,t.forwardRef)(e)};function x(e,n){void 0===n&&(n=[]);var a=(0,t.useRef)(e);return(0,t.useEffect)((function(){a.current=e}),[e]),(0,t.useCallback)((function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return null==a.current?void 0:a.current.apply(a,n)}),n)}var b=function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return function(e){n.forEach((function(n){n&&!e.defaultPrevented&&n(e)}))}},y=function(){for(var e=arguments.length,n=new Array(e),a=0;a<e;a++)n[a]=arguments[a];return(0,t.useCallback)(b.apply(void 0,n),n)},A=a(2913),O=function(e){return!0===e?"":(0,A.E)(e)||d(e)?e.toString():void 0},k=function(e){return(0,t.useMemo)((function(){return Object.fromEntries(Object.entries(e).map((function(e){var n=e[0],a=e[1];return[n,O(a)]})))}),[e])};var w=function(e,n){var a,r=(a=(0,t.useRef)(!1)).current?a.current:(a.current=!0,!1);(0,t.useEffect)((function(){if(r)return e()}),n)};function N(e,n){var a=(0,t.useId)(),r=null!=e?e:a;return(0,t.useLayoutEffect)((function(){if(n)return n(r),function(){n(void 0)}}),[r,n]),r}var C=function(e){var n=(0,t.useRef)(e),a=(0,t.useRef)(null),r=n.current;return e!==r&&(n.current=e,a.current=r),a.current},S=function(e){var n=e.value,a=e.defaultValue,r=e.onChange,s=void 0!==n,i=(0,t.useRef)(s),l=x(r),o=(0,t.useState)(a),c=o[0],u=o[1],d=s?n:c,f=(0,t.useCallback)((function(e){s||u(e),l(e)}),[s,l]);return(0,t.useEffect)((function(){i.current!==s&&(i.current=s,console.warn("Warning: A component is changing from being uncontrolled to controlled or vice versa."))}),[s]),[d,f]}},7515:(e,n,a)=>{a.d(n,{O:()=>t});var t=function(e){return null!=e}},2913:(e,n,a)=>{a.d(n,{E:()=>t});var t=function(e){return Number.isFinite(e)}},7517:(e,n,a)=>{a.d(n,{u:()=>t});var t=function(e){return null!=e&&!Array.isArray(e)&&"object"==typeof e}}}]);