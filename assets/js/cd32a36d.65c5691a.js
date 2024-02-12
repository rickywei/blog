"use strict";(self.webpackChunkmy_website=self.webpackChunkmy_website||[]).push([[876],{9076:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>p,default:()=>a,frontMatter:()=>r,metadata:()=>d,toc:()=>l});var i=t(7624),s=t(2172);const r={description:"How to design open api auth"},p="\u5982\u4f55\u8bbe\u8ba1API\u63a5\u53e3\uff08\u5f00\u653e\u5e73\u53f0\uff09\u9274\u6743",d={id:"design/auth",title:"\u5982\u4f55\u8bbe\u8ba1API\u63a5\u53e3\uff08\u5f00\u653e\u5e73\u53f0\uff09\u9274\u6743",description:"How to design open api auth",source:"@site/docs/design/002_auth.mdx",sourceDirName:"design",slug:"/design/auth",permalink:"/blog/docs/design/auth",draft:!1,unlisted:!1,tags:[],version:"current",sidebarPosition:2,frontMatter:{description:"How to design open api auth"},sidebar:"designSidebar",previous:{title:"\u5982\u4f55\u8bbe\u8ba1\u6d88\u606f\u961f\u5217",permalink:"/blog/docs/design/mq"}},c={},l=[{value:"\u5982\u4f55\u786e\u5b9a\u662f\u8c01\u5728\u8bf7\u6c42\u8d44\u6e90\uff1f",id:"\u5982\u4f55\u786e\u5b9a\u662f\u8c01\u5728\u8bf7\u6c42\u8d44\u6e90",level:2},{value:"\u540c\u4e00\u4e2aAppId\u4e0b\u5982\u4f55\u533a\u5206\u6743\u9650\uff08\u5982\u5b50\u8d26\u53f7\uff09\uff1f",id:"\u540c\u4e00\u4e2aappid\u4e0b\u5982\u4f55\u533a\u5206\u6743\u9650\u5982\u5b50\u8d26\u53f7",level:2},{value:"\u4e3a\u4ec0\u4e48\u9700\u8981AppSecret",id:"\u4e3a\u4ec0\u4e48\u9700\u8981appsecret",level:2},{value:"\u5982\u4f55\u4fdd\u8bc1\u53c2\u6570\u6ca1\u6709\u88ab\u7be1\u6539",id:"\u5982\u4f55\u4fdd\u8bc1\u53c2\u6570\u6ca1\u6709\u88ab\u7be1\u6539",level:2},{value:"\u5982\u4f55\u9632\u6b62\u91cd\u653e\u653b\u51fb",id:"\u5982\u4f55\u9632\u6b62\u91cd\u653e\u653b\u51fb",level:2},{value:"\u670d\u52a1\u7aef\u5982\u4f55\u9a8c\u8bc1\u53c2\u6570\u548c\u7b7e\u540d",id:"\u670d\u52a1\u7aef\u5982\u4f55\u9a8c\u8bc1\u53c2\u6570\u548c\u7b7e\u540d",level:2}];function o(e){const n={code:"code",h1:"h1",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",...(0,s.M)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"\u5982\u4f55\u8bbe\u8ba1api\u63a5\u53e3\u5f00\u653e\u5e73\u53f0\u9274\u6743",children:"\u5982\u4f55\u8bbe\u8ba1API\u63a5\u53e3\uff08\u5f00\u653e\u5e73\u53f0\uff09\u9274\u6743"}),"\n",(0,i.jsx)(n.h2,{id:"\u5982\u4f55\u786e\u5b9a\u662f\u8c01\u5728\u8bf7\u6c42\u8d44\u6e90",children:"\u5982\u4f55\u786e\u5b9a\u662f\u8c01\u5728\u8bf7\u6c42\u8d44\u6e90\uff1f"}),"\n",(0,i.jsx)(n.p,{children:"AppId\uff1a\u6bcf\u4e2a\u5f00\u53d1\u8005\u90fd\u6709\u4e00\u4e2a\u552f\u4e00\u6807\u8bc6\uff0c\u5982uuid"}),"\n",(0,i.jsx)(n.h2,{id:"\u540c\u4e00\u4e2aappid\u4e0b\u5982\u4f55\u533a\u5206\u6743\u9650\u5982\u5b50\u8d26\u53f7",children:"\u540c\u4e00\u4e2aAppId\u4e0b\u5982\u4f55\u533a\u5206\u6743\u9650\uff08\u5982\u5b50\u8d26\u53f7\uff09\uff1f"}),"\n",(0,i.jsx)(n.p,{children:"AppKey\uff1a\u6bcf\u4e2aAppKey\u5173\u8054\u4e0d\u540c\u7684\u6743\u9650\uff0c\u5982\u53ea\u8bfb"}),"\n",(0,i.jsx)(n.h2,{id:"\u4e3a\u4ec0\u4e48\u9700\u8981appsecret",children:"\u4e3a\u4ec0\u4e48\u9700\u8981AppSecret"}),"\n",(0,i.jsx)(n.p,{children:"\u8bf7\u6c42\u901a\u5e38\u5c06AppId\u548cAppKey\u660e\u6587\u5b58\u653e\u5728\u8bf7\u6c42header\u4e2d\uff0c\u53c2\u6570\u88ab\u6293\u5305\u540e\u5f88\u5bb9\u6613\u8fdb\u884c\u653b\u51fb\uff0cAppSecret\u7528\u6765\u7b7e\u540d\u53c2\u6570\uff08\u52a0\u5bc6\uff09"}),"\n",(0,i.jsx)(n.h2,{id:"\u5982\u4f55\u4fdd\u8bc1\u53c2\u6570\u6ca1\u6709\u88ab\u7be1\u6539",children:"\u5982\u4f55\u4fdd\u8bc1\u53c2\u6570\u6ca1\u6709\u88ab\u7be1\u6539"}),"\n",(0,i.jsx)(n.p,{children:"\u5bf9\u9700\u8981\u6821\u9a8c\u7684\u53c2\u6570\u8fdb\u884c\u7b7e\u540d"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\u62fc\u63a5\u8bf7\u6c42method+url\n",(0,i.jsx)(n.code,{children:"GEThttp://api.com"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u62fc\u63a5appiId\u548cappKey\n",(0,i.jsx)(n.code,{children:"GEThttp://api.comxxxyyy"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u62fc\u63a5\u6309\u5b57\u5178\u5e8f\u6392\u5e8f\u7684\u6240\u6709\u5176\u4ed6\u53c2\u6570\n",(0,i.jsx)(n.code,{children:"GEThttp://api.comxxxyyyk1v1k2v2k3v3"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u4f7f\u7528appSecret\u8ba1\u7b97sha256\u5f97\u5230\u7b7e\u540d\n",(0,i.jsx)(n.code,{children:"SHA256(GEThttp://api.comxxxyyyk1v1k2v2k3v3, secret)"})]}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-go",children:"//golang example\nfunc sign(method, url, appId, appKey, appSecret string, args map[string]string) string {\n\t// 1. \u62fc\u63a5 method + url\n\tstr := method + url\n\n\t// 2. \u62fc\u63a5 appId + appKey\n\tstr = str + appId + appKey\n\n\t// 3. \u62fc\u63a5\u6240\u6709\u53c2\u6570\uff0c\u6309\u53c2\u6570\u540d\u5b57\u5178\u5e8f\u6392\u5217\u6240\u6709\u53c2\u6570\u548c\u5176\u503c\n    //    args = query args + form args + body args\n\tkeys := lo.Keys(args)\n\tsort.Strings(keys)\n\tfor _, k := range keys {\n\t\tstr += k + args[k]\n\t}\n\n\t// 4. \u4f7f\u7528appSecret\u8ba1\u7b97hmac SHA256\n    //    \u4e5f\u53ef\u5c06appSecret\u52a0\u5165\u53c2\u6570\u540e\u8ba1\u7b97MD5\u4f5c\u4e3a\u7b7e\u540d\n\th := hmac.New(sha256.New, []byte(appSecret))\n\t_, _ = h.Write([]byte(str))\n\treturn hex.EncodeToString(h.Sum(nil))\n}\n\n// 5. \u8bbe\u7f6e\u7b7e\u540d\u5230\u8bf7\u6c42header X-Signature\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u5982\u4f55\u9632\u6b62\u91cd\u653e\u653b\u51fb",children:"\u5982\u4f55\u9632\u6b62\u91cd\u653e\u653b\u51fb"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5728\u53c2\u6570\u4e2d\u6dfb\u52a0timestamp\u5e76\u4e00\u8d77\u7b7e\u540d\uff0c\u670d\u52a1\u7aef\u9a8c\u8bc1\u65f6\u9700\u6821\u9a8ctimestamp\u5728\u4e00\u5b9a\u65f6\u95f4\u8303\u56f4\u5185\uff0c\u5982",(0,i.jsx)(n.code,{children:"timestamp <= now <= timestamp + 60s"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u5728\u53c2\u6570\u4e2d\u6dfb\u52a0nonce\uff08\u968f\u673a\u503c\uff09\u5e76\u4e00\u8d77\u7b7e\u540d\uff0c\u670d\u52a1\u7aef\u9a8c\u8bc1\u65f6\u9700\u6821\u9a8c\u8be5nonce\u503c\u5e94\u8be5\u6ca1\u6709\u88ab\u4f7f\u7528\u8fc7\uff0c\u540c\u65f6\u6807\u8bb0\u4e00\u6bb5\u65f6\u95f4\u5185\u8be5nonce\u4e0d\u53ef\u7528\uff0c\u5982\u5199\u5165redis ",(0,i.jsx)(n.code,{children:'SETEX AppId+AppKey+nonce 60 ""'})]}),"\n",(0,i.jsx)(n.li,{children:"\u4ec5\u4f7f\u7528timestamp\u65f6\uff0c\u653b\u51fb\u8005\u53ef\u5728\u4e00\u4e2a\u8303\u56f4\u5185\u91cd\u653e\u653b\u51fb\uff1b\u4ec5\u4f7f\u7528nonce\u653b\u51fb\u8005\u53ef\u4ee5\u5728\u6bcf\u9694\u4e00\u6bb5\u65f6\u95f4\u91cd\u653e\u653b\u51fb"}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"\u670d\u52a1\u7aef\u5982\u4f55\u9a8c\u8bc1\u53c2\u6570\u548c\u7b7e\u540d",children:"\u670d\u52a1\u7aef\u5982\u4f55\u9a8c\u8bc1\u53c2\u6570\u548c\u7b7e\u540d"}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"\u9a8c\u8bc1AppId\u548cAppKey\u662f\u5426\u5408\u6cd5\uff08\u5b58\u5728\u4e14\u914d\u5957\uff09"}),"\n",(0,i.jsx)(n.li,{children:"\u9a8c\u8bc1appKey\u5bf9\u5e94\u6743\u9650\u662f\u5426\u6ee1\u8db3\u8bf7\u6c42\u7684\u63a5\u53e3"}),"\n",(0,i.jsx)(n.li,{children:"\u9a8c\u8bc1timestamp\u662f\u5426\u5728\u5141\u8bb8\u8303\u56f4\u5185"}),"\n",(0,i.jsx)(n.li,{children:"\u9a8c\u8bc1nonce\u662f\u5426\u672a\u4f7f\u7528"}),"\n",(0,i.jsx)(n.li,{children:"\u9a8c\u8bc1\u7b7e\u540d\u662f\u5426\u6b63\u786e\uff08\u6309\u76f8\u540c\u89c4\u5219\u91cd\u65b0\u8ba1\u7b97\u5bf9\u6bd4\u662f\u5426\u76f8\u540c\uff09"}),"\n"]})]})}function a(e={}){const{wrapper:n}={...(0,s.M)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(o,{...e})}):o(e)}},2172:(e,n,t)=>{t.d(n,{I:()=>d,M:()=>p});var i=t(1504);const s={},r=i.createContext(s);function p(e){const n=i.useContext(r);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function d(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:p(e.components),i.createElement(r.Provider,{value:n},e.children)}}}]);