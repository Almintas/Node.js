const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config({ path: process.env.NODE_ENV === 'prod' ? '.env.prod' : '.env.dev' });

app.use(cors());
app.use(express.json());

const mongoDB = 'mongodb+srv://Almintas:kikitata@cluster0.zc6jd3y.mongodb.net/cars-portal?retryWrites=true&w=majority';

mongoose.connect(mongoDB);

const db = mongoose.connection;

db.on('error', (error) => console.log(error));
db.once('open', () => console.log('Connected to MongoDB!'));

const carSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});
const carModel = mongoose.model('car', carSchema);

const carUsers = new mongoose.Schema({
    user: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    }
});

const carModelUsers = mongoose.model('users', carUsers);


console.log(process.env.API_URL);

app.get('/cars',  async (req, res) => {
    const data = await carModel.find();
    res.send(data);
});

app.post('/cars', async (req, res) => {
    const { brand, model, year, price } = req.body;
    await carModel.create({ brand, model, year, price });
    const cars = await carModel.find();
    res.send(cars);
});

app.get('/users', async (req, res) => {
    const data = await carModelUsers.find();
    res.send(data);
});

app.listen(3000, () => console.log('server is online'));