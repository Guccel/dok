const mongoose = require('mongoose');
const Product = require('../models/product');
const axios = require('axios');
const qs = require('qs');

function getPaypalFormatedProduct_list(req) {
  var promises = [];
  for (let product_i in req.body.products) {
    promises.push(
      Product.findById(req.body.products[product_i]._id)
        .exec()
        .then((doc) => {})
    );
  }
}

async function getAccessToken() {
  const res = await axios({
    method: 'POST',
    url: 'https://api-m.sandbox.paypal.com/v1/oauth2/token',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    auth: {
      username: process.env.PAYPAL_CLIENT_ID,
      password: process.env.PAYPAL_CLIENT_SECRET,
    },
    data: qs.stringify({ grant_type: 'client_credentials' }),
  });
  return res.data.access_token;
}

module.exports = {
  getAccessToken,
};
