//# imports
import { Router } from 'express';
import Product from '../models/product';

//# exports
const router = Router();
export default router;

//# get all product ids
router.get('/', async (req, res) => {
  const product_ids: any = await Product.find().select('_id');
  const response: {
    length: number;
    product_ids: { _id: string }[];
  } = { length: product_ids.length, product_ids };
  return res.status(200).json(response);
});

//# get more info on product id
router.post('/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: {
    requestType: 'basic' | 'all';
  } = req.body;
  if (body.requestType == 'basic') {
    const response = await Product.findById(_id).select('_id name price description');
    return res.status(200).json(response);
  } else if (body.requestType == 'all') {
    const response = await Product.findById(_id);
    return res.status(200).json(response);
  }
});

//# create product
router.post('/', async (req, res) => {
  const body: {
    name: string;
    price: number;
    description: string;
    type: string;
  } = req.body;
  const product_new = new Product(body);
  const product_newOut = await product_new.save();
  return res.status(201).json({ _id: product_newOut._id });
});
