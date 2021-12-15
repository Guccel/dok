//# imports
const express = require('express');
const router = express.Router();
var paypalHelpers = require('../helpers/payment');

//# /payment/buy

//## GET
router.get('/buy', async (req, res) => {
  re = await paypalHelpers.getPaymentLink(req);
  res.json(re);
});

router.get('/buy/help', (req, res) => {
  res.send({
    msg: 'Help thingy, ask me if you need more help',
    req_guide: {
      products: [
        {
          _id: 'ID',
          type: 'PRODUCT SUB TYPE (COLOUR, SIZE, ETC)',
          quantity: 'QUANTITY OF ITEM BEING BOUGHT',
        },
      ],
    },
    res_guide: {
      id: 'ID OF PAYMENT TOKEN',
      link: 'LINK TO PAYPAL CHECKOUT',
    },
  });
});

//# exports
module.exports = router;
