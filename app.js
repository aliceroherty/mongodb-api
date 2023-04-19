require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.CONNECTION_STRING);

const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to db'));

app.use(express.json());

const customerRouter = require('./routes/customers');
app.use('/customers', customerRouter);

app.listen(3000, () => console.log('Server listening...'));
