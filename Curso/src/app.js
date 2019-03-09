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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', indexRoute);
app.use('/products', productRoute);
app.use('/customers', customerRoute);
app.use('/orders', orderRoute);

module.exports = app;