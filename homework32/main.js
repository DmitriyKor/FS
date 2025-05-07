const
    API_URL = 'http://www.omdbapi.com';
    API_KEY = 'fda20e87';
  
function prepareURL(search_str, page){
    return encodeURI(`${API_URL}/?s=${search_str}&page=${page}&apikey=${API_KEY}`);
}

async function searchData(search_str, page) {
    try {
      const url = prepareURL(search_str, page);
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.log(error.message);
    }
  }

function addMovie (name, year, image_url) {
  if (image_url?.length) {
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
}
  
async function handleSearchInput(e){
    indicator.className='indicator indicator_visible';
    movies.textContent = '';
    const json = await searchData(search.value , 1);
    result_p.innerText = JSON.stringify(json);
    dataAvailable = json["Response"].toLowerCase() == "true"; 
    if (dataAvailable) {      

      for (film of json["Search"]) {
        addMovie(film.Title, film.Year, film.Poster);
      }
    }
    indicator.className='indicator';
}

document.getElementById('search')?.addEventListener("input", handleSearchInput);    
result_p = document.getElementById('result');

movies = document.querySelector(".movies");
indicator = document.querySelector(".indicator");

  // function handleSearchInput(e) { 
  //   console.log('change event'); 
  //   searchData(search.value, 1).then(json => { 
  //     console.log(json); result_p.innerText = JSON.stringify(json); // Або виведіть json.whatever }); 
  //     })
  // }


