const searchYourPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    searchField.value = '';
    const errorMessage = document.getElementById("error-message")
    //------ error handle null message ------//
    if (searchText == '') {

        errorMessage.innerText = "PLease Write Something To Search"
    }
    else {

        const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displaySearchResult(data.data))

    }
}

const displaySearchResult = data => {
    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.innerHTML = '';
    const errorMessage = document.getElementById('error-message')
    if (data.length === 0) {
        errorMessage.innerText = " Sorry!! No Phone Found"

    }
    else {

        const searchResult = document.getElementById('search-result')
        searchResult.textContent = '';
        data.forEach(info => {
            if (data.indexOf(info) < 20) {
                errorMessage.innerText = ""
                const div = document.createElement('div')
                div.classList.add('col')
                div.innerHTML = `<div class="col">
        <div class="card">
        <div class="card-body">
                <h5 class="card-title text-center">${info.phone_name}</h5>
                <p class="card-text text-center">${info.brand}</p>
            </div>
            <img src="${info.image}" class="card-img-top w-75 mx-auto" alt="...">
            <a onclick="loadDetail('${info.slug}')" href="#" class="btn btn-outline-success w-50 mx-auto my-3">Specs</a>
        </div>
        
        </div>
        `
                searchResult.appendChild(div)
            }

        })
    }

}
const loadDetail = id => {
    const url = `https://openapi.programming-hero.com/api/phone/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayPhoneDetail(data))


}
const displayPhoneDetail = data => {

    const phoneDetails = document.getElementById('phone-details')
    phoneDetails.textContent = '';
    const div = document.createElement('div')
    div.classList.add('card')
    const releaseDate = (date) => {
        if (date === '') {
            return 'Relase Date Not Found';
        }
        else {
            return date;
        }
    }
    div.innerHTML = `
    <img src="${data.data.image}" class="card-img-top" alt="...">
                <div class="card-body mb-3">
                  <h5 class="card-title">${data.data.name}</h5>
                  <ul>
                  <li><span class= "fw-bold">Chipset</span>: ${data.data.mainFeatures.chipSet}</li>
                  <li><span class= "fw-bold">Display Size</span>: ${data.data.mainFeatures.displaySize}</li>
                  <li><span class= "fw-bold">Memory</span>: ${data.data.mainFeatures.memory}</li>
                  <li><span class= "fw-bold">Storage</span>: ${data.data.mainFeatures.storage}</li>
                  </ul>
                  <p class="card-text"><small class="text-muted">${releaseDate(data.data.releaseDate)}</small></p>
                  <div class="accordion" id="accordionExample">
                    <div class="accordion-item">
                    <h2 class="accordion-header" id="headingOne">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Other specifications
                    </button>
                    </h2>
                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                    <div class="accordion-body">
                    <ul>
                  <li><span class= "fw-bold">Sensors</span>: ${data.data.mainFeatures.sensors}</li>
                  <li><span class= "fw-bold">Bluetooth</span>: ${data.data.others ? data.data.others.Bluetooth : "Bluetooth is not Available"}</li>
                  <li><span class= "fw-bold">GPS</span>: ${data.data.others ? data.data.others.GPS : "GPS is not Available"}</li>
                  <li><span class= "fw-bold">NFC</span>: ${data.data.others ? data.data.others.NFC : "NFC is not Available"}</li>
                  <li><span class= "fw-bold">Radio</span>: ${data.data.others ? data.data.others.Radio : "Radio is not Available"}</li>
                  <li><span class= "fw-bold">USB</span>: ${data.data.others ? data.data.others.USB : "USB is not Available"}</li>
                  <li><span class= "fw-bold">WLAN</span>: ${data.data.others ? data.data.others.WLAN : "WLAN is not Availble"}</li>
                  
                </ul>
                    </div>
                    </div>
                    </div>
                    </div>
                </div>
    `
    phoneDetails.appendChild(div)

}