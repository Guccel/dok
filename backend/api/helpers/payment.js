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

async function makePayment() {
  const res = await axios({
    method: 'POST',
    url: 'https://api-m.sandbox.paypal.com/v1/payments/payment', //  Change to 'https://api-m.paypal.com' for live
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${await getAccessToken()}`,
    },
    data: {
      intent: 'sale',
      payer: {
        payment_method: 'paypal',
      },
      transactions: [
        {
          amount: {
            total: '30.11',
            currency: 'USD',
            details: {
              subtotal: '30.00',
              tax: '0.07',
              shipping: '0.03',
              handling_fee: '1.00',
              shipping_discount: '-1.00',
              insurance: '0.01',
            },
          },
          description: 'description blah blah',
          custom: 'idk what this means',
          invoice_number: '0',
          payment_options: {
            allowed_payment_method: 'INSTANT_FUNDING_SOURCE',
          },
          soft_descriptor: 'ECHI5786786',
          item_list: {
            items: [
              {
                name: 'hat',
                description: 'Brown color hat',
                quantity: '5',
                price: '3',
                tax: '0.01',
                sku: '1',
                currency: 'USD',
              },
              {
                name: 'handbag',
                description: 'Black color hand bag',
                quantity: '1',
                price: '15',
                tax: '0.02',
                sku: 'product34',
                currency: 'USD',
              },
            ],
            shipping_address: {
              recipient_name: 'Hello World',
              line1: '4thFloor',
              line2: 'unit#34',
              city: 'SAn Jose',
              country_code: 'US',
              postal_code: '95131',
              phone: '011862212345678',
              state: 'CA',
            },
          },
        },
      ],
      note_to_payer: 'Contact us for any questions on your order.',
      redirect_urls: {
        return_url: 'https://example.com',
        cancel_url: 'https://example.com',
      },
    },
  });
}

module.exports = {
  getAccessToken,
  makePayment,
};
