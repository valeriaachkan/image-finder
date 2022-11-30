import getRefs from './get-refs';

const refs = getRefs();

function bodyClassAdd() {
	refs.body.classList.add('modal-open');
}

function bodyClassRemove() {
	refs.body.classList.remove('modal-open');
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

function onSwipeRight(modal) {
	try {
		modal.swipeRight();
	} catch (error) {
		console.log(error.message);
	}
}

function onSwipeLeft(modal) {
	try {
		modal.swipeLeft();
	} catch (error) {
		console.log(error.message);
	}
}

function lightboxClassRemove() {
	refs.lightbox.classList.remove('is-open');
}

function resetLightboxImg() {
	refs.lightboxImage.src = '';
}

export {
	findImgById,
	findNextImg,
	findPrevImg,
	onSwipeLeft,
	onSwipeRight,
	lightboxClassRemove,
	resetLightboxImg,
	bodyClassAdd,
	bodyClassRemove
};
