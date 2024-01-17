import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BAZE_URL = 'https://pixabay.com/api';
const API_KEY = '41870399-9b44301246ceb98c07efd626a';

const refs = {
  searchForm: document.querySelector('.search-form'),
  photoListEl: document.querySelector('.photo-list'),
};

// const searchForm = document.querySelector('.search-form');
// const ulEl = document.querySelector('.photo-list');
refs.searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const query = form.elements.query.value;

  searchPhoto(query)
    .then(markupPhoto)
    .catch(onFetchError)
    .finally(() => form.reset());
}

function searchPhoto(value) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 9,
  });
  
    
  const url = `${BAZE_URL}/?${urlParams}`;
  return fetch(url).then(resp => {
    if (!resp.ok) {
      throw new Error(resp.statusText);
    }

    return resp.json();
  });
}

function onFetchError(error) {
  console.error(error);
  iziToast.show({
    title: 'Error',
    message:
      'Sorry, there are no images matching your search query. Please try again!',
    position: 'topCenter',
    color: 'red',
  });
}

function markupPhoto({ hits }) {
  const markup = hits
    .map(
      hits => `<li class="gallery-item">
  <a class="gallery-link" href="${hits.largeImageURL}">
    <img
      class="gallery-image"
      src="${hits.webformatURL}"
      data-source="${hits.imoriginal}"
      alt="${hits.tags}"
    />
  </a>
   <p>Likes: ${hits.likes}</p>
   <p>Views: ${hits.views}</p>
   <p>Comment: ${hits.comments}</p>
   <p>Downloads: ${hits.downloads}</p>
</li>`
    )
    .join('');

  refs.photoListEl.innerHTML = markup;
}