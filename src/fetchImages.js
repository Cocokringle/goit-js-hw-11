const KEY = '24739758-4c739ca612149bb371b205192';
const BASE_URL = 'https://pixabay.com/api';

export default class FetchImages {
    constructor(){
        this.query = '';
    }

    // async getImages() {
    //     const getImg = await fetch(`${BASE_URL}/?key=${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true`);
    //     const imgForGallery = await getImg.json();
    //     return imgForGallery;
    // }
    getImages(){
        return fetch(`${BASE_URL}/?key=${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true`)
        .then(response => response.json())
        .then((data) => {
        
        return data;
      });
    }

    get searchName() {
        return this.query;
    }
    
    set searchName(newQuery) {
        this.query = newQuery;
    }
}