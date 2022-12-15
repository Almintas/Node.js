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

const userAdverts = new mongoose.Schema({
    brand: {
        type: String,
        reqiured: true
    },
    model: {
        type: String,
        reqiured: true
    },
    price: {
        type: Number,
        reqiured: true
    },
    user_id: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

const carUserAdverts = mongoose.model('adverts', userAdverts);

const carModelUsers = mongoose.model('users', carUsers);


console.log(process.env.API_URL);

app.get('/cars', async (req, res) => {
    const data = await carModel.find().sort({ year: 1 });
    res.send(data);
});

app.get('/cars/:brand', async (req, res) => {
    const cars = await carModel.find({
        brand:
        {
            $regex:
                new RegExp(req.params.brand, 'i')
        }
    });
    // const cars = await carModel.find({ brand });
    res.send(cars);
});

app.get('/users/asc', async (req, res) => {
    const users = await carModelUsers.find().sort({ user: 1 });
    res.send(users);
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

app.post('/users', async (req, res) => {
    const { user, brand } = req.body;
    await carModelUsers.create({ user, brand });
    const users = await carModelUsers.find();
    res.send(users);
});

app.get('/users/:name', async (req, res) => {
    const { name } = req.params;
    const users = await carModelUsers.find({ name });
    res.send(users);
});

app.delete('/adverts/:id', async (req, res) => {
    const { id } = req.params;
    await carUserAdverts.deleteOne({ _id: id });
    const adverts = await carUserAdverts.find();
    res.send(adverts);
});

app.post('/adverts', async (req, res) => {
    const { brand, model, price, description, user_id, } = req.body;
    await carUserAdverts.create({ brand, model, price, user_id, description });
    const advertsUser = await carUserAdverts.find();
    res.send(advertsUser);
});

app.patch('/adverts/:id', async (req, res) => {
    const { id } = req.body;
    // const { brand, model, price } = req.body;
    await carUserAdverts.updateOne({ _id: id });
    const data = await carUserAdverts.find();
    res.send(data);
});

app.get('/adverts', async (req, res) => {
    const data = await carUserAdverts.find();
    res.send(data);
});

app.listen(3000, () => console.log('server is online'));