const express = require('express');
const path = require('path');
const fs = require('fs');

const rootDirectory = require('../util/path');

const router = express.Router();

const data = fs.readFileSync(path.join(rootDirectory, 'models', 'Products.json'));
const prodData = JSON.parse(data);


router.get('/add-products',(req, res, next) => {
    // res.send('');
    // res.sendFile(path.join(rootDirectory, 'views', 'add-product.html'));
    res.render('add-product',{
        pageTitle: 'Add a product'
    });
});

router.post('/add-product', (req, res, next) => {
    // console.log(req.body);
    const newData = [
        ...prodData,
        {
        id: Math.random(),
        name: req.body.name,
        price: addZeroes(req.body.price)
        }
    ];
    const stringyfied = JSON.stringify(newData, null, 2);
    fs.writeFile(path.join(rootDirectory, 'models','Products.json'), stringyfied, (err)=>{
        if(err) throw err;
        console.log('New product added.');
    })
    res.redirect('/');
});

function addZeroes(num){
    const dec = num.split('.')[1];
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len);
}

module.exports = router;