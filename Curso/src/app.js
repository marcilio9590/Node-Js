'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const config = require('./config');
const app = express();
var mongoose = require('mongoose');

// connecta ao banco
mongoose.connect(config.connectionString, { useNewUrlParser: true })
    .catch((error) => {
        console.log(error);
    });;

// Carregando Models
const Product = require('./models/product');
const Customer = require('./models/customer');
const Order = require('./models/order');

// Carregando as Rotas
const indexRoute = require("./routes/index-route");
const productRoute = require("./routes/product-route");
const customerRoute = require("./routes/customer-route");
const orderRoute = require("./routes/order-route");

app.use(bodyParser.json({
    limit: '5mb'
}));
app.use(bodyParser.urlencoded({
    extended: false
}));

// Habilitando CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requeted-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});


app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;