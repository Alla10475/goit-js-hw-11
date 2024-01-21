import{i,S as c}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))a(o);new MutationObserver(o=>{for(const t of o)if(t.type==="childList")for(const l of t.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&a(l)}).observe(document,{childList:!0,subtree:!0});function e(o){const t={};return o.integrity&&(t.integrity=o.integrity),o.referrerpolicy&&(t.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?t.credentials="include":o.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function a(o){if(o.ep)return;o.ep=!0;const t=e(o);fetch(o.href,t)}})();const u="https://pixabay.com/api",p="41870399-9b44301246ceb98c07efd626a",s={searchForm:document.querySelector(".search-form"),photoListEl:document.querySelector(".photo-list"),loader:document.querySelector(".loader")};s.loader.style.display="none";function d(r){if(!r.ok)throw new Error(r.statusText);return r.json()}s.searchForm.addEventListener("submit",m);function m(r){r.preventDefault(),s.loader.style.display="inline-block";const n=r.currentTarget,e=n.elements.query.value;if(s.photoListEl.innerHTML="",!e){i.show({message:"Please enter your request",position:"topRight",color:"yellow"}),s.loader.style.display="none";return}f(e).then(y).catch(a=>console.log(a)).finally(()=>n.reset())}function f(r){const n=new URLSearchParams({key:p,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0}),e=`${u}/?${n}`;return fetch(e).then(d)}function y({hits:r}){if(s.loader.style.display="none",r.length===0){i.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"red"});return}const n=r.map(e=>`<li class="gallery-item">
  <a class="gallery-link" href="${e.largeImageURL}">
    <img
      class="gallery-image"
      src="${e.webformatURL}"
      data-source="${e.imoriginal}"
      alt="${e.tags}"
    />
  </a><div class="gallery-descr">
   <p>Likes: <br><span>${e.likes}</span></p>
   <p>Views: <br><span>${e.views}</span></p>
   <p>Comment: <br><span>${e.comments}</span></p>
   <p>Downloads: <br><span>${e.downloads}</span></p></div>
</li>`).join("");s.photoListEl.innerHTML=n,h.refresh()}const h=new c(".photo-container a",{captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map
