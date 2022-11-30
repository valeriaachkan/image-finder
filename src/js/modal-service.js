export default class ModalService {
    constructor({targetImg, nextImg, prevImg}) {
        this.currentImage = targetImg;
        this.currentImageUrl = '';
        this.currentImageId = 0;
        this.currentImageAlt = '';
        this.modal = document.querySelector('div.lightbox');
        this.image = document.querySelector('img.lightbox__image');
        this.previousImage = prevImg;
        this.nextImage = nextImg;
    }

    getImageInfo() {
        this.currentImageUrl = this.currentImage.srcset.split(',')[1].trim().split(' ')[0];
        this.currentImageId = this.currentImage.id;
        this.currentImageAlt = this.currentImage.alt;
    }

    setImage() {
        this.image.src = this.currentImageUrl;
        this.image.id = this.currentImageId;
        this.image.alt = this.currentImageAlt;
    }

    openModal() { 
        this.modal.classList.add('is-open');
        this.getImageInfo();
        this.setImage();
    }

    setTargetImg(newImg) {
        this.currentImage = newImg;
    }

    swipeRight() {
        this.setTargetImg(this.nextImage);
        this.getImageInfo();
        this.setImage();
    }

    swipeLeft() {
        this.setTargetImg(this.previousImage);
        this.getImageInfo();
        this.setImage();
    }
}