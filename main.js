const form = document.getElementById('form');
const brandInput = document.getElementById('brand');
const modelInput = document.getElementById('model');
const priceInput = document.getElementById('price');
const user_idInput = document.getElementById('user');
const addButton = document.getElementById('add');

const BASE_URL = 'http://localhost:3000';

const user = '6390cd45a8b2d2de39344209';

addButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch(BASE_URL + '/adverts', {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({ brand: brandInput.value, model: modelInput.value, price: priceInput.value, user_id: user })
    })
    .then((res) => res.json())
    .then((data) => {
        
    });
});