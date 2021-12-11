//# imports
const express = require('express');
const router = express.Router();
var paypalHelpers = require('../helpers/payment');

// start payment process

//# /payment/buy

router.get('/', (req, res) => {
  async function main() {
    re = await paypalHelpers.getPaymentLink();
    res.json(re);
  }
  main();
});

//## GET
router.get('/buy', (req, res) => {});

//# exports
module.exports = router;
