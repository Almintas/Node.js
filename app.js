const express = require('express');
const app = express();
const PORT = 3000;

const CARS = [
    { brand: 'BMW', model: '3', year: '2010', color: 'white' },
    { brand: 'AUDI', models: 'A6', year: '2015', clor: 'black' }
];

const USERS = [
    { id: 1, name: 'Petras', surname: 'Petraitis' },
    { id: 2, name: 'Martynas', surname: 'Martinaitis' }
];

app.get('/cars', (req, res) => {
   res.send(CARS);
});

app.get('/api/cars/:id', (req, res) => {
    const id = Number(req.params.id);

    const car = CARS.find((car) => car.id === id);

    if (!car) {
        res.status(400).send('Car was not found')
    }

    res.send(car);

})

app.get('/api/users', (req, res) => {
res.send(USERS)
});

app.get('/api/users/:firstLetter', (res, req) => {
const firstLetter = req.params.firstLetter.toLowerCase();
const filteredUsers = USERS.filter((user) => user.name.toLowerCase().indexOf(firstLetter) === 0)
res.send(filteredUsers)
});

app.listen(PORT, () => console.log(`App is running on port ${PORT}`));