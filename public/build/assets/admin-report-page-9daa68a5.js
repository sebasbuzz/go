import{r as i,j as e,bb as m,T as n}from"./main-e7ef070d.js";import{u as p,R as l,A as d,V as x}from"./admin-routes-585474b0.js";import{V as c}from"./search-report-table-f6cb928f.js";import"./dashboard-sidenav-6262213b.js";import"./reply-editor-41efed28.js";import"./Edit-b7607853.js";import"./use-customer-ticket-request-types-d8c46cca.js";import"./OpenInNew-b7acfce4.js";import"./bullet-seprated-items-58c0a149.js";function A(){const[s,o]=i.useState(()=>c[2].getRangeValue()),{isLoading:a,data:t}=p({dateRange:s}),r=e.jsx(n,{message:"Visitors report"});return e.jsxs("div",{className:"min-h-full gap-12 overflow-x-hidden p-12 md:gap-24 md:p-24",children:[e.jsxs("div",{className:"mb-24 items-center justify-between gap-24 md:flex",children:[e.jsx(m,{children:r}),e.jsx("h1",{className:"mb-24 text-3xl font-light md:mb-0",children:r}),e.jsx(l,{value:s,onChange:o})]}),e.jsx(d,{report:t==null?void 0:t.headerReport}),e.jsx(x,{report:t==null?void 0:t.visitorsReport,isLoading:a})]})}export{A as default};
//# sourceMappingURL=admin-report-page-9daa68a5.js.map
