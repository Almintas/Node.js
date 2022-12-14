const form = document.getElementById('form');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const priceInput = document.getElementById('price');
const advertsOutput = document.getElementById('div');

const BASE_URL = 'http://localhost:3000';

const USER = '6390cd45a8b2d2de39344209';

form.addEventListener('submit', () => {
    fetch(BASE_URL + '/adverts', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ brand: brandInput.value, model: modelInput.value, price: priceInput.value, user_id: USER })
    });
});

fetch(BASE_URL + '/adverts')
.then((res) => res.json())
.then((adverts) => {
    adverts.forEach((advert) => {
        const advertCard = document.createElement('div');
        const advertBrand = document.createElement('h3');
        advertBrand.textContent = advert.brand;

        const advertModel = document.createElement('p');
        advertModel.textContent = advert.model;

        const advertPrice = document.createElement('p');
        advertPrice.textContent = advert.price;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'DELETE';

        deleteButton.addEventListener('click', ()=> {
            fetch(BASE_URL + '/adverts/' + advert._id, {
                method: 'DELETE'
            })
            .then(() => window.location.reload());
        })

        advertCard.appendChild(advertBrand);
        advertCard.appendChild(advertModel);
        advertCard.appendChild(advertPrice);
        advertCard.appendChild(deleteButton);

        advertsOutput.appendChild(advertCard);
    });
});