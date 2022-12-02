import './sass/style.scss';
import getRefs from './js/get-refs';
import ImagesApiService from './js/api-service';
import ModalService from './js/modal-service';
import { appendCardsMarkup, clearGallery } from './js/render-gallery';
import { findImgById, findNextImg, findPrevImg, onSwipeLeft, onSwipeRight, lightboxClassRemove, resetLightboxImg, bodyClassAdd, bodyClassRemove } from './js/on-lightbox-actions'
import { onFetchError, queryTrasform } from './js/search-and-fetch';
import { Notify } from 'notiflix/build/notiflix-notify-aio';


Notify.init({
	width: '380px',
	distance: '20px',
	borderRadius: '12px',
	timeout: 1500,
	showOnlyTheLastOne: true,
	fontSize: '18px',
});

const imagesApiService = new ImagesApiService();
const refs = getRefs();

refs.searchForm.addEventListener('submit', onSearch);
// refs.loadBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onImageClick);
document.addEventListener('keydown', imageSwipe);
refs.closeBtn.addEventListener('click', onBtnCloseModalClick);
refs.lightbox.addEventListener('click', onLightboxClickCloseModal);
document.addEventListener('keydown', onEscapeKeydown);

function onSearch(e) {
	e.preventDefault();
	const searchQuery = queryTrasform(e.currentTarget.elements.searchQuery.value);

	imagesApiService.query = searchQuery;
	clearGallery();
	imagesApiService.resetPage();
	fetchImages();
}

async function fetchImages() {
	try {
		const res = await imagesApiService.fetchImages();
		const images = res.hits;

		if (images.length === 0) {
			return onFetchError();
		}

		if (imagesApiService.page - 1 === 1) {
			Notify.success(`Hooray! We found ${res.totalHits} images.`);
		}

		appendCardsMarkup(images);
	} catch (error) {
		console.log(error.message);
	}
}

function onImageClick(e) {
    if(!e.target.classList.contains('card')) {
        return;
    }

	const targetCardImg = e.target;
    const targetImg = targetCardImg.querySelector('img.card-image');
	const modal = new ModalService({ targetImg });
	modal.openModal();
    bodyClassAdd();
}

function imageSwipe(e) {
	if (!refs.lightbox.classList.contains('is-open')) {
		return;
	}

	const keyPressedCode = e.code;
	const targetImg = findImgById();
	let prevImg = '';
	let nextImg = '';
	prevImg = findPrevImg(targetImg);
	nextImg = findNextImg(targetImg);

	const modal = new ModalService({ targetImg, nextImg, prevImg });

	if (keyPressedCode === 'ArrowLeft') {
		if (prevImg === ''|| prevImg === undefined) {
			return;
		}
		onSwipeLeft(modal);
	}

	if (keyPressedCode === 'ArrowRight') {
		if (nextImg === ''|| nextImg === undefined) {
			return;
		}
		onSwipeRight(modal);
	}
}

function onBtnCloseModalClick() {
	lightboxClassRemove();
    bodyClassRemove();
	resetLightboxImg();
}

function onLightboxClickCloseModal(e) {
	const targetEl = e.target;

	if (!targetEl.classList.contains('lightbox__overlay')) {
		return;
	}

	lightboxClassRemove();
    bodyClassRemove();
	resetLightboxImg();
}

function onEscapeKeydown(e) {
	if (e.code !== 'Escape') {
		return;
	}

	lightboxClassRemove();
    bodyClassRemove();
	resetLightboxImg();
}

const options = {
	rootMargin: '400px',
};
const callback = (entries) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting && imagesApiService.query) {
			fetchImages();
		}
	});
};
const observer = new IntersectionObserver(callback, options);

observer.observe(refs.sentinel);