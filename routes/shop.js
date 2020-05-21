const express = require('express');
const path = require('path');
const fs = require('fs');
const productsData = require('../models/Products');

const rootDirectory = require('../util/path');

const router = express.Router();

router.get('/', (req, res, next) => {
    // res.send('<h1>Hello from Express</h1>');
    // res.sendFile(path.join(rootDirectory, 'views', 'shop.html'));
    const data = fs.readFileSync(path.join(rootDirectory, 'models', 'Products.json'));
    const prodData = JSON.parse(data);

    res.render('shop', {
        pageTitle: 'Shop Page',
        products: prodData
    });
});

module.exports = router;