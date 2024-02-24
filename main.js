const limit = 10;
async function fetchApiData(url) {
    try{
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Could not fetch response from the network');
        }
        const result = await response.json();
        return result;
    } catch(error) {
        console.error('An error occured during the fetch operation:', error.message);
    };
}

function fetchPlanetDataAndPopulate(url){
    if(url === "null" || url === "undefined"){
        return;
    }

    let totalData = 0;
    let next = "";
    let previous = "";
    fetchApiData(url).then(data => {
        swPlanetData = data?.results || [];
        totalData = parseInt(data?.count) || 0;
        next = data?.next;
        previous = data?.previous;
        let planetCards = "";
        swPlanetData.map((planet, index) => {
            const totalResidence = planet.residents.length;
            const imageNo = Math.floor(Math.random()*15)+1;
            planetCards += `
                    <div class="row justify-content-center p-0">
                    <div class="card mb-2 mt-1 col-md-7 col-sm-10 col-10 align-self-center">
                        <img src="./resources/planets/planet-${imageNo}.jpg" alt="StarWarsPlanet" class="card-image p-1">
                        <div class="card-header">
                            <h2>Name : ${planet.name}</h2>
                        </div>
                        <div class="card-body">
                            <span>Population: ${planet.population}</span><br>
                            <span>Climate: ${planet.climate}</span><br>
                            <span>Terrain: ${planet.terrain}</span><br>
                            <span>Rotation-Period: ${planet.rotation_period}</span><br>
                            <span>Orbital-Period: ${planet.orbital_period}</span>
                        </div>
                        <div class="card-footer text-body-secondary">
                            <span>No of Residents: ${totalResidence}</span>
                            ${createResidentDetails(planet.residents, index)}
                        </div>  
                    </div>
                </div>`
            });
            
        const cardElements = document.createElement("div");
        cardElements.classList.add("container");
        cardElements.classList.add("sw-card-container");
        cardElements.innerHTML = planetCards;
        const elementCardContainer = document.getElementById("sw-card-container");
        elementCardContainer.innerHTML = "";
        elementCardContainer.appendChild(cardElements);
        makePagination(totalData, next, previous);
    });
}

function createResidentDetails(residentsArr, planetNo){
    let residentDetails = "";
    if(residentsArr.length>0){
        residentDetails = `
            <button class="btn btn-primary ml-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${planetNo}" aria-expanded="false" aria-controls="collapse-${planetNo}">
                Resident Details
            </button>
            <div class="collapse resident-container mt-2" id="collapse-${planetNo}">
                    ${(function(){
                        let residentList = "<ul class='list-group list-group-horizontal-sm resident-list-group'>";
                        residentsArr.forEach((resident, index) => {
                            residentList += `
                                <li class="list-group-item p-1 m-1">
                                    <button type="button" class="btn  btn-outline-info btn-md p-1" data-bs-toggle="modal" data-bs-target="#residence-modal" onclick="fetchResidenceDataAndUpdate('${resident}')">Resident No: ${index+1}</button>
                                </li>`;
                        })
                        residentList += "</ul>"
                        return residentList;
                    })()}
            </div>`
    } else {
        residentDetails ='<a href="#" class="btn btn-secondary disabled" tabindex="-1" aria-disabled="true">Residents Detail</a>'
    }
    return residentDetails;
}

function fetchResidenceDataAndUpdate(url){
    if(url === "null" || url === "undefined"){
        return;
    }

    let modalBodyContent = "";
    fetchApiData(url).then(swResidentData => {
        modalBodyContent += `
                <h3 class="fs-3">Name: ${swResidentData.name}</h3>
                <p>Height: ${swResidentData.height}</p>
                <p>Mass: ${swResidentData.mass}</p>
                <p>Gender: ${swResidentData.gender}</p>`;

        const modalBody = document.getElementById("modal-body");
        modalBody.innerHTML = "";
        const modalBodyChildElement = document.createElement("div");
        modalBodyChildElement.innerHTML = modalBodyContent;
        modalBody.appendChild(modalBodyChildElement);
    });

}

function getResidentModalElement(){
    return (`<div class="modal fade" id="residence-modal" tabindex="-1" aria-labelledby="residentModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="residentModalLabel">Resident Details</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="modal-body"></div>
                    </div>
                </div>
            </div>`);
}

function makePagination(total, next, previous){
    let paginationItems = `
        <li class="page-item">
        <a class="page-link" href="#" aria-label="Previous" onclick="fetchPlanetDataAndPopulate('${previous}')">
            <span aria-hidden="true">&laquo;</span>
        </a>
        </li>`;

    for(let i=1; i<=total/limit; i++){
        const url = `https://swapi.dev/api/planets/?page=${i}&format=json`;
        paginationItems += `<li class="page-item"><a class="page-link" href="#" onclick="fetchPlanetDataAndPopulate('${url}')">${i}</a></li>`;
    }
    
    paginationItems += `
    <li class="page-item">
      <a class="page-link" href="#" onclick="fetchPlanetDataAndPopulate('${next}')" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>`;

    const paginationContainer = document.createElement("ul");
    paginationContainer.classList.add("pagination");
    paginationContainer.innerHTML = paginationItems;
    const elementPagination = document.getElementById("sw-pagination");
    elementPagination.innerHTML = "";
    elementPagination.appendChild(paginationContainer);
}

document.addEventListener("DOMContentLoaded", () => {
    fetchPlanetDataAndPopulate('https://swapi.dev/api/planets/?page=1&format=json');
    
    const modalConatiner = document.getElementById("modal-conatiner");
    modalConatiner.innerHTML = "";
    const modal = getResidentModalElement();
    modalConatiner.innerHTML = modal;
}, {once: true});
