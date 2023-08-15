const API_KEY = 'INI4DL5JmnAUr-AkHb9aXF0TXLc';
const API_URL = 'https://ci-jshint.herokuapp.com/api';
const resultsModal = new bootstrap.Modal(document.getElementById('resultsModal'));

// event for GET request with the getStatus function
document.getElementById('status').addEventListener('click', e => getStatus(e)); 
// event for POST request with postForm function
document.getElementById("submit").addEventListener("click", e => postForm(e));

// GET request
// 1. Make a Get request to the API URL with the API key
// 2. Pass the dat to a display function
async function getStatus(e) {
    const queryString = `${API_URL}?api_key=${API_KEY}`;

    const response = await fetch(queryString);
    
    const data = await response.json();

    if (response.ok){
        displayStatus(data);
    } else{
        throw new Error(data.error);
    }
        

}

// Displays the expiry key date
function displayStatus(data){
    let heading = 'API Key Status';
    let content = '<div>Your key is valid until </div>';
    content += `<div class="key-status"> ${data.expiry} </div>`;

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = content;

    resultsModal.show();
}

// POST request
// 1. Make a POST request to the API URL with the API key
// 2. Pass the dat to a display function

async function postForm(e){
    
    const form = new FormData(document.getElementById("checksform"));
    console.log(form)

    for (let entry of form.entries){
        console.log(entry);
    }

    // const response = fetch("https://ci-jshint.herokuapp.com/api", {
    //                     method: "POST",
    //                     headers: {
    //                                 "Authorization": API_KEY,
    //                              }
    //                     })
}