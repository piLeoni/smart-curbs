(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[993],{1867:function(e,n,i){"use strict";var t=i(6822),r=i(7294),o=i(5893);n.Z=function(e){var n=(0,r.useState)("100vh"),i=n[0],s=n[1];return(0,r.useEffect)((function(){var e=document.getElementsByClassName("MuiAppBar-root")[0].clientHeight;s("".concat(window.innerHeight-e,"px"))}),[]),(0,o.jsx)(t.Z,{sx:{minHeight:i,display:"flex",alignItems:"center",justifyContent:"center"},children:e.children})}},2931:function(e,n,i){"use strict";var t=i(6886),r=i(6822),o=i(2734),s=i(5893);n.Z=function(e){return(0,o.Z)(),(0,s.jsxs)(t.ZP,{container:!0,sx:{mb:0,color:"primary.dark"},children:[(0,s.jsx)(t.ZP,{item:!0,sx:{typography:"h3",fontWeight:"bold",lineHeight:1,color:e.color||"secondary.main",mb:1},md:7,xs:10,dangerouslySetInnerHTML:{__html:e.title}}),(0,s.jsx)(t.ZP,{item:!0,sx:{typography:"h5",fontWeight:"regular",mb:2,color:e.color||"secondary.main"},md:12,xs:12,children:e.subtitle}),(0,s.jsx)(t.ZP,{item:!0,xs:12,md:12,sx:{typography:"body1",fontSize:"1.2rem",fontWeight:"light",pb:3},children:(0,s.jsx)(r.Z,{dangerouslySetInnerHTML:{__html:e.body},sx:{pb:3,columnCount:e.columns||{xs:1,md:2},maxWidth:"120ch",color:e.color||"primary.main"}})})]})}},1295:function(e,n,i){"use strict";var t=i(1911),r=i(8352),o=i(6822),s=i(4358),l=i(2931),c=(i(1082),i(6797),i(5511)),a=i.n(c),d=i(7294),u=i(302),p=i(2734),h=i(5893);n.Z=function(e){var n=(0,p.Z)(),i=(0,d.useState)(!1),c=i[0],x=i[1],f=(0,d.useState)(null),m=f[0],g=f[1],w=(0,d.useState)(null),S=w[0],b=w[1],_=(0,d.useState)(!1),y=_[0],j=_[1];function Z(){console.log("resize"),window.innerWidth<n.breakpoints.values.sm&&j(!0)}return(0,d.useEffect)((function(){return Z(),window.addEventListener("resize",Z),function(){window.removeEventListener("resize",Z)}}),[]),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsxs)(o.Z,{sx:{backgroundColor:"secondary.main",pt:2,pb:1},children:[(0,h.jsx)(u.Z,{sx:{position:"relative",height:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:(0,h.jsx)(o.Z,{sx:{position:"relative",height:"100%"},children:(0,h.jsx)(l.Z,{subtitle:e.contents.subtitle,body:e.contents.body,color:"white",columns:1})})}),!y&&(0,h.jsx)(r.tq,{slidesPerView:y?1.2:3,spaceBetween:10,onSwiper:g,children:e.contents.images.map((function(e,n){return(0,h.jsx)(r.o5,{style:{boxSizing:"border-box"},children:(0,h.jsxs)(o.Z,{sx:{display:"flex",position:"relative"},children:[(0,h.jsx)("img",{style:{width:"100%"},src:"".concat("/","/").concat(e.url),alt:""}),(0,h.jsx)(o.Z,{sx:{boxSizing:"border-box",position:"absolute",bottom:"0px",width:"100%",height:"100%",typography:{xs:"body2",sm:"body1"},color:"white",background:"linear-gradient(0deg, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",transition:"opacity 0.5s ease-out",opacity:y?1:0,display:"flex",flexDirection:"column",justifyContent:"end",p:3,"&:hover":{opacity:1}},children:(0,h.jsx)(o.Z,{dangerouslySetInnerHTML:{__html:e.intro}})})]})},"slide-".concat(n))}))}),y&&(0,h.jsx)(u.Z,{children:e.contents.images.map((function(e,n){return(0,h.jsxs)(o.Z,{onClick:function(e){return function(e){S.slideTo(e,0),x(!0)}(n)},sx:{py:2},children:[(0,h.jsx)("img",{style:{width:"100%"},src:"".concat("/","/").concat(e.url),alt:""}),(0,h.jsx)(o.Z,{sx:{color:"white"},dangerouslySetInnerHTML:{__html:e.intro}})]},"slide-".concat(n))}))})]}),(0,h.jsx)(s.Z,{sx:{color:"#fff",zIndex:function(e){return e.zIndex.drawer+1}},className:"".concat(a().fullScreenWrapper," "),open:c,onClick:function(){return x(!1)},children:(0,h.jsx)(r.tq,{modules:[t.tl],onSwiper:b,pagination:!0,onSlideChange:function(e){return m.slideTo(e.activeIndex)},children:e.contents.images.map((function(e,n){return(0,h.jsx)(r.o5,{className:"".concat(a().fullScreenSlide," "),children:(0,h.jsx)("img",{alt:"",className:"".concat(a().fullScreenImage," "),src:"".concat("/","/").concat(e.url)})},"slide-".concat(n))}))})})]})}},9583:function(e,n,i){"use strict";i.r(n),i.d(n,{__N_SSG:function(){return p}});var t=i(6822),r=i(6886),o=i(1295),s=i(2931),l=i(302),c=i(7294),a=i(2734),d=i(1867),u=i(5893);var p=!0;n.default=function(e){var n=(0,a.Z)(),i=(0,c.useState)(2.5),p=i[0],h=i[1];return(0,c.useEffect)((function(){window.innerWidth>n.breakpoints.values.xs&&h(1.1),window.innerWidth>n.breakpoints.values.sm&&h(1.6),window.innerWidth>n.breakpoints.values.md&&h(2.1),window.innerWidth>n.breakpoints.values.lg&&h(2.6),window.innerWidth>n.breakpoints.values.xl&&h(3.1)}),[]),(0,u.jsx)(t.Z,{sx:{pt:6},children:(0,u.jsxs)(t.Z,{children:[(0,u.jsx)(l.Z,{children:(0,u.jsx)(d.Z,{children:(0,u.jsx)(s.Z,{title:e.intro.title,subtitle:e.intro.subtitle,body:e.intro.body})})}),(0,u.jsx)(r.ZP,{container:!0,spacing:2,children:(0,u.jsx)(r.ZP,{item:!0,md:12,children:(0,u.jsx)(o.Z,{contents:e.slides,whitePagination:!0,sx:{minHeight:"100vh"},slidesPerView:p,centeredSlides:!1})})})]})})}},6451:function(e,n,i){(window.__NEXT_P=window.__NEXT_P||[]).push(["/future-curbs",function(){return i(9583)}])},5511:function(e){e.exports={primaryColor:"#1f2e4b",secondaryColor:"#1f7ff0",errorColor:"#dd4b79",warningColor:"#f78bfb",infoColor:"#e5e1d1",successColor:"#4ee2c0",SlideFrame:"SlidesSwiper_SlideFrame__RoJwd",SlideImage:"SlidesSwiper_SlideImage__9OFjI",OverlayColor:"SlidesSwiper_OverlayColor__CMSfJ",fullScreenSlide:"SlidesSwiper_fullScreenSlide__fCZby",fullScreenImage:"SlidesSwiper_fullScreenImage__V9S03",whitePagination:"SlidesSwiper_whitePagination__C79cU","swiper-pagination-bullet":"SlidesSwiper_swiper-pagination-bullet__W3hV8","swiper-pagination-bullet-active":"SlidesSwiper_swiper-pagination-bullet-active__ayaQV",sliderWrapper:"SlidesSwiper_sliderWrapper__PXNGx"}}},function(e){e.O(0,[797,774,888,179],(function(){return n=6451,e(e.s=n);var n}));var n=e.O();_N_E=n}]);