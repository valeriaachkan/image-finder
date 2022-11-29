import './sass/style.scss';
import getRefs from './js/get-refs';
import ImagesApiService from "./js/api-service";
import ModalService from './js/modal-service';
import { showLoadBtn, hideLoadBtn } from './js/loadMore-button';
import { appendCardsMarkup, clearGallery, showGallery, hideGallery } from './js/renderGallery';
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
// console.log(refs.closeBtn);

refs.searchForm.addEventListener('submit', onSearch);
refs.loadBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onImageClick);
document.addEventListener('keydown', imageSwipe);
// refs.closeBtn.addEventListener('click', onBtnCloseModalClick);
// refs.lightbox.addEventListener('click', onLightboxClickCloseModal);
// document.addEventListener('keydown', onEscapeKeydown);

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
		console.log(res);

        if (images.length === 0) {
            return  onFetchError();
          } 

        appendCardsMarkup(images);
        Notify.success(`Hooray! We found ${res.totalHits} images.`);
	} catch (error) {
		console.log(error.message);
	}
}

async function onLoadMore() {
    try {
		const res = await imagesApiService.fetchImages();
        const images = res.hits;

        if((imagesApiService.page - 1) === imagesApiService.lastPage) {
            appendCardsMarkup(images);
            hideLoadBtn();
            Notify.info("We're sorry, but you've reached the end of search results.");
            return;
        }
        appendCardsMarkup(images);
    } catch (error) {
        console.log(error.message);
    }
}

function onImageClick(e) {
    const currentImg = e.target;
    const modal = new ModalService({currentImg});
    modal.openModal();
}

function imageSwipe(e) {
	if (!refs.lightbox.classList.contains('is-open')) {
		return;
	}

    const keyPressedCode = e.code;
    const currentImg = findImgById();
    let prevImg = '';
    let nextImg = '';
    prevImg = findPrevImg(currentImg);
    nextImg = findNextImg(currentImg);
    
    const modal = new ModalService({currentImg, nextImg, prevImg});

	if (keyPressedCode === 'ArrowLeft') {
        if(prevImg === '') {
            return;
        }
        onSwipeLeft(modal);
	}

	if (keyPressedCode === 'ArrowRight') {
        if(nextImg === '') {
            return;
        }
        onSwipeRight(modal);
	}
}

function onSwipeRight(modal) {
    try {
        modal.swipeRight();
    } catch(error) {
        console.log(error.message);
    }
}

function onSwipeLeft(modal) {
    try {
        modal.swipeLeft();
    } catch(error) {
        console.log(error.message);
    }
}

function findImgById() {
    const modalImgId = refs.lightboxImage.id;
    const currentImg = document.getElementById(`${modalImgId}`);

    return currentImg;
}

function findPrevImg(currentImg) {
    try {
        const prevParent = currentImg.parentNode.parentNode.previousElementSibling;
        const prevImg = prevParent.querySelector('img.card-image');
        return prevImg;
    } catch (error) {
        console.log(error.message);
        return;  
    }
}

function findNextImg(currentImg) {
    try {
        const nextParent = currentImg.parentNode.parentNode.nextElementSibling;
        const nextImg = nextParent.querySelector('img.card-image');
        return nextImg;
    } catch (error) {
        console.log(error.message);
        return;
    }
}

// function onBtnCloseModalClick() {
//     const modal = new ModalService();
//     ModalService.closeModal();

// }