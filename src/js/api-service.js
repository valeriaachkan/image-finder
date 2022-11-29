import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31523966-920ed1e34472d12ea8090a22f';
const searchParams = new URLSearchParams({
	key: API_KEY,
	image_type: 'photo',
	orientation: 'horizontal',
	safesearch: true,
    per_page: 33,
});

export default class ImagesApiService {
	constructor() {
		this.searchQuery = '';
        this.page = 1;
        this.lastPage = 1;
	}

	async fetchImages() {
		const url = `${BASE_URL}?q=${this.searchQuery}&${searchParams}&page=${this.page}`;
        const response = await axios.get(url);
        const data = response.data;
        this.lastPage = Math.ceil(data.totalHits / searchParams.get('per_page'));

        this.incrementPage();
        
		return data;
	}

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        return this.searchQuery = newQuery;
    }
}