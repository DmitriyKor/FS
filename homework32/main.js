const
    API_URL = 'http://www.omdbapi.com';
    API_KEY = 'fda20e87';
  
function getURL(title) {
    return `${API_URL}/?s=${title}&apikey=${API_KEY}`;
}

async function getData(title) {
    try {
      const url = getURL(title);
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

  getData('pulp');