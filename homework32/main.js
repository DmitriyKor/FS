const
    API_URL = 'http://www.omdbapi.com';
    API_KEY = 'fda20e87';
    RESULTS_PER_PAGE = 10;
  
<<<<<<< HEAD
function getURL(title) {
    return `${API_URL}/?s=${title}&apikey=${API_KEY}`;
=======
function prepareURL(search_str, page){
    return encodeURI(`${API_URL}/?s=${search_str}&page=${page}&apikey=${API_KEY}`);
>>>>>>> f57cee5c103af84a88e5078ec6bb3892f89b71fc
}

async function searchData(search_str, page) {
  indicator.className='indicator indicator_visible';
  movies.textContent = '';  
  try {
      const url = prepareURL(search_str, page);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      totalSearchResults=0;
      dataAvailable = json["Response"].toLowerCase() == "true"; 
      if (dataAvailable) {  
        totalSearchResults = json.totalResults;    
        
        for (film of json["Search"]) {
          //const response = await fetch(film.Poster, { method: 'HEAD' });
          //if (response.ok) {         
            addMovie(film.Title, film.Year, film.Poster);
          //}
        }
      }
      
    } catch (error) {
      console.log(error.message);
    } finally {
      indicator.className='indicator';
      updatePagesInfo();
    }

  }

function addMovie (name, year, image_url) {
  const movie_item = document.createElement('div');
  movie_item.className = 'movie-item';

  const img = document.createElement('img');
  img.setAttribute('src', image_url);
  img.setAttribute('alt', name);
  movie_item.append(img);

  const p = document.createElement('p');
  p.innerText = name;
  movie_item.append(p);

  const span = document.createElement('span');
  span.innerText = year;
  movie_item.append(span);

  movies.append(movie_item);
}

function handleSearchInput(e){
  currentPage = 1;  
  searchData(search.value , currentPage);
}

function updatePagesInfo(){
  console.log(`totalSearchResults: ${totalSearchResults}, currentPage: ${currentPage}`);
  if (totalSearchResults>0) {
    pages.className='pages pages_visible';
    pages_info.innerText=`${(currentPage-1)*RESULTS_PER_PAGE+1}..${Math.min(currentPage*RESULTS_PER_PAGE, totalSearchResults)} of ${totalSearchResults}`;
    if (currentPage==1) {
      pages_left.className='material-symbols-outlined page_arrow page_arrow_disabled';
      console.log('arrow disabled');
    } else {
      pages_left.className='material-symbols-outlined page_arrow';
    }
    if (currentPage*RESULTS_PER_PAGE >= totalSearchResults) {
      pages_right.className='material-symbols-outlined page_arrow page_arrow_disabled'
    } else {
      pages_right.className='material-symbols-outlined page_arrow';
    }
  } else {
    pages.className='pages';
  }
}

function handlePageClick(e) {
  if (e.target.id=="pages_left") {
    if (currentPage>1) {
      currentPage--;
      searchData(search.value , currentPage);
    }
  } else {
    if (currentPage * RESULTS_PER_PAGE < totalSearchResults) {
      currentPage++;
      searchData(search.value , currentPage);
    }
  }
}

document.getElementById('search')?.addEventListener("input", handleSearchInput);    

let movies = document.querySelector(".movies");
let indicator = document.querySelector(".indicator");
let pages = document.getElementById('pages');
let pages_info = document.getElementById('pages_info');
let pages_left = document.getElementById('pages_left');
pages_left.addEventListener("click", handlePageClick);
let pages_right = document.getElementById('pages_right');
pages_right.addEventListener("click", handlePageClick);
let currentPage = 1;
let totalSearchResults = 0;
