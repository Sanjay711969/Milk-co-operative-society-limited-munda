const express = require('express');
const router = express.Router();
const SellsModel = require('../Models/SellsModel');
router.get('/:id', async (req, res) => {
  try {
    const sells = await SellsModel.find({ customer: req.params.id }).sort({
      date: 1,
    });

    res.json(sells);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const newEntry = new SellsModel(req.body);

    const entry = await newEntry.save();

    res.json(entry);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.delete('/:from/:to/:id', async (req, res) => {
  try {
    let sellsdata = await SellsModel.find({
      $and: [
        { customer: req.params.id },
        {
          date: {
            $gte: req.params.from,
            $lte: req.params.to,
          },
        },
      ],
    });

    if (sellsdata.length === 0) return res.json({ msg: 'sellsdata not found' });

    await SellsModel.deleteMany({
      $and: [
        { customer: req.params.id },
        {
          date: {
            $gte: req.params.from,
            $lte: req.params.to,
          },
        },
      ],
    });

    res.json({ msg: 'sellsdata removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
