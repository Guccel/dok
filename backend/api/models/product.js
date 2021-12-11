//# imports
const mongoose = require('mongoose');

//# schema
const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  price: { type: Number, required: true },
  type: { type: Number, default: 0 },
});

//# exports
module.exports = mongoose.model('Product', productSchema);
