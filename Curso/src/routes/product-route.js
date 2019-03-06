'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controllers/product-controller');

router.post('/', controller.post);
router.delete('/', controller.put);
router.put('/:id', controller.delete);

module.exports = router;