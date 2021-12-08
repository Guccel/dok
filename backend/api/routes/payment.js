//# imports
const express = require('express');
const router = express.Router();
const Product = require('../models/product');

async function func(req) {
  const promises = [];
  var totalPrice = 0;
  for (let x = 0; x < req.body.product_ids.length; x++) {
    const id = req.body.product_ids[x];
    promises.push(
      Product.findById(id, 'price')
        .exec()
        .then((product) => {
          totalPrice += product.price;
        })
    );
  }

  const out = await Promise.all(promises);

  return totalPrice;
}

//# /payment
router.get('/', (req, res) => {
  async function main() {
    out = await func(req);
    console.log(out);
    res.json({ total: out });
  }
  main();
});

//# exports
module.exports = router;
