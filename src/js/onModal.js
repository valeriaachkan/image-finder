import getRefs from "./get-refs";
import ImagesApiService from "./api-service";

const refs = getRefs();

refs.lightbox.document.addEventListener('keydown', imageSwipe);

function imageSwipe(e) {
    console.log(e);

}