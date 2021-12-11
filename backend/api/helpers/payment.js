const mongoose = require('mongoose');
const Product = require('../models/product');
const axios = require('axios');
const qs = require('qs');

async function getPaypalFormatedProduct_list(req) {
  var promises = [];
  var product_list = [];
  for (let product_i in req.body.products) {
    var currentProduct = req.body.products[product_i];
    promises.push(
      Product.findById(currentProduct._id)
        .exec()
        .then((doc) => {
          product_list.push({
            name: doc.name,
            unit_amount: { currency_code: 'NZD', value: String(doc.price) },
            quantity: String(currentProduct.quantity),
            sku: `${doc._id}-${currentProduct.type}`,
          });
        })
    );
  }
  await Promise.all(promises);
  return product_list;
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

async function getPaymentLink(req) {
  const items = await getPaypalFormatedProduct_list(req);
  let itemTotal = 0;
  for (let formattedProduct_i in items) {
    currentItem = items[formattedProduct_i];
    itemTotal += Number(currentItem.unit_amount.value) * Number(currentItem.quantity);
  }
  let shippingTotal = 0;
  let total = String(itemTotal + shippingTotal);
  console.log(items);
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
              item_total: { currency_code: 'NZD', value: itemTotal },
              shipping: { currency_code: 'NZD', value: shippingTotal },
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
  getPaypalFormatedProduct_list,
};
