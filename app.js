const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev' });

app.use(cors());

console.log(process.env.API_URL);

app.get('/name', (req, res) => {
    res.send('My name is Petras');
});

app.listen(3000, () => console.log('server is online'));