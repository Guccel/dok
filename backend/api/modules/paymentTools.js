const axios = require('axios');
const paypal = require('@paypal/paypal-js');

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
// function getAccessToken() {
//   const res = axios.post('https://api-m.sandbox.paypal.com/v1/oauth2/token', {
//     auth: {
//       username: process.env.PAYPAL_CLIENT_ID,
//       password: process.env.PAYPAL_CLIENT_SECRET,
//     },
//   });
//   console.log(res);
// }

// paypal
//   .loadScript({ 'client-id': process.env.PAYPAL_CLIENT_ID })
//   .then((paypal) => {
//     // start to use the PayPal JS SDK script
//   })

//   .catch((err) => {
//     console.error('failed to load the PayPal JS SDK script', err);
//   });

module.exports = getProducts;
