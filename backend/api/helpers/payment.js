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

async function getPaymentLink() {
  let total = '4';
  let item_total = '4';
  let shipping = '0';
  let items = [];
  const res = await axios({
    method: 'POST',
    url: 'https://api-m.sandbox.paypal.com/v2/checkout/orders', //  Change to 'https://api-m.paypal.com' for live
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    data: {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'NZD',
            value: total,
            breakdown: {
              item_total: { currency_code: 'NZD', value: item_total },
              shipping: { currency_code: 'NZD', value: shipping },
            },
          },
          items,
        },
      ],
    },
  });
  return {
    id: res.data.id,
    link: res.data.links[1].href,
  };
}

module.exports = {
  getAccessToken,
  getPaymentLink,
};
