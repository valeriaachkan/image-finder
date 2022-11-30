import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { clearGallery } from './render-gallery';

Notify.init({
	width: '380px',
	distance: '20px',
	borderRadius: '12px',
	timeout: 1500,
	showOnlyTheLastOne: true,
	fontSize: '18px',
});

function onFetchError() {
    clearGallery();
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
}

function queryTrasform (query) {
    if (query === '') {
        return;
    }

    const trasformedQuery = query.trim().toLowerCase().split(' ').join('+');
    return trasformedQuery;
}

export { onFetchError, queryTrasform };