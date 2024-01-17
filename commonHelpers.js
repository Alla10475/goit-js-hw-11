import{i as c}from"./assets/vendor-4d6948b9.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function r(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=r(e);fetch(e.href,o)}})();const l="https://pixabay.com/api",u="41870399-9b44301246ceb98c07efd626a",i={searchForm:document.querySelector(".search-form"),photoListEl:document.querySelector(".photo-list")};i.searchForm.addEventListener("submit",m);function m(n){n.preventDefault();const t=n.currentTarget,r=t.elements.query.value;f(r).then(d).catch(p).finally(()=>t.reset())}function f(n){const t=new URLSearchParams({key:u,q:n,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:9}),r=`${l}/?${t}`;return fetch(r).then(s=>{if(!s.ok)throw new Error(s.statusText);return s.json()})}function p(n){console.error(n),c.show({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!",position:"topCenter",color:"red"})}function d({hits:n}){const t=n.map(r=>`<li class="gallery-item">
  <a class="gallery-link" href="${r.largeImageURL}">
    <img
      class="gallery-image"
      src="${r.webformatURL}"
      data-source="${r.imoriginal}"
      alt="${r.tags}"
    />
  </a>
   <p>Likes: ${r.likes}</p>
   <p>Views: ${r.views}</p>
   <p>Comment: ${r.comments}</p>
   <p>Downloads: ${r.downloads}</p>
</li>`).join("");i.photoListEl.innerHTML=t}
//# sourceMappingURL=commonHelpers.js.map
