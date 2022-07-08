import axios from 'axios';
import Notiflix from 'notiflix';
import ApiService from './fetchPictures';

const searchForm = document.querySelector('#search-form');
const loadMoreBtn = document.querySelector('.load-more');
const galleryContainer = document.querySelector('.gallery')

const apiService = new ApiService();

searchForm.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearch(evt) {
  evt.preventDefault();
  apiService.query = evt.currentTarget.elements.searchQuery.value;
  clearGalleryContainer();
  if (apiService.query === '') {
    return Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.')
  }
  apiService.resetPage();
  loadMoreBtn.classList.remove('is-visible');
  try {
    const { hits } = await apiService.fetchPictures()
      buildMarkupGallery(hits)
  
      loadMoreBtn.classList.add('is-visible');
  
  } catch (error) {
    console.log(error)
  }
}

async function onLoadMore() {
  try {
    const { hits } = await apiService.fetchPictures()
    buildMarkupGallery(hits);
    const {totalHits} = await apiService.fetchPictures()
    const totalPages = Math.floor(totalHits / 40)
    if (apiService.page > totalPages) {
      loadMoreBtn.classList.remove('is-visible')
      Notiflix.Notify.info("We're sorry, but you've reached the end of search results.")
    }
  } catch (error) {
    console.log(error)
  }
}

function buildMarkupGallery(hits) {
  const markup = hits.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
    return `<div class="photo-card">
  <img class="gallery__img" src="${webformatURL}" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Views: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads: ${downloads}</b>
    </p>
  </div>
</div>`
  }).join('')
    galleryContainer.insertAdjacentHTML('beforeend', markup)
}

galleryContainer.classList.add('.gallery');

function clearGalleryContainer() {
    galleryContainer.innerHTML = '';
}



