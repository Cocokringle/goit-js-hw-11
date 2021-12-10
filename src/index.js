import './css/styles.css';
import FetchImages from './fetchImages';
const refs = {
    input: document.querySelector('[name="searchQuery"]'),
    searchForm: document.querySelector('.search-form'),
    imgBox: document.querySelector('.gallery'),
}
const fetchImages = new FetchImages();
// let query = '';

refs.searchForm.addEventListener('submit', onSearch)

function onSearch(e){
   
    e.preventDefault()
    fetchImages.searchName = e.currentTarget.elements.searchQuery.value.trim();
    refs.imgBox.innerHTML = '';
   
    if (fetchImages.searchName !== ""){
        console.log(fetchImages.searchName)
        fetchImages.getImages(fetchImages.searchName).then(data => {
            addGallery(data)
        })     
    }
}

async function addGallery(data){
    try{
        console.log('data inside:', data )
        const markup = await data.map((item) => {
            return `<div class="photo-card">
            <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>${item.likes}</b>
              </p>
              <p class="info-item">
                <b>${item.views}</b>
              </p>
              <p class="info-item">
                <b>${item.comments}</b>
              </p>
              <p class="info-item">
                <b>${item.downloads}</b>
              </p>
            </div>
          </div>`
        });
        console.log(markup)
        const gallery = await refs.imgBox.insertAdjacentHTML("beforeend", markup);
        return gallery;
    }
    catch (error){
        console.log(error)
    }
     
}




