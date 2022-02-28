const searchYourPhone = () => {
    const searchField = document.getElementById('search-field')
    const searchText = searchField.value;
    searchField.value = '';
    const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
    console.log(url)
}

const displaySearchResult = data => {
    const searchResult = document.getElementById('search-result')
    data.forEach(data => {
        console.log(data)
        const div = document.createElement('div')
        div.classList.add('col')
        div.innerHTML = `<div class="col">
        <div class="card">
        <div class="card-body">
                <h5 class="card-title text-center">${data.phone_name}</h5>
                <p class="card-text text-center">${data.brand}</p>
            </div>
            <img src="${data.image}" class="card-img-top w-75 mx-auto" alt="...">
        </div>
        </div>
        `
        searchResult.appendChild(div)

    })

}