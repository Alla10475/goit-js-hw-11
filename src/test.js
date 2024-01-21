import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const BAZE_URL = 'https://pixabay.com/api';
const API_KEY = '41870399-9b44301246ceb98c07efd626a';

const refs = {
  searchForm: document.querySelector('.search-form'),
  photoListEl: document.querySelector('.photo-list'),
  loader: document.querySelector('.loader'),
};

refs.loader.style.display = 'none';

function checkResponse(res) {
  if (!res.ok) {
    throw new Error(res.statusText);
  }
  return res.json();
}

refs.searchForm.addEventListener('submit', handleSearch);

function handleSearch(event) {
  event.preventDefault();

  refs.loader.style.display = 'inline-block';

  const form = event.currentTarget;
  const query = form.elements.query.value;
  refs.photoListEl.innerHTML = '';

  if (!query) {
    iziToast.show({
      message: 'Please enter your request',
      position: 'topRight',
      color: 'yellow',
    });
    return;
  }

  searchPhoto(query)
    .then(markupPhoto)
    .catch(err => console.log(err))
    .finally(() => form.reset());
}

function searchPhoto(value) {
  const urlParams = new URLSearchParams({
    key: API_KEY,
    q: value,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  const url = `${BAZE_URL}/?${urlParams}`;

  return fetch(url).then(checkResponse);
}

function markupPhoto({ hits }) {
  refs.loader.style.display = 'none';

  if (hits.length === 0) {
    iziToast.show({
      title: 'Error',
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'topCenter',
      color: 'red',
    });
    return;
  }

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
  </a><div class="gallery-descr">
   <p>Likes: <br><span>${hits.likes}</span></p>
   <p>Views: <br><span>${hits.views}</span></p>
   <p>Comment: <br><span>${hits.comments}</span></p>
   <p>Downloads: <br><span>${hits.downloads}</span></p></div>
</li>`
    )
    .join('');

  refs.photoListEl.innerHTML = markup;
  modalLightboxGallery.refresh();
}

const modalLightboxGallery = new SimpleLightbox('.photo-container a', {
  captionsData: 'alt',
  captionDelay: 250,
});
