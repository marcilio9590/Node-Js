'use strict';

const repository = require('../repositories/customer-repository');
const ValidationContract = require('../validators/fluent-validator');

exports.post = async (req, res, next) => {
    let contract = new ValidationContract();
    contract.hasMinLen(req.body.name, 3, 'O Nome deve ter no mínimo 3 caracteres.');
    contract.isEmail(req.body.email, 'Email Inválido');
    contract.hasMinLen(req.body.password, 6, 'A Senha deve ter no mínimo 6 caracteres.');
    if (!contract.isValid()) {
        res.status(400).send(contract.errors()).end();
        return;
    }
    try {
        await repository.create(req.body);
        res.status(201).send(
            montarRetorno("Cliente Cadastrado com Sucesso.")
        );
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