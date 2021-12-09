//# imports
const express = require('express');
const paypal = require('paypal-rest-sdk');
const Product = require('../models/product');
const router = express.Router();

//# config
paypal.configure({
  mode: 'sandbox',
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

function generatePaypalItem(obj, quantity) {
  return {
    name: obj.name,
    sku: obj._id,
    price: obj.price,
    currency: 'NZD',
    quantity,
  };
}

// This is neccessary imo to entirely remove the liability of prices being changed within req
async function getProducts(req) {
  const promises = [];
  product_list = [];
  const isId = []; //Bool list
  var totalPrice = 0;
  for (let id_i = 0; id_i < req.body.product_ids.length; id_i++) {
    const id = req.body.product_ids[id_i];
    promises.push(
      Product.findById(id)
        .exec()
        .then((product) => {
          product_list.push(product);
          isId.push(true);
        })
        .catch((err) => {
          isId.push(false);
        })
    );
  }

  await Promise.all(promises);
  if (!Object.values(isId).every((value) => value === true)) {
    return {
      success: false,
      msg: isId,
    };
  } else {
    return {
      success: true,
      products: product_list,
    };
  }
}

//# /payment
router.get('/', (req, res) => {
  async function main() {
    product_list = await getProducts(req);
    console.log(product_list.products);
    paypalItem_list = [];

    if (product_list.success == true) {
      for (let product_i = 0; product_i < product_list.products.length; product_i++) {
        paypalItem_list.push(generatePaypalItem(product_list.products[product_i], 1));
      }
    }
    res.json(paypalItem_list);
  }
  main();
});

router.post('/pay', (req, res) => {
  const create_payment_json = {
    intent: 'sale',
    payer: {
      payment_method: 'paypal',
    },
    redirect_urls: {
      return_url: 'http://localhost:3000/success',
      cancel_url: 'http://localhost:3000/cancel',
    },
    transactions: [
      {
        item_list: {
          items: [
            {
              name: 'Redhock Bar Soap',
              sku: '001',
              price: '25.00',
              currency: 'USD',
              quantity: 1,
            },
          ],
        },
        amount: {
          currency: 'USD',
          total: '25.00',
        },
        description: 'Washing Bar soap',
      },
    ],
  };
  paypal.payment.create(create_payment_json, function (error, payment) {
    if (error) {
      throw error;
    } else {
      for (let i = 0; i < payment.links.length; i++) {
        if (payment.links[i].rel === 'approval_url') {
          res.redirect(payment.links[i].href);
        }
      }
    }
  });
});
//# exports
module.exports = router;
