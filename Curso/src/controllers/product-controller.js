'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.post = (req, res, next) => {
    var product = new Product();
    product.title = req.body.title;
    product.slug = req.body.slug;
    product.description = req.body.description;
    product.price = req.body.price;
    product.tags = req.body.tags;
    product.save().then(x => {
        res.status(201).send({ message: 'Produto Cadastrado com Sucesso.' });
    }).catch(e => {
        res.status(400).send({ message: 'Falha ao Cadastrar Produto.', data: e });
    });
}

exports.put = (req, res, next) => {
    const id = req.params.id;
    res.status(200).send({
        id: id,
        item: req.body
    });
};

exports.delete = (req, res, next) => {
    res.status(200).send(req.body);
};