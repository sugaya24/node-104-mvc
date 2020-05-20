const express = require('express');
const path = require('path');

const rootDirectory = require('../util/path');

const router = express.Router();

router.get('/add-products',(req, res, next) => {
    // res.send('');
    res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
});

router.post('/add-product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;