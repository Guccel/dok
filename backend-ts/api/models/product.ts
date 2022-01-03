//# imports
import { model, Schema } from 'mongoose';

//# schema
const productSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, default: '' },
    tags: { type: Array, default: [] },
    options: { type: Array, default: [] },
  },
  {
    timestamps: true,
  }
);

//# exports
const Product = model('Product', productSchema);
export default Product;
