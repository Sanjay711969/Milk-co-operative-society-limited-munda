const express = require('express');
const router = express.Router();
const MilkModel = require('../Models/MilkModel');

router.get('/:id', async (req, res) => {
  if (req.params.id) {
    try {
      const milk = await MilkModel.find({ customer: req.params.id }).sort({
        date: 1,
        time: 1,
      });

      res.json(milk);
    } catch (err) {
      res.status(500).send('Server Error');
    }
  }
});

router.post('/', async (req, res) => {
  try {
    const newEntry = new MilkModel(req.body);

    const entry = await newEntry.save();

    res.json(entry);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/contacts/:id
// @desc      Update customer
// @access    public
// @access    public
router.put('/', async (req, res) => {
  // Build contact object
  const { _id, customer, cattle, date, time, quatity, fat, snf, rate, total } =
    req.body;
  const MilkFields = {
    customer,
    cattle,
    date,
    time,
    quatity,
    fat,
    snf,
    rate,
    total,
  };

  try {
    const milkeEntry = await MilkModel.findById(_id);

    if (!milkeEntry) return res.status(404).send('milkeEntry not found');

    const UpdatedMilkeEntry = await MilkModel.findByIdAndUpdate(
      _id,
      { $set: MilkFields },
      { new: true }
    );

    res.json(UpdatedMilkeEntry);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    let milkdata = await MilkModel.find({
      customer: req.params.id,
    });

    // Make sure user owns contact

    await MilkModel.deleteMany({ customer: req.params.id });

    res.json({ msg: 'milkdata removed', data: milkdata });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
