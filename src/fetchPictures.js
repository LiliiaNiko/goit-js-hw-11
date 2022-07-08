import axios from 'axios';
export default class ApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }
    fetchPictures() {
       return axios.get(`https://pixabay.com/api/?key=28476607-8e552fca251350b3d35959c9a&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`)
            .then(response => response.data)
            .then(data => {
                console.log(data)
                this.page += 1;
                return {
                    hits: data.hits,
                    totalHits: data.totalHits   
                }     
            })    
    }
  
    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    set query(newQuery) {
        this.searchQuery = newQuery;
    }
}