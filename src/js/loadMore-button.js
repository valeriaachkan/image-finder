// import getRefs from "./get-refs";

// const refs = getRefs();

// async function onLoadMore() {
// 	try {
// 		const res = await imagesApiService.fetchImages();
// 		const images = res.hits;

// 		if (imagesApiService.page - 1 === imagesApiService.lastPage) {
// 			appendCardsMarkup(images);
//             smoothScroll();
// 			hideLoadBtn();
// 			Notify.info("We're sorry, but you've reached the end of search results.");
// 			return;
// 		}
// 		appendCardsMarkup(images);
//         smoothScroll();
// 	} catch (error) {
// 		console.log(error.message);
// 	}
// }

// function showLoadBtn() {
//     refs.loadBtn.classList.remove('visually-hidden');
// }
// function hideLoadBtn() {
//     refs.loadBtn.classList.add('visually-hidden');
// }

// function smoothScroll() {
// 	const { height: cardHeight } = document
// 		.querySelector('.gallery')
// 		.firstElementChild.getBoundingClientRect();

// 	window.scrollBy({
// 		top: cardHeight * 2,
// 		behavior: 'smooth',
// 	});
// }

// export { showLoadBtn, hideLoadBtn, smoothScroll };