const form = document.getElementById('form');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const priceInput = document.getElementById('price');
const advertsOutput = document.getElementById('div');
const editDiv = document.getElementById('editDiv');

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
        });

        const editButton = document.createElement('button');
        editButton.textContent = 'EDIT';

        editButton.addEventListener('click', () => {
            const editCard = document.createElement('form');

            const editBrand = document.createElement('input');
            editBrand.setAttribute('id', 'brand-input');
            editBrand.setAttribute('placeholder', 'Brand');
            editBrand.setAttribute('required', true);

            const editModel = document.createElement('input');
            editModel.setAttribute('id', 'model-input');
            editModel.setAttribute('placeholder', 'Model');
            editModel.setAttribute('required', true);

            const editPrice = document.createElement('input');
            editPrice.setAttribute('id', 'price-input');
            editPrice.setAttribute('placeholder', 'Price');
            editPrice.setAttribute('required', true);
            editPrice.setAttribute('type', 'number');

            const submitButton = document.createElement('button');
            submitButton.textContent = 'Atnaujinti skelbima';

            editCard.appendChild(editBrand);
            editCard.appendChild(editModel);
            editCard.appendChild(editPrice);
            editCard.appendChild(submitButton);

            editDiv.appendChild(editCard);
        });

        advertCard.appendChild(advertBrand);
        advertCard.appendChild(advertModel);
        advertCard.appendChild(advertPrice);
        advertCard.appendChild(deleteButton);
        advertCard.appendChild(editButton);

        advertsOutput.appendChild(advertCard);
    });
});