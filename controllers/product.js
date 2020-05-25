const Product = require('../models/product');

exports.getAddProducts = (req, res, next) => {
  res.render('add-product', {
    pageTitle: 'Add a product',
  });
};

exports.getProducts = (req, res, next) => {
  console.log('getProducts');
  Product.fetchAll((fetchedProducts) => {
    res.render('shop', {
      pageTitle: 'Shop Page',
      products: fetchedProducts,
    });
  });
};

exports.postAddProduct = (req, res, next) => {
  const product = new Product(req.body.name, addZeros(req.body.price));
  product.save();
  res.redirect('/');
};

exports.getOneProductById = (req, res, next) => {
  const fetchedProduct = Product.fetchOneProduct(req.params.productId);
  if (fetchedProduct.msg) {
    res.render('404', {
      message: fetchedProduct.msg,
      pageTitle: 'Id not found',
    });
  } else {
    res.render('product', {
      product: fetchedProduct,
      pageTitle: fetchedProduct.name,
    });
  }
};

exports.getOneProductByForm = (req, res, next) => {
  const fetchedProduct = Product.fetchOneProduct(req.body.productId);
  if (fetchedProduct.msg) {
    res.render('404', {
      message: fetchedProduct.msg,
      pageTitle: 'Id not found',
    });
  } else {
    res.render('product', {
      product: fetchedProduct,
      pageTitle: fetchedProduct.name,
    });
  }
};

exports.postDeleteProduct = (req, res, next) => {
  const productId = req.body.productId;
  Product.deleteById(productId);
  res.redirect('/');
};

function addZeros(num) {
  const dec = num.split('.')[1];
  const len = dec && dec.length > 2 ? dec.length : 2;
  return Number(num).toFixed(len);
}
