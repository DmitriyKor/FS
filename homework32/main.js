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

  async function handleSearchInput(e){
    const json = await searchData(search.value , 1);
    console.log(json);
    result_p.innerText = JSON.stringify(json);
    dataAvailable = json["Response"].toLowerCase() == "true"; 
    console.log(dataAvailable);
    if (dataAvailable) {
      console.log('OK');  
    }
  }

  document.getElementById('search')?.addEventListener("input", handleSearchInput);    
  result_p = document.getElementById('result');

  // function handleSearchInput(e) { 
  //   console.log('change event'); 
  //   searchData(search.value, 1).then(json => { 
  //     console.log(json); result_p.innerText = JSON.stringify(json); // Або виведіть json.whatever }); 
  //     })
  // }


