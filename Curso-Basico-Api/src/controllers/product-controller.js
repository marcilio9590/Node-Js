'use strict';

const ValidationContract = require('../validators/fluent-validator');
const repository = require('../repositories/product-repository');

exports.get = async (req, res, next) => {
    try {
        var data = await repository.get();
        res.status(200).send(data);
    } catch (e) {
        tratarError(res, e);
    }
}

exports.getBySlug = async (req, res, next) => {
    try {
        var data = await repository.getBySlug(req.params.slug);
        res.status(200).send(data);
    } catch (e) {
        tratarError(res, e);
    }
}

exports.getById = async (req, res, next) => {
    try {
        var data = await repository.getById(req.params.id);
        res.status(200).send(data);
    } catch (e) {
        tratarError(res, e);
    }
}

exports.getByTag = async (req, res, next) => {
    try {
        var data = await repository.getByTag(req.params.tag);
        res.status(200).send(data);
    } catch (e) {
        tratarError(res, e);
    }
}

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.title, 3, 'O titulo deve ter no mínimo 3 caracteres.');
    contract.hasMinLen(req.body.slug, 3, 'O slug deve ter no mínimo 3 caracteres.');
    contract.hasMinLen(req.body.description, 3, 'A descrição deve ter no mínimo 3 caracteres.');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        var data = await repository.create(req.body);
        res.status(201).send(
            montarRetorno("Produto Cadastrado com Sucesso.")
        );
    } catch (e) {
        tratarError(res, e);
    }
}

exports.put = async (req, res, next) => {
    try {
        var data = await repository.update(req.params.id, req.body);
        res.status(201).send(
            montarRetorno("Produto Atualizado com Sucesso.")
        );
    } catch (e) {
        tratarError(res, e);
    }
};

exports.delete = async (req, res, next) => {
    try {
        var data = await repository.delete(req.body.id);
        res.status(200).send(
            montarRetorno("Produto Removido com Sucesso.")
        );
    } catch (e) {
        tratarError(res, e);
    }
};

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


