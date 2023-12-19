const e="undefined"!=typeof window,t=e&&!("onscroll"in window)||"undefined"!=typeof navigator&&/(gle|ing|ro)bot|crawl|spider/i.test(navigator.userAgent),a=e&&"IntersectionObserver"in window,s=e&&"classList"in document.createElement("p"),l=e&&window.devicePixelRatio>1,n={elements_selector:".lazy",container:t||e?document:null,threshold:300,thresholds:null,data_src:"src",data_srcset:"srcset",data_sizes:"sizes",data_bg:"bg",data_bg_hidpi:"bg-hidpi",data_bg_multi:"bg-multi",data_bg_multi_hidpi:"bg-multi-hidpi",data_bg_set:"bg-set",data_poster:"poster",class_applied:"applied",class_loading:"loading",class_loaded:"loaded",class_error:"error",class_entered:"entered",class_exited:"exited",unobserve_completed:!0,unobserve_entered:!1,cancel_on_exit:!0,callback_enter:null,callback_exit:null,callback_applied:null,callback_loading:null,callback_loaded:null,callback_error:null,callback_finish:null,callback_cancel:null,use_native:!1,restore_on_error:!1},o=e=>Object.assign({},n,e),r=function(e,t){let a;const s="LazyLoad::Initialized",l=new e(t);try{a=new CustomEvent(s,{detail:{instance:l}})}catch(e){a=document.createEvent("CustomEvent"),a.initCustomEvent(s,!1,!1,{instance:l})}window.dispatchEvent(a)},i="src",c="llOriginalAttrs",d=(e,t)=>e.getAttribute("data-"+t),_=e=>d(e,"ll-status"),u=(e,t)=>((e,t,a)=>{var s="data-ll-status";null!==a?e.setAttribute(s,a):e.removeAttribute(s)})(e,0,t),g=e=>u(e,null),b=e=>null===_(e),m=e=>"native"===_(e),p=["loading","loaded","applied","error"],h=(e,t,a,s)=>{e&&(void 0===s?void 0===a?e(t):e(t,a):e(t,a,s))},v=(e,t)=>{s?e.classList.add(t):e.className+=(e.className?" ":"")+t},E=(e,t)=>{s?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\s+)"+t+"(\\s+|$)")," ").replace(/^\s+/,"").replace(/\s+$/,"")},f=e=>e.llTempImage,I=(e,t)=>{if(!t)return;const a=t._observer;a&&a.unobserve(e)},k=(e,t)=>{e&&(e.loadingCount+=t)},A=(e,t)=>{e&&(e.toLoadCount=t)},w=e=>{let t=[];for(let a,s=0;a=e.children[s];s+=1)"SOURCE"===a.tagName&&t.push(a);return t},y=(e,t)=>{const a=e.parentNode;a&&"PICTURE"===a.tagName&&w(a).forEach(t)},L=(e,t)=>{w(e).forEach(t)},O=[i],x=[i,"poster"],C=[i,"srcset","sizes"],N=["data"],M=e=>!!e[c],z=e=>e[c],R=e=>delete e[c],T=(e,t)=>{if(M(e))return;const a={};t.forEach((t=>{a[t]=e.getAttribute(t)})),e[c]=a},G=(e,t)=>{if(!M(e))return;const a=z(e);t.forEach((t=>{((e,t,a)=>{a?e.setAttribute(t,a):e.removeAttribute(t)})(e,t,a[t])}))},D=(e,t,a)=>{v(e,t.class_applied),u(e,"applied"),a&&(t.unobserve_completed&&I(e,t),h(t.callback_applied,e,a))},H=(e,t,a)=>{v(e,t.class_loading),u(e,"loading"),a&&(k(a,1),h(t.callback_loading,e,a))},V=(e,t,a)=>{a&&e.setAttribute(t,a)},$=(e,t)=>{V(e,"sizes",d(e,t.data_sizes)),V(e,"srcset",d(e,t.data_srcset)),V(e,i,d(e,t.data_src))},F={IMG:(e,t)=>{y(e,(e=>{T(e,C),$(e,t)})),T(e,C),$(e,t)},IFRAME:(e,t)=>{T(e,O),V(e,i,d(e,t.data_src))},VIDEO:(e,t)=>{L(e,(e=>{T(e,O),V(e,i,d(e,t.data_src))})),T(e,x),V(e,"poster",d(e,t.data_poster)),V(e,i,d(e,t.data_src)),e.load()},OBJECT:(e,t)=>{T(e,N),V(e,"data",d(e,t.data_src))}},j=["IMG","IFRAME","VIDEO","OBJECT"],B=(e,t)=>{!t||(e=>e.loadingCount>0)(t)||(e=>e.toLoadCount>0)(t)||h(e.callback_finish,t)},J=(e,t,a)=>{e.addEventListener(t,a),e.llEvLisnrs[t]=a},S=(e,t,a)=>{e.removeEventListener(t,a)},P=e=>!!e.llEvLisnrs,U=e=>{if(!P(e))return;const t=e.llEvLisnrs;for(let a in t){const s=t[a];S(e,a,s)}delete e.llEvLisnrs},q=(e,t,a)=>{(e=>{delete e.llTempImage})(e),k(a,-1),(e=>{e&&(e.toLoadCount-=1)})(a),E(e,t.class_loading),t.unobserve_completed&&I(e,a)},K=(e,t,a)=>{const s=f(e)||e;P(s)||((e,t,a)=>{P(e)||(e.llEvLisnrs={});const s="VIDEO"===e.tagName?"loadeddata":"load";J(e,s,t),J(e,"error",a)})(s,(l=>{((e,t,a,s)=>{const l=m(t);q(t,a,s),v(t,a.class_loaded),u(t,"loaded"),h(a.callback_loaded,t,s),l||B(a,s)})(0,e,t,a),U(s)}),(l=>{((e,t,a,s)=>{const l=m(t);q(t,a,s),v(t,a.class_error),u(t,"error"),h(a.callback_error,t,s),a.restore_on_error&&G(t,C),l||B(a,s)})(0,e,t,a),U(s)}))},Q=(e,t,a)=>{(e=>j.indexOf(e.tagName)>-1)(e)?((e,t,a)=>{K(e,t,a),((e,t,a)=>{const s=F[e.tagName];s&&(s(e,t),H(e,t,a))})(e,t,a)})(e,t,a):((e,t,a)=>{(e=>{e.llTempImage=document.createElement("IMG")})(e),K(e,t,a),(e=>{M(e)||(e[c]={backgroundImage:e.style.backgroundImage})})(e),((e,t,a)=>{const s=d(e,t.data_bg),n=d(e,t.data_bg_hidpi),o=l&&n?n:s;o&&(e.style.backgroundImage=`url("${o}")`,f(e).setAttribute(i,o),H(e,t,a))})(e,t,a),((e,t,a)=>{const s=d(e,t.data_bg_multi),n=d(e,t.data_bg_multi_hidpi),o=l&&n?n:s;o&&(e.style.backgroundImage=o,D(e,t,a))})(e,t,a),((e,t,a)=>{const s=d(e,t.data_bg_set);if(!s)return;const l=s.split("|");let n=l.map((e=>`image-set(${e})`));e.style.backgroundImage=n.join(),""===e.style.backgroundImage&&(n=l.map((e=>`-webkit-image-set(${e})`)),e.style.backgroundImage=n.join()),D(e,t,a)})(e,t,a)})(e,t,a)},W=e=>{e.removeAttribute(i),e.removeAttribute("srcset"),e.removeAttribute("sizes")},X=e=>{y(e,(e=>{G(e,C)})),G(e,C)},Y={IMG:X,IFRAME:e=>{G(e,O)},VIDEO:e=>{L(e,(e=>{G(e,O)})),G(e,x),e.load()},OBJECT:e=>{G(e,N)}},Z=(e,t)=>{(e=>{const t=Y[e.tagName];t?t(e):(e=>{if(!M(e))return;const t=z(e);e.style.backgroundImage=t.backgroundImage})(e)})(e),((e,t)=>{b(e)||m(e)||(E(e,t.class_entered),E(e,t.class_exited),E(e,t.class_applied),E(e,t.class_loading),E(e,t.class_loaded),E(e,t.class_error))})(e,t),g(e),R(e)},ee=["IMG","IFRAME","VIDEO"],te=e=>e.use_native&&"loading"in HTMLImageElement.prototype,ae=(e,t,a)=>{e.forEach((e=>(e=>e.isIntersecting||e.intersectionRatio>0)(e)?((e,t,a,s)=>{const l=(e=>p.indexOf(_(e))>=0)(e);u(e,"entered"),v(e,a.class_entered),E(e,a.class_exited),((e,t,a)=>{t.unobserve_entered&&I(e,a)})(e,a,s),h(a.callback_enter,e,t,s),l||Q(e,a,s)})(e.target,e,t,a):((e,t,a,s)=>{b(e)||(v(e,a.class_exited),((e,t,a,s)=>{a.cancel_on_exit&&(e=>"loading"===_(e))(e)&&"IMG"===e.tagName&&(U(e),(e=>{y(e,(e=>{W(e)})),W(e)})(e),X(e),E(e,a.class_loading),k(s,-1),g(e),h(a.callback_cancel,e,t,s))})(e,t,a,s),h(a.callback_exit,e,t,s))})(e.target,e,t,a)))},se=e=>Array.prototype.slice.call(e),le=e=>e.container.querySelectorAll(e.elements_selector),ne=e=>(e=>"error"===_(e))(e),oe=(e,t)=>(e=>se(e).filter(b))(e||le(t)),re=function(t,s){const l=o(t);this._settings=l,this.loadingCount=0,((e,t)=>{a&&!te(e)&&(t._observer=new IntersectionObserver((a=>{ae(a,e,t)}),(e=>({root:e.container===document?null:e.container,rootMargin:e.thresholds||e.threshold+"px"}))(e)))})(l,this),((t,a)=>{e&&(a._onlineHandler=()=>{((e,t)=>{var a;(a=le(e),se(a).filter(ne)).forEach((t=>{E(t,e.class_error),g(t)})),t.update()})(t,a)},window.addEventListener("online",a._onlineHandler))})(l,this),this.update(s)};re.prototype={update:function(e){const s=this._settings,l=oe(e,s);var n,o;A(this,l.length),!t&&a?te(s)?((e,t,a)=>{e.forEach((e=>{-1!==ee.indexOf(e.tagName)&&((e,t,a)=>{e.setAttribute("loading","lazy"),K(e,t,a),((e,t)=>{const a=F[e.tagName];a&&a(e,t)})(e,t),u(e,"native")})(e,t,a)})),A(a,0)})(l,s,this):(o=l,(e=>{e.disconnect()})(n=this._observer),((e,t)=>{t.forEach((t=>{e.observe(t)}))})(n,o)):this.loadAll(l)},destroy:function(){this._observer&&this._observer.disconnect(),e&&window.removeEventListener("online",this._onlineHandler),le(this._settings).forEach((e=>{R(e)})),delete this._observer,delete this._settings,delete this._onlineHandler,delete this.loadingCount,delete this.toLoadCount},loadAll:function(e){const t=this._settings;oe(e,t).forEach((e=>{I(e,this),Q(e,t,this)}))},restoreAll:function(){const e=this._settings;le(e).forEach((t=>{Z(t,e)}))}},re.load=(e,t)=>{const a=o(t);Q(e,a)},re.resetStatus=e=>{g(e)},e&&((e,t)=>{if(t)if(t.length)for(let a,s=0;a=t[s];s+=1)r(e,a);else r(e,t)})(re,window.lazyLoadOptions);export{re as default};