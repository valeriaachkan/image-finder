export default class ModalService {
    constructor({currentImg, nextImg, prevImg}) {
        this.targetImage = currentImg;
        this.targetImageUrl = '';
        this.targetImageId = 0;
        this.targetImageAlt = '';
        this.modal = document.querySelector('div.lightbox');
        this.image = document.querySelector('img.lightbox__image');
        this.previousImage = prevImg;
        this.nextImage = nextImg;
        // this.setPrevNextImg();



    }

    getImageInfo() {
        this.targetImageUrl = this.targetImage.srcset.split(',')[1].trim().split(' ')[0];
        this.targetImageId = this.targetImage.id;
        this.targetImageAlt = this.targetImage.alt;
        // this.previousImage = this.targetImage.previousSibling;
        // this.nextImage = this.targetImage.nextSibling;
    }

    setImage() {
        this.image.src = this.targetImageUrl;
        this.image.id = this.targetImageId;
        this.image.alt = this.targetImageAlt;
    }

    openModal() { 
        this.modal.classList.add('is-open');
        this.getImageInfo();
        this.setImage();
    }

    closeModal() {
        this.modal.classList.remove('is-open');
    }

    setTargetImg(newImg) {
        this.targetImage = newImg;
    }
    // setPrevNextImg() {
    //     const prevParentNode = this.targetImage.parentNode.parentNode.previousElementSibling;
    //     const nextParentNode = this.targetImage.parentNode.parentNode.nextElementSibling;
    //     this.nextImage = nextParentNode.querySelector('img.card-image');
    //     this.previousImage = prevParentNode.querySelector('img.card-image');
    // }

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