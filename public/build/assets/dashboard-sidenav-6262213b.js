import{r as o,j as n,bK as B,bV as D,aM as N,bl as E,cL as z,c as x,m as I,cM as k,a5 as O,N as F,I as T,p as H}from"./main-e7ef070d.js";const y=o.createContext(null);function A(e){const s=o.useRef();return o.useEffect(()=>{s.current=e},[e]),s.current}const K=o.memo(({bytes:e})=>n.jsx(o.Fragment,{children:B(e)}));function P(e=!1){o.useEffect(()=>(e?document.documentElement.classList.remove("no-page-overflow"):document.documentElement.classList.add("no-page-overflow"),()=>{document.documentElement.classList.remove("no-page-overflow")}),[e])}function Q({children:e,leftSidenavStatus:s,onLeftSidenavChange:r,rightSidenavStatus:u,initialRightSidenavStatus:c,onRightSidenavChange:l,name:t,leftSidenavCanBeCompact:m,height:d="h-screen",className:i,gridClassName:f="dashboard-grid",blockBodyOverflow:p=!0,...h}){P(!p);const a=D("(max-width: 1024px)"),g=o.useMemo(()=>t?N(`${t}.sidenav.compact`):!1,[t])?"compact":"open",[w,M]=E(s,a?"closed":g,r),C=o.useMemo(()=>{if(a)return"closed";if(c!=null)return c;const b=N(`${t}.sidenav.right.position`,"open");return b??(c||"closed")},[a,t,c]),[S,L]=E(u,C,l),j=o.useCallback(b=>{L(b),z(`${t}.sidenav.right.position`,b)},[L,t]),$=a&&(w==="open"||S==="open");return n.jsx(y.Provider,{value:{leftSidenavStatus:w,setLeftSidenavStatus:M,rightSidenavStatus:S,setRightSidenavStatus:j,leftSidenavCanBeCompact:m,name:t,isMobileMode:a},children:n.jsxs("div",{...h,className:x("relative isolate",f,i,d),children:[e,n.jsx(I,{children:$&&n.jsx(k,{position:"fixed",onClick:()=>{M("closed"),j("closed")}},"dashboard-underlay")})]})})}const R=O(n.jsx("path",{d:"M3 18h13v-2H3v2zm0-5h10v-2H3v2zm0-7v2h13V6H3zm18 9.59L17.42 12 21 8.41 19.59 7l-5 5 5 5L21 15.59z"}),"MenuOpenOutlined");function _({children:e,className:s,hideToggleButton:r,...u}){const{isMobileMode:c,leftSidenavStatus:l,setLeftSidenavStatus:t,name:m,leftSidenavCanBeCompact:d}=o.useContext(y),i=d&&!c,f=!r&&(c||d),p=()=>{t(l==="open"?"closed":"open")},h=()=>{const a=l==="compact"?"open":"compact";z(`${m}.sidenav.compact`,a==="compact"),t(a)};return n.jsx(F,{className:x("dashboard-grid-navbar",s),border:"border-b",size:"sm",toggleButton:f?n.jsx(T,{size:"md",onClick:()=>{i?h():p()},children:n.jsx(R,{})}):void 0,...u,children:e})}function q({children:e,isScrollable:s=!0}){return o.cloneElement(e,{className:x(e.props.className,s&&"overflow-y-auto stable-scrollbar","dashboard-grid-content")})}function G({className:e,position:s,children:r,size:u="md",mode:c,overlayPosition:l="fixed",display:t="flex",overflow:m="overflow-hidden",forceClosed:d=!1}){const{isMobileMode:i,leftSidenavStatus:f,setLeftSidenavStatus:p,rightSidenavStatus:h,setRightSidenavStatus:a}=o.useContext(y),v=s==="left"?f:h,g=i||c==="overlay",w={open:{display:t,width:null},compact:{display:t,width:null},closed:{width:0,transitionEnd:{display:"none"}}},M=U(v==="compact"?"compact":u);return n.jsx(H.div,{variants:w,initial:!1,animate:d?"closed":v,transition:{type:"tween",duration:.15},onClick:C=>{const S=C.target;i&&(S.closest("button")||S.closest("a"))&&(p("closed"),a("closed"))},className:x(e,s==="left"?"dashboard-grid-sidenav-left":"dashboard-grid-sidenav-right","will-change-[width]",m,M,g&&`${l} bottom-0 top-0 z-20 shadow-2xl`,g&&s==="left"&&"left-0",g&&s==="right"&&"right-0"),children:o.cloneElement(r,{className:x(r.props.className,"w-full h-full",v==="compact"&&"compact-scrollbar"),isCompactMode:v==="compact"})})}function U(e){switch(e){case"compact":return"w-80";case"sm":return"w-224";case"md":return"w-240";case"lg":return"w-288";default:return e||""}}export{y as D,K as F,R as M,Q as a,_ as b,G as c,q as d,A as u};
//# sourceMappingURL=dashboard-sidenav-6262213b.js.map
