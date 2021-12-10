import Notiflix from 'notiflix';
import LoadMoreBtn from  './loadMoreBtn'
const KEY = '24739758-4c739ca612149bb371b205192';
const BASE_URL = 'https://pixabay.com/api';
const loadMoreBtn = new LoadMoreBtn({
    selector: '[data-action="load-more"]',
    hidden: true,
  });

export default class FetchImages {
    constructor(){
        this.query = '';
        this.page = 1; 
        this.totalHits = '';
    }

    getImages(){
        
        return fetch(`${BASE_URL}/?key=${KEY}&q=${this.query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
        .then(response => response.json())
        .then((data) => {
        if(data.hits.length === 0){
            loadMoreBtn.hide();
            Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
        } else{
            this.incrementPage()
            
            if (this.page * 40 >= data.totalHits) {
                this.isEndOfImg()
            }
            return data;
        }
      });
    }


    incrementPage(){
        this.page +=1
    }

    resetPage() {
        this.page =1;
    }

    isEndOfImg(){
        loadMoreBtn.hide();
        Notiflix.Notify.success("We're sorry, but you've reached the end of search results.");
    }

    showTotalHits(hits){
        Notiflix.Notify.success(`Hooray! We found ${hits} images.`);
    }

    get searchName() {
        return this.query;
    }
    
    set searchName(newQuery) {
        this.query = newQuery;
    }

    get hits() {
        return this.totalHits;
    }
    
    set hits(newTotalHits) {
        this.totalHits = newTotalHits;
    }
}
