//# imports
import { Router } from 'express';
import Product from '../models/product';

//# exports
const router = Router();
export default router;

//# get all product ids
router.post('/', async (req, res) => {
  //TODO implement filter
  const product_ids: any = await Product.find().select('_id');
  const _ids = product_ids.map((x: { _id: string }) => x._id);
  const response: {
    length: number;
    _ids: string[];
  } = { length: product_ids.length, _ids };
  return res.status(200).json(response);
});

//# get more info on product id
router.post('/get/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: {
    getInfo: 'basic' | 'all';
  } = req.body;
  if (body.getInfo == 'basic') {
    const response = await Product.findById(_id).select('_id name price description');
    return res.status(200).json(response);
  } else if (body.getInfo == 'all') {
    const response = await Product.findById(_id);
    return res.status(200).json(response);
  }
});

//# create product
router.post('/create', async (req, res) => {
  const body: {
    name: string;
    price: number;
    description: string;
    tags: string[];
  } = req.body;
  const product_new = new Product(body);
  const product_newOut = await product_new.save();
  return res.status(201).json({ _id: product_newOut._id });
});

//# edit product
router.patch('/patch/:_id', async (req, res) => {
  const _id: string = req.params._id;
  const body: {
    name?: string;
    price?: number;
    description?: string;
    type?: string;
  } = req.body;
  console.log(body);

  await Product.updateOne({ _id }, body);
  return res.status(200).json();
});
