"use strict";(self.webpackChunk_klnjs_docs=self.webpackChunk_klnjs_docs||[]).push([[530],{7816:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>P,contentTitle:()=>C,default:()=>R,frontMatter:()=>w,metadata:()=>N,toc:()=>A});var r=t(1085),s=t(1184),i=t(9234),a=t(6937),o=t(6858),c=t(1701),l=t(4041),d=t(4090),u=t(7502),f=(0,d.q6)({name:"IconContext",nameOfHook:"useIconContext",nameOfProvider:"<IconProvider />"}),h=f[0],p=f[1],v=["id"],m=(0,d.Rf)((function(e,n){var t=e.id,s=(0,u.A)(e,v),i=p().setLabelId,a=(0,d.x8)(t,i);return(0,r.jsx)("title",Object.assign({id:a,ref:n},s))})),x=["id"],j=(0,d.Rf)((function(e,n){var t=e.id,s=(0,u.A)(e,x),i=p().setDescriptionId,a=(0,d.x8)(t,i);return(0,r.jsx)("desc",Object.assign({id:a,ref:n},s))})),g=(0,d.Rf)((function(e,n){return(0,r.jsx)("path",Object.assign({ref:n},e))})),b=(0,d.Rf)((function(e,n){var t,s,i,a,o=(t=(0,l.useState)(),s=t[0],i=t[1],a=(0,l.useState)(),{labelId:s,descriptionId:a[0],setLabelId:i,setDescriptionId:a[1]});return(0,r.jsx)(h,{value:o,children:(0,r.jsx)("svg",Object.assign({ref:n,fill:"currentColor","aria-labelledby":o.labelId,"aria-describedby":o.descriptionId},e))})}));const y="icon_WRbn",I=function(){return(0,r.jsxs)(b,{viewBox:"0 0 24 24",className:y,children:[(0,r.jsx)(m,{children:"Close"}),(0,r.jsx)(j,{children:"Click here to close"}),(0,r.jsx)(g,{d:"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"})]})},L="import { Icon, IconTitle, IconDescription, IconPath } from '@klnjs/icon'\nimport classes from './icon.module.css'\n\nexport default () => (\n\t<Icon viewBox=\"0 0 24 24\" className={classes.icon}>\n\t\t<IconTitle>Close</IconTitle>\n\t\t<IconDescription>Click here to close</IconDescription>\n\t\t<IconPath d=\"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z\" />\n\t</Icon>\n)\n",O=".icon {\n\twidth: 24px;\n\theight: 24px;\n\tcolor: var(--ifm-color-primary);\n}\n",w={},C="Icon",N={id:"components/icon/icon",title:"Icon",description:"An element for creating icon components.",source:"@site/src/docs/02-components/icon/icon.mdx",sourceDirName:"02-components/icon",slug:"/components/icon/",permalink:"/basique/docs/components/icon/",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"Avatar",permalink:"/basique/docs/components/avatar/"},next:{title:"Pin",permalink:"/basique/docs/components/pin/"}},P={},A=[{value:"Showcase",id:"showcase",level:2},{value:"Features",id:"features",level:2},{value:"Installation",id:"installation",level:2},{value:"Reference",id:"reference",level:2},{value:"Icon (Root)",id:"icon-root",level:3},{value:"IconTitle",id:"icontitle",level:3},{value:"IconDescription",id:"icondescription",level:3},{value:"IconPath",id:"iconpath",level:3}];function k(e){const n={code:"code",h1:"h1",h2:"h2",h3:"h3",p:"p",...(0,s.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h1,{id:"icon",children:"Icon"}),"\n",(0,r.jsx)(n.p,{children:"An element for creating icon components."}),"\n",(0,r.jsx)(n.h2,{id:"showcase",children:"Showcase"}),"\n",(0,r.jsx)(c._,{name:"icon",sources:[{file:"index.tsx",content:L,language:"jsx"},{file:"index.module.css",content:O,language:"css"}],children:(0,r.jsx)(I,{})}),"\n",(0,r.jsx)(n.h2,{id:"features",children:"Features"}),"\n",(0,r.jsxs)(i.O,{children:[(0,r.jsx)(i.X,{children:"Quickly make an icon by providing paths."}),(0,r.jsx)(i.X,{children:"Provide accessibility if icon is interactive."})]}),"\n",(0,r.jsx)(n.h2,{id:"installation",children:"Installation"}),"\n",(0,r.jsx)(a.L,{name:"icon"}),"\n",(0,r.jsx)(n.h2,{id:"reference",children:"Reference"}),"\n",(0,r.jsx)(n.h3,{id:"icon-root",children:"Icon (Root)"}),"\n",(0,r.jsx)(n.p,{children:"Contains all the parts of an icon."}),"\n",(0,r.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,r.jsx)(n.h3,{id:"icontitle",children:"IconTitle"}),"\n",(0,r.jsxs)(n.p,{children:["Used to optionally render a title. This functions as an accessible label for screen readers to announce when the icon is interactive. To make the icon interactive, set the ",(0,r.jsx)(n.code,{children:"tabIndex"})," of the root to 0."]}),"\n",(0,r.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,r.jsx)(n.h3,{id:"icondescription",children:"IconDescription"}),"\n",(0,r.jsx)(n.p,{children:"Used to optionally render a description. Has the same properties as the title component."}),"\n",(0,r.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"}]}),"\n",(0,r.jsx)(n.h3,{id:"iconpath",children:"IconPath"}),"\n",(0,r.jsx)(n.p,{children:"Used to render a path. It is possible to use multiple paths to compose an icon, this is usefull for making icons with multiple colors or having different animations for each path."}),"\n",(0,r.jsx)(o.y,{props:[{name:"asChild",type:"boolean",defaultValue:"false"},{name:"d",type:"string"}]})]})}function R(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(k,{...e})}):k(e)}},9234:(e,n,t)=>{t.d(n,{X:()=>u,O:()=>h});var r=t(7502);const s="features_U5gm",i="list_j8Y4",a="feature_TSSP",o="icon_HJk2",c="description_zjKB";var l=t(1085),d=["children"],u=function(e){var n=e.children,t=(0,r.A)(e,d);return(0,l.jsxs)("li",Object.assign({className:a},t,{children:[(0,l.jsx)("svg",{fill:"currentColor",stroke:"none",viewBox:"0 0 24 24",className:o,"aria-hidden":!0,children:(0,l.jsx)("path",{d:"M12 2C6.5 2 2 6.5 2 12S6.5 22 12 22 22 17.5 22 12 17.5 2 12 2M10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z"})}),(0,l.jsx)("p",{className:c,children:n})]}))},f=["children"],h=function(e){var n=e.children,t=(0,r.A)(e,f);return(0,l.jsx)("div",Object.assign({className:s},t,{children:(0,l.jsx)("ul",{className:i,children:n})}))}},6937:(e,n,t)=>{t.d(n,{L:()=>i});var r=t(3092),s=t(1085),i=function(e){var n=e.name,t=e.manager,i=void 0===t?"pnpm":t;return(0,s.jsx)(r.Y,{language:"bash",children:i+" install @klnjs/"+n})}},6858:(e,n,t)=>{t.d(n,{a:()=>S,y:()=>E});var r=t(7502),s=t(4357);const i={table:"table_JbMS",cell:"cell_bcjn",th:"th_Zlu8",td:"td_iEyy"};var a=t(1085),o=["className","children"],c=function(e){var n=e.className,t=e.children,c=(0,r.A)(e,o);return(0,a.jsx)("table",Object.assign({className:(0,s.A)(i.table,n)},c,{children:t}))},l=["className","children"],d=function(e){var n=e.className,t=e.children,o=(0,r.A)(e,l);return(0,a.jsx)("tr",Object.assign({className:(0,s.A)(i.row,n)},o,{children:t}))},u=["as","className","children"],f=function(e){var n,t=e.as,o=e.className,c=e.children,l=(0,r.A)(e,u),d=null!=t?t:"td",f=(0,s.A)(i.cell,o,((n={})[i.td]="td"===t||void 0===t,n[i.th]="th"===t,n));return(0,a.jsx)(d,Object.assign({className:f},l,{children:c}))},h=t(4090),p=(0,h.q6)({name:"PopoverContext",nameOfHook:"usePopoverContext",nameOfProvider:"<PopoverProvider />"}),v=p[0],m=p[1],x=t(4041),j=t(6036),g=t(8972),b=t(4682),y=t(2913),I=function(e){var n=e.root,t=e.open,r=e.modal,s=e.offset,i=e.dismiss,a=e.duration,o=void 0===a?0:a,c=e.placement,l=e.defaultOpen,d=e.onOpenChange,u=(0,x.useState)(),f=u[0],p=u[1],v=(0,x.useState)(),m=v[0],I=v[1],L=(0,h.Gx)({value:t,defaultValue:l,onChange:d}),O=L[0],w=L[1],C=(0,j.we)({open:O,placement:c,whileElementsMounted:g.ll,onOpenChange:w,middleware:[(0,b.cY)(s)]}),N=C.refs,P=C.context,A=C.floatingStyles,k=function(e,n){var t=(0,j.$X)(e,{duration:{open:(0,y.E)(n)?n:n.enter,close:(0,y.E)(n)?n:n.leave}}),r=t.isMounted,s=t.status;return{mounted:r,status:"open"===s?"enter":"close"===s?"leave":"mount"}}(P,o),R=k.mounted,_=k.status,E=(0,j.bv)([(0,j.It)(P),(0,j.kp)(P),(0,j.s9)(P,{escapeKey:null==i?void 0:i.onEscapeKey,outsidePress:null==i?void 0:i.onPressOutside,ancestorScroll:null==i?void 0:i.onAncestorScroll})]);return{root:n,refs:N,modal:r,status:_,mounted:R,dismiss:i,context:P,placement:c,floatingStyles:A,open:O,labelId:f,descriptionId:m,setOpen:w,setLabelId:p,setDescriptionId:I,getFloatingProps:E.getFloatingProps,getReferenceProps:E.getReferenceProps}},L=function(e){var n=e.root,t=e.open,r=e.modal,s=e.offset,i=e.dismiss,o=e.duration,c=e.placement,l=e.children,d=e.defaultOpen,u=e.onOpenChange,f=I({root:n,open:t,modal:r,offset:s,dismiss:i,duration:o,placement:c,defaultOpen:d,onOpenChange:u});return(0,a.jsx)(v,{value:f,children:l})},O=((0,h.Rf)((function(e,n){var t=m(),r=t.refs,s=t.status,i=(0,h.Zy)(r.setPositionReference,n);return(0,a.jsx)(h.Du.div,Object.assign({ref:i,"data-status":s},e))})),(0,h.Rf)((function(e,n){var t=m(),r=t.open,s=t.refs,i=t.status,o=t.getReferenceProps,c=(0,h.Zy)(s.setReference,n);return(0,a.jsx)(h.Du.button,Object.assign({ref:c,type:"button","data-open":(0,h.OY)(r),"data-status":i},o(e)))}))),w=["style"],C=(0,h.Rf)((function(e,n){var t=e.style,s=(0,r.A)(e,w),i=m(),o=i.root,c=i.refs,l=i.modal,d=void 0!==l&&l,u=i.status,f=i.dismiss,p=i.mounted,v=i.placement,x=i.context,g=i.labelId,b=i.descriptionId,y=i.getFloatingProps,I=(0,h.Zy)(c.setFloating,n),L=null==f?void 0:f.onFocusOut;return p?(0,a.jsx)(j.XF,{id:o,children:(0,a.jsx)(j.s3,{modal:d,guards:!d,context:x,closeOnFocusOut:L,visuallyHiddenDismiss:d,children:(0,a.jsx)(h.Du.div,Object.assign({ref:I,style:Object.assign({},x.floatingStyles,t),"aria-labelledby":g,"aria-describedby":b,"data-status":u,"data-placement":v},y(s)))})}):null}));const N="table_Iji9",P="prop_XcUk",A="type_6lsl",k="trigger_qVE9",R="content_LiR4";var _=function(e){var n=e.children;return(0,a.jsxs)(L,{offset:5,children:[(0,a.jsx)(O,{className:k,children:">"}),(0,a.jsx)(C,{className:R,children:n})]})},E=function(e){var n=e.props;return(0,a.jsxs)(c,{className:N,children:[(0,a.jsx)("thead",{children:(0,a.jsxs)(d,{children:[(0,a.jsx)(f,{as:"th",children:"Prop"}),(0,a.jsx)(f,{as:"th",children:"Type"}),(0,a.jsx)(f,{as:"th",children:"Default"})]})}),(0,a.jsx)("tbody",{children:n.map((function(e){var n=e.name,t=e.type,r=e.typeAdvanced,s=e.defaultValue,i=void 0===s?"-":s;return(0,a.jsxs)(d,{children:[(0,a.jsx)(f,{className:P,children:n}),(0,a.jsxs)(f,{className:A,children:[t,r?(0,a.jsx)(_,{children:r}):null]}),(0,a.jsx)(f,{children:i})]})}))})]})},S=function(e){var n=e.attrs;return(0,a.jsxs)(c,{className:N,children:[(0,a.jsx)("thead",{children:(0,a.jsxs)(d,{children:[(0,a.jsx)(f,{as:"th",children:"Data attribute"}),(0,a.jsx)(f,{as:"th",children:"Present when"})]})}),(0,a.jsx)("tbody",{children:n.map((function(e){var n=e.name,t=e.description;return(0,a.jsxs)(d,{children:[(0,a.jsx)(f,{className:P,children:n}),(0,a.jsx)(f,{children:t})]})}))})]})}},1701:(e,n,t)=>{t.d(n,{_:()=>d});var r=t(1732),s=t(3759),i=t(3092);const a="showcase_OZLv",o="snippet_xoYL",c="viewport_Tpbl";var l=t(1085),d=function(e){var n=e.name,t=e.sources,d=e.children;return(0,l.jsxs)("div",{className:a,"aria-label":n,children:[(0,l.jsx)("div",{className:c,children:d}),t?(0,l.jsx)(r.A,{children:t.map((function(e){var n=e.file,t=e.content,r=e.language;return(0,l.jsx)(s.A,{value:n,label:n,children:(0,l.jsx)(i.Y,{language:r,className:o,children:t})})}))}):null]})}},3092:(e,n,t)=>{t.d(n,{Y:()=>o});var r=t(4506),s=t(4357);const i="snippet_PC2H";var a=t(1085),o=function(e){var n=e.children,t=e.className,o=e.language,c=e.identation,l=void 0===c?2:c,d=e.showLineNumbers,u=void 0===d||d,f=new Array(l).fill(" ").join("");return(0,a.jsx)("div",{className:(0,s.A)(i,t),children:(0,a.jsx)(r.A,{language:o,showLineNumbers:u,children:n.replace(/\t/g,f)})})}},4090:(e,n,t)=>{t.d(n,{q6:()=>s,Rf:()=>x,Du:()=>m,OY:()=>g,c9:()=>b,Pu:()=>I,Bi:()=>L,x8:()=>O,ZC:()=>w,Zy:()=>c,Gx:()=>C});var r=t(4041),s=function(e){var n=e.name,t=void 0===n?"Context":n,s=e.nameOfHook,i=void 0===s?"useContext":s,a=e.nameOfProvider,o=void 0===a?"Provider":a,c=e.defaultValue,l=(0,r.createContext)(c);l.displayName=t;return[l.Provider,function e(n){var s=(void 0===n?{}:n).strict,a=null==s||s,c=(0,r.useContext)(l);if(!c&&a){var d=function(e,n,t){var r=new Error(n+" returned `undefined`. Did you forget to wrap component within "+t);return r.name=e+"Error",r}(t,i,o);throw void 0!==Error.captureStackTrace&&Error.captureStackTrace(d,e),d}return c}]},i=t(7502),a=function(e){return"function"==typeof e},o=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){n.forEach((function(n){a(n)?n(e):function(e){return null!=e}(n)&&(n.current=e)}))}},c=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return(0,r.useCallback)(o.apply(void 0,n),n)},l=t(7517),d=function(e){return"string"==typeof e};function u(){for(var e=Object.assign({},arguments.length<=0?void 0:arguments[0]),n=1;n<arguments.length;n++){var t=n<0||arguments.length<=n?void 0:arguments[n],r=function(){var n=e[s],r=t[s];"style"===s&&(0,l.u)(n)&&(0,l.u)(r)?e[s]=Object.assign({},n,r):"className"===s&&d(n)&&d(r)?e[s]=n+" "+r:/^on[A-Z]/.test(s)&&a(n)&&a(r)?e[s]=function(){n.apply(void 0,arguments),r.apply(void 0,arguments)}:e[s]=null!=r?r:n};for(var s in t)r()}return e}var f,h=t(1085),p=["asChild","children"],v=function(e){var n=(0,r.forwardRef)((function(n,t){var s=n.asChild,a=n.children,c=(0,i.A)(n,p);if(!s)return(0,h.jsx)(e,Object.assign({ref:t},c,{children:a}));var l=r.Children.only(a);return(0,r.isValidElement)(l)?(0,r.cloneElement)(l,Object.assign({ref:t?o(t,l.ref):l.ref},u(c,l.props))):null}));return n.displayName=e.displayName||e.name,n},m=(f=new Map,new Proxy(v,{apply:function(e,n,t){return v(t[0])},get:function(e,n){return f.has(n)||f.set(n,v(n)),f.get(n)}})),x=function(e){return(0,r.forwardRef)(e)},j=t(2913);function g(e){return!0===e?"":(0,j.E)(e)||d(e)?e.toString():void 0}function b(e,n){void 0===n&&(n=[]);var t=(0,r.useRef)(e);return(0,r.useEffect)((function(){t.current=e}),[e]),(0,r.useCallback)((function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return null==t.current?void 0:t.current.apply(t,n)}),n)}var y=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return function(e){n.forEach((function(n){n&&!e.defaultPrevented&&n(e)}))}},I=function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return(0,r.useCallback)(y.apply(void 0,n),n)};var L=function(e){var n=(0,r.useId)();return null!=e?e:n},O=function(e,n){var t=L(e);return(0,r.useLayoutEffect)((function(){if(n)return n(t),function(){n(void 0)}}),[t,n]),t},w=function(e){var n=(0,r.useRef)(e),t=(0,r.useRef)(null),s=n.current;return e!==s&&(n.current=e,t.current=s),t.current},C=function(e){var n=e.value,t=e.defaultValue,s=e.onChange,i=void 0!==n,a=(0,r.useRef)(i),o=b(s),c=(0,r.useState)(t),l=c[0],d=c[1],u=i?n:l,f=(0,r.useCallback)((function(e){i||d(e),o(e)}),[i,o]);return(0,r.useEffect)((function(){a.current!==i&&(a.current=i,console.warn("Warning: A component is changing from being uncontrolled to controlled or vice versa."))}),[i]),[u,f]}},2913:(e,n,t)=>{t.d(n,{E:()=>r});var r=function(e){return Number.isFinite(e)}},7517:(e,n,t)=>{t.d(n,{u:()=>r});var r=function(e){return null!=e&&!Array.isArray(e)&&"object"==typeof e}}}]);