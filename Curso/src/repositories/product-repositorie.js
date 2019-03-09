'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

exports.get = async () => {
    const res = await Product.find({
        active: true
    }, 'title price slug');
    return res;
}

exports.getBySlug = async (slug) => {
    const res = await Product.findOne({
        slug: slug,
        active: true
    }, 'title description price slug tags');
    return res;
}

exports.getById = async (id) => {
    const res = await Product.findOne({
        _id: id
    });
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product.find({
        tags: tag,
        active: true
    }, 'title description price slug tags');
    return res;
}

exports.create = async (data) => {
    var product = new Product();
    product.title = data.title;
    product.slug = data.slug;
    product.description = data.description;
    product.price = data.price;
    product.tags = data.tags;
    const res = await product.save();
    return res;
}

exports.update = async (id, data) => {
    const res = await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price
        }
    });
    return res;
}

exports.delete = async (id) => {
    const res = await Product.findByIdAndRemove(id);
}