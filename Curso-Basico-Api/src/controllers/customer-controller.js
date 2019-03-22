'use strict';

const repository = require('../repositories/customer-repository');
const ValidationContract = require('../validators/fluent-validator');
const md5 = require('md5');
const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

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

        await repository.create({
            name: req.body.name,
            email: req.body.email,
            roles: ["user"],
            password: md5(req.body.password + global.SALT_KEY)
        });
		//Comentado pois a chave do sendgrid nao pode ser comitada no git
      //  emailService.send(
      //      req.body.email,
       //     'Bem Vindo a Intelligence Solutions',
      //      global.EMAIL_TMPL.replace('{0}', req.body.name)
       // );
        res.status(201).send(
            montarRetorno("Cliente Cadastrado com Sucesso.")
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

exports.autheticate = async (req, res, next) => {
    try {

        const customer = await repository.authenticate({
            email: req.body.email,
            password: md5(req.body.password + global.SALT_KEY)
        });
        if (!customer) {
            res.status(404).send({
                message: "Usuario ou senha inválidos"
            })
        }
        const token = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })
        res.status(201).send({
            token: token,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
    } catch (e) {
        tratarError(res, e);
    }
}

exports.refreshToken = async (req, res, next) => {
    try {
        const token = req.body.token || req.params.token || req.headers['x-access-token'];
        const data = await authService.decodeToken(token);

        const customer = await repository.getById(data.id);

        if (!customer) {
            res.status(404).send({
                message: "Cliente não encontrado."
            })
        }
        const tokenData = await authService.generateToken({
            id: customer._id,
            email: customer.email,
            name: customer.name,
            roles: customer.roles
        })
        res.status(201).send({
            token: tokenData,
            data: {
                email: customer.email,
                name: customer.name
            }
        });
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
    console.log(e);
    res.status(500).send({
        message: e.message
    });
}