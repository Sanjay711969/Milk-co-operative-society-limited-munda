const express = require('express');
const router = express.Router();

const RateModle = require('../Models/RateModel');
router.get('/', async (req, res) => {
  try {
    const rateTable = await RateModle.find();
    res.json(rateTable);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:fat/:snf', async (req, res) => {
  try {
    const rate = await RateModle.find({
      snf: req.params.snf,
      fat: req.params.fat,
    });
    res.json(rate);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.post('/', async (req, res) => {
  try {
    const newEntry = new RateModle(req.body);
    const oldentry = await RateModle.find({
      snf: req.body.snf,
      fat: req.body.fat,
    });
    if (oldentry.length === 0) {
      const entry = await newEntry.save();

      res.json(entry);
    } else {
      const updateRate = await RateModle.findByIdAndUpdate(
        oldentry[0]._id,
        { $set: req.body },
        { new: true }
      );

      res.json(updateRate);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
