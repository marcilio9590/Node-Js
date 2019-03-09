'use strict';

const mongoose = require('mongoose');
const Order = mongoose.model('Order');

exports.create = async (data) => {
    var order = new Order(data);
    await order.save();
}

exports.get = async () => {
    return await Order.find({}, 'number status createDate customer items')
        .populate('customer', 'name')
        .populate('items.product', 'price title');
}

