const path = require('path');
const fs = require('fs');

const rootDirectory = require('../util/path');
const dataPath = path.join(rootDirectory, 'data', 'Products.json');

module.exports = class Product {
  constructor(name, price) {
    this.id = Math.random();
    this.name = name;
    this.price = price;
  }

  save() {
    console.log('save');
    fs.readFile(dataPath, (err, data) => {
      let tempProducts = [];
      if (!err) {
        tempProducts = JSON.parse(data);
      }
      tempProducts.push(this);
      fs.writeFile(dataPath, JSON.stringify(tempProducts, null, 2), (err) => {
        if (err) throw err;
      });
    });
  }

  static fetchAll(cb) {
    fs.readFile(dataPath, (err, data) => {
      if (err) {
        cb([]);
      } else {
        cb(JSON.parse(data));
      }
    });
  }

  static fetchOneProduct(id) {
    const products = JSON.parse(fs.readFileSync(dataPath));
    const found = products.some((prod) => prod.id == id);

    if (found) {
      return products.find((prod) => prod.id == id);
    } else {
      return { msg: `Product with id of (${id}) is not found!` };
    }
  }

  static deleteById(id) {
    const products = JSON.parse(fs.readFileSync(dataPath));
    const updateProducts = products.filter((prod) => prod.id !== +id);
    fs.writeFileSync(
      dataPath,
      JSON.stringify(updateProducts, null, 2),
      (err) => {
        if (err) throw err;
      }
    );
  }
};
