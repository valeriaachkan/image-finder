import './sass/style.scss';
import ImagesApiService from "./api-service";
import cardsTpl from './template/gallery-cards.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const imagesApiService = new ImagesApiService();
const refs = {
	searchForm: document.querySelector('form#search-form'),
    gallery: document.querySelector('div.gallery'),
    loadBtn: document.querySelector('button.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onImageClick)

function onSearch(e) {
    e.preventDefault();
    
    const searchQuery = queryTrasform(e.currentTarget.elements.searchQuery.value);

    imagesApiService.query = searchQuery;
    hideLoadBtn();
    clearGallery();
    imagesApiService.resetPage();
    onFetchImages();
}

async function onFetchImages() {
	try {
		const res = await imagesApiService.fetchImages();
		const images = res.hits;
		// console.log(images);

        if (images.length === 0) {
            return  onFetchError();
          } 

        appendCardsMarkup(images);
        Notify.success(`Hooray! We found ${res.totalHits} images.`, {
            timeout: 1500,
            showOnlyTheLastOne: true,
        });
	} catch (error) {
		console.log(error.message);
	}
}

function onFetchError() {
    clearGallery();
    Notify.failure('Sorry, there are no images matching your search query. Please try again.', {
        timeout: 1500,
        showOnlyTheLastOne: true,
    });
}

function appendCardsMarkup(data) {
    refs.gallery.classList.remove('visually-hidden');
	refs.gallery.insertAdjacentHTML('beforeend', cardsTpl(data));
    showLoadBtn();
}

function clearGallery() {
    refs.gallery.innerHTML = '';
}

function queryTrasform (query) {
    if (query === '') {
        return;
    }

    const trasformedQuery = query.trim().toLowerCase().split(' ').join('+');
    return trasformedQuery;
}
 
function showLoadBtn() {
    refs.loadBtn.classList.remove('visually-hidden');
}
function hideLoadBtn() {
    refs.loadBtn.classList.add('visually-hidden');
}

async function onLoadMore() {
    try {
		const res = await imagesApiService.fetchImages();
		const images = res.hits;

        if (res.total)

        appendCardsMarkup(images);
    } catch (error) {
        console.log(error.message);
    }
}


function onImageClick(e) {
    const targetEl = e.target;
    console.log(targetEl);
}