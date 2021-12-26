//# imports
const express = require('express');
const Product = require('../../models/product');

const router = express.Router();

router.get('/', async (req, res) => {
  body = req.body;
  const product_list = await Product.find();
  return res.status(200).json({
    product_list,
  });
});

//# exports
module.exports = router;
