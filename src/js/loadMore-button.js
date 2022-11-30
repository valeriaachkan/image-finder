import getRefs from "./get-refs";

const refs = getRefs();

function showLoadBtn() {
    refs.loadBtn.classList.remove('visually-hidden');
}
function hideLoadBtn() {
    refs.loadBtn.classList.add('visually-hidden');
}

function smoothScroll() {
	const { height: cardHeight } = document
		.querySelector('.gallery')
		.firstElementChild.getBoundingClientRect();

	window.scrollBy({
		top: cardHeight * 2,
		behavior: 'smooth',
	});
}

export { showLoadBtn, hideLoadBtn, smoothScroll };