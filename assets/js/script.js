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
        displayException(data);
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

    const form = processOptions(new FormData(document.getElementById("checksform")));
    console.log(form)

    // Testing the form object
    // for (let entry of form.entries()){
    //     console.log(entry);
    // }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {"Authorization": API_KEY,},
        body: form,
                        
    });

    const data = await response.json();

    if (response.ok){
        displayErrors(data);
    }else{
        displayException(data);
        throw new Error(data.error);
    }
}

// 1. Iterate through the options
// 2. Push each value into a temporary array
// 3. Convert the array back to a string
function processOptions(form){

    let optArray = [];

    for(let entry of form.entries()){
        if (entry[0]==="options"){
            optArray.push(entry[1]);
        }
    }

    form.delete('options');
    form.append('options',optArray.join());

    return form;
}

function displayErrors(data){

    let heading = `JSHin Results for ${data.file}`;

    if(data.total_errors === 0){
        content = `<div class=no_errors> No errors reported! </div>`
    }else{
        content = `<div><span class="error_count"> Total errors:${data.total_errors} </span></div>`
        for(let error of data.error_list){
            content += `<div> At line <span class="line"> ${error.line}</span>,`;
            content += `column <span class="column"> ${error.col}</span></div>`;
            content += `<div class=error>${error.error}</div>`;
        }
    }

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = content;

    resultsModal.show();


}

function displayException(data){

    let heading = `An Exception Occurred`;
    let content = `<div> The API returned status code ${data.status_code}</div>`;
    content += `<div> Error number: <strong> ${data.error_no}</strong></div>`;
    content += `<div> Error text: <strong> ${data.error}</strong></div>`;

    document.getElementById('resultsModalTitle').innerText = heading;
    document.getElementById('results-content').innerHTML = content;

    resultsModal.show();
}