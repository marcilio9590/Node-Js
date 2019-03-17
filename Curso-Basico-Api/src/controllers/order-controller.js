'use strict';

const repository = require('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.post = async (req, res, next) => {
    try {
        const token = req.body.token || req.params.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);
        await repository.create({
            customer: data.id,
            number: guid.raw().substring(0, 6),
            items: req.body.items
        });
        res.status(201).send(
            montarRetorno("Pedido Cadastrado com Sucesso.")
        );
    } catch (e) {
        tratarError(res, e);
    }
}

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        tratarError(res, e);
    }
}

function montarRetorno(message) {
    return {
        message: message
    };
}

function tratarError(res, e) {
    res.status(500).send({
        message: "Ocorreu um erro ao processar esta ação.",
        error: e
    });
}