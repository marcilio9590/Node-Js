'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = (req, res, next) => {
    Product.find({
        active: true
    }, 'title price slug').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.post = (req, res, next) => {
    var product = new Product();
    product.title = req.body.title;
    product.slug = req.body.slug;
    product.description = req.body.description;
    product.price = req.body.price;
    product.tags = req.body.tags;
    product.save().then(x => {
        res.status(201).send({
            message: 'Produto Cadastrado com Sucesso.'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao Cadastrar Produto.', data: e
        });
    });
}

exports.put = (req, res, next) => {
    Product.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            description: req.body.description,
            price: req.body.price
        }
    }).then(x => {
        res.status(201).send({
            message: 'Produto Atualizado com Sucesso.'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao Atualizar Produto.', data: e
        });
    });
};

exports.delete = (req, res, next) => {
    Product.findByIdAndRemove(req.body.id).then(x => {
        res.status(201).send({
            message: 'Produto Removido com Sucesso.'
        });
    }).catch(e => {
        res.status(400).send({
            message: 'Falha ao Remover Produto.', data: e
        });
    });
};

exports.getBySlug = (req, res, next) => {
    Product.findOne({
        slug: req.params.slug,
        active: true
    }, 'title description price slug tags').then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getById = (req, res, next) => {
    Product.findOne({
        _id: req.params.id
    }).then(data => {
        res.status(200).send(data);
    }).catch(e => {
        res.status(400).send(e);
    });
}

exports.getByTag = (req, res, next) => {
    Product.find({
        tags: req.params.tag,
        active: true
    }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data);
        }).catch(e => {
            res.status(400).send(e);
        });
}