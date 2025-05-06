const
    API_URL = 'http://www.omdbapi.com';
    API_KEY = 'fda20e87';
  
function prepareURL(search_str, page){
    return `${API_URL}/?s=${search_str}&page=${page}&apikey=${API_KEY}`;
}

async function getData(search_str, page) {
    try {
      const url = prepareURL(search_str, page);
      console.log(url);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
      const json = await response.json();
      console.log('getData:');
      console.log(json);
    } catch (error) {
      console.log(error.message);
    }
  }

  getData('a', 2);