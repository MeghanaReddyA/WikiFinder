
let searchInputEl = document.getElementById("searchInput");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");

const createAndAddResult = (result) => {
    let {title,link,description} = result;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("result-container");
    searchResultsEl.appendChild(resultContainer);

    let resultTitle = document.createElement("a");
    resultTitle.classList.add("result-title");
    resultTitle.href = link;
    resultTitle.target = "__blank";
    resultTitle.textContent = title;
    resultContainer.appendChild(resultTitle);

    let titleBrEl = document.createElement("br");
    resultContainer.appendChild(titleBrEl);

    let  resultUrl = document.createElement("a");
    resultUrl.classList.add("result-url");
    resultUrl.target = "__blank";
    resultUrl.textContent = link;
    resultUrl.href = link;
    resultContainer.appendChild(resultUrl);

    let urlBrEl = document.createElement("br");
    resultContainer.appendChild(urlBrEl);

    let resultDescription = document.createElement("p");
    resultDescription.classList.add("result-description");
    resultDescription.textContent = description;
    resultContainer.appendChild(resultDescription);

    let hrLine = document.createElement("hr");
    searchResultsEl.appendChild(hrLine);
}

let displaySearchResults = function(results){
    spinnerEl.classList.toggle("d-none");
    for (let result of results){
        createAndAddResult(result);
    }
}

const search = (event) => {
    if (event.key==="Enter"){
        spinnerEl.classList.toggle("d-none");
        searchResultsEl.textContent = '';
        
        let searchInput = searchInputEl.value;
        const url = "https://apis.ccbp.in/wiki-search?search=" + searchInput;
        const options = {
            method:"GET"
        };

        fetch(url,options)
        .then(function(response){
            return response.json();
        })
        .then(function(jsonData){
            let {search_results} = jsonData;
            displaySearchResults(search_results);
        });

    }
   
}

searchInputEl.addEventListener("keydown",search);