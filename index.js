const express = require('express');
var cors = require('cors');
const connection = require('./connection');
const userRoute = require('./routes/userRoute');
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.user('/userRoute', userRoute);

module.exports = app;