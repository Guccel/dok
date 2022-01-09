//# imports
const axios = require('axios');
const { btoa } = require('buffer');
const express = require('express');
const querystring = require('querystring');
const Product = require('../models/product');
const router = express.Router();
var paypalHelpers = require('../helpers/payment');

async function getProducts(req) {
  const promises = [];
  product_list = [];
  const isId = []; //Bool list
  for (let product_i = 0; product_i < req.body.products.length; product_i++) {
    const id = req.body.products[product_i].id;
    promises.push(
      Product.findById(id)
        .exec()
        .then((product) => {
          isId.push(true);

          //  Add product to paypal list
          product_list.push({
            name: product.name,
            sku: `${product._id}-${req.body.products[product_i].type}`,
            price: product.price,
            currency: 'NZD',
            quantity: req.body.products[product_i].quantity,
          });
        })
        .catch((err) => {
          isId.push(false);
        })
    );
  }

  //  Resolve promises
  await Promise.all(promises);
  if (!Object.values(isId).every((value) => value === true)) {
    return { success: false, msg: isId };
  } else {
    return { success: true, products: product_list };
  }
}

async function getAccessToken() {
  username = process.env.PAYPAL_CLIENT_ID;
  passowrd = process.env.PAYPAL_CLIENT_SECRET;
  var creds = btoa(`${username}:${passowrd}`);
  const url = 'https://api-m.sandbox.paypal.com/v1/oauth2/token';
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${creds}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: btoa('grant_type:client_credentials'),
  });
  // console.log(res.body);
}

// paypal
//   .loadScript({ 'client-id': process.env.PAYPAL_CLIENT_ID })
//   .then((paypal) => {
//     // start to use the PayPal JS SDK script
//   })

//   .catch((err) => {
//     console.error('failed to load the PayPal JS SDK script', err);
//   });

//# /payment
router.post('/', (req, res) => {
  async function main() {
    const paypalProducts_list = await getProducts(req);
    if (paypalProducts_list.success === false) {
      res.status(404).json({
        msg: paypalProducts_list.msg,
      });
    }

    getAccessToken();

    res.status(200).json({
      out: paypalProducts_list.products,
    });
  }
  main();
});
//# exports
module.exports = router;
