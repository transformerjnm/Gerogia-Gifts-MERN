const express = require('express');
const Product = require('../models/product');
const ProductRouter = express.Router();

ProductRouter.route('/')
.all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
})
.get(async (req, res) => {
    try {
        const products = await Product.find();
        res.send(products);
    } catch(err){
        res.json(err);
    }
}).post( (req, res, next) => {
    Product.create(req.body)
    .then(product => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(product);
    })
})

module.exports = ProductRouter;