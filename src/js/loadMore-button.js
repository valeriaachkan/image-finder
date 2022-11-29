import getRefs from "./get-refs";

const refs = getRefs();

// async function onLoadMore() {
//     try {
// 		const res = await ImagesApiService.fetchImages();
//         const images = res.hits;

//         if((imagesApiService.page - 1) === imagesApiService.lastPage) {
//             appendCardsMarkup(images);
//             hideLoadBtn();
//             Notify.info("We're sorry, but you've reached the end of search results.");
//             return;
//         }
//         appendCardsMarkup(images);
//     } catch (error) {
//         console.log(error.message);
//     }
// }

function showLoadBtn() {
    refs.loadBtn.classList.remove('visually-hidden');
}
function hideLoadBtn() {
    refs.loadBtn.classList.add('visually-hidden');
}


export { showLoadBtn, hideLoadBtn };