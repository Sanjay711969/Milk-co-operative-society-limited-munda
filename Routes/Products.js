const express = require('express');
const router = express.Router();
const ProductModel = require('../Models/ProductModel');

router.get('/', async (req, res) => {
  try {
    const products = await ProductModel.find();

    res.json(products);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const products = await ProductModel.find({
      ProductCode: req.body.ProductCode,
    });
    if (!products) {
      res.status(500).send('product alredy  with same Product Code  ');
    } else {
      const newEntry = new ProductModel(req.body);
      const entry = await newEntry.save();

      res.json(entry);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.put('/:id', async (req, res) => {
  const newProductDetail = { ...req.body };

  try {
    const product = await ProductModel.findById(req.params.id);

    if (!product) return res.status(404).json({ msg: 'product  not found' });

    const UpdatedProductDetail = await ProductModel.findByIdAndUpdate(
      req.params.id,
      { $set: newProductDetail },
      { new: true }
    );

    res.json(UpdatedProductDetail);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  console.log('delete ', req.params.id);
  try {
    let product = await ProductModel.findById(req.params.id);

    await ProductModel.findByIdAndRemove(req.params.id);

    res.json({ msg: 'product removed' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
