export default function getRefs() {
	return {
		searchForm: document.querySelector('form#search-form'),
		gallery: document.querySelector('div.gallery'),
		loadBtn: document.querySelector('button.load-more'),
        lightbox: document.querySelector('div.lightbox'),
        lightboxImage: document.querySelector('img.lightbox__image'),
		closeBtn: document.querySelector('[data-action="close-lightbox"]'),
	};
}
