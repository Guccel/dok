//# imports
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = require('../models/product');

//# /products

//## GET
router.get('/', (req, res) => {
  Product.find()
    .select('_id name price')
    .exec()
    .then((docs) => {
      res.json({
        count: docs.length,
        products: docs.map((doc) => {
          return {
            ...doc._doc,
            request: {
              type: 'GET',
              url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${doc._id}`,
            },
          };
        }),
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//## POST
router.post('/', (req, res) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
  });
  product
    .save()
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
  res.json({
    product_new: product,
    request: {
      type: 'GET',
      url: `${req.protocol}://${req.get('host')}${req.originalUrl}/${product._id}`,
    },
  });
});

//# /products/:product_id

//## GET
router.get('/:product_id', (req, res) => {
  const product_id = req.params.product_id;
  Product.findById(product_id)
    .exec()
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      console.log(err);
    });
});

//## PATCH
router.patch('/:product_id', (req, res) => {
  const product_id = req.params.product_id;
  Product.updateOne(
    { _id: product_id },
    {
      $set: req.body,
      $inc: { __v: 1 },
    }
  )
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//## DELETE
router.delete('/:task_id', (req, res) => {
  const product_id = req.params.product_id;
  Product.remove({ _id: product_id })
    .exec()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//# exports
module.exports = router;
