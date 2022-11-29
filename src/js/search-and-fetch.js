// import { hideLoadBtn } from './loadMore-button';
// import ImagesApiService from './api-service';
import { clearGallery } from './renderGallery';

// const imagesApiService = new ImagesApiService();

// function onSearch(e) {
//     e.preventDefault();
    
//     const searchQuery = queryTrasform(e.currentTarget.elements.searchQuery.value);

//     imagesApiService.query = searchQuery;
//     hideLoadBtn();
//     clearGallery();
//     imagesApiService.resetPage();
//     onFetchImages();
// }

// async function onFetchImages() {
// 	try {
// 		const res = await imagesApiService.fetchImages();
// 		const images = res.hits;
// 		console.log(res);

//         if (images.length === 0) {
//             return  onFetchError();
//           } 

//         appendCardsMarkup(images);
//         Notify.success(`Hooray! We found ${res.totalHits} images.`);
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// }

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