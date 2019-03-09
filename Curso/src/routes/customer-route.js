'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/customer-controller');
const authService = require('../services/auth-service');

router.post('/', controller.post);
router.get('/', controller.get);
router.post('/autheticate', controller.autheticate);
router.post('/refresh-token', authService.authorize, controller.refreshToken);

module.exports = router;