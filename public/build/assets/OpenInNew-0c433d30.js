import{ac as o,f as r,a2 as a,a3 as e,s as c,h as i,a5 as u,j as p}from"./main-36ea5821.js";function S(){const{trans:s}=o();return r({mutationFn:n=>l(n),onSuccess:(n,t)=>{a(t.delete?s(e("Subscription deleted.")):s(e("Subscription cancelled.")))},onError:n=>c(n)})}function l({subscriptionId:s,...n}){return i.post(`billing/subscriptions/${s}/cancel`,n).then(t=>t.data)}function d(){const{trans:s}=o();return r({mutationFn:n=>b(n),onSuccess:()=>{a(s(e("Subscription renewed.")))},onError:n=>c(n)})}function b({subscriptionId:s}){return i.post(`billing/subscriptions/${s}/resume`).then(n=>n.data)}const m=u(p.jsx("path",{d:"M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"}),"OpenInNewOutlined");export{m as O,d as a,S as u};
//# sourceMappingURL=OpenInNew-0c433d30.js.map