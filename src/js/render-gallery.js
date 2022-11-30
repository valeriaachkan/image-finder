import cardsTpl from '../template/gallery-cards.hbs';
import getRefs from "./get-refs";

const refs = getRefs();

function appendCardsMarkup(data) {
    showGallery();
	refs.gallery.insertAdjacentHTML('beforeend', cardsTpl(data));
}

function clearGallery() {
    hideGallery();
    refs.gallery.innerHTML = '';
}

function showGallery() {
    refs.gallery.classList.remove('visually-hidden');
}

function hideGallery() {
    refs.gallery.classList.add('visually-hidden');
}

export { appendCardsMarkup, clearGallery, showGallery, hideGallery };