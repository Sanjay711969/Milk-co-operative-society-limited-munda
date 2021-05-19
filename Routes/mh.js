const express = require('express');
const router = express.Router();
const MilkModel = require('../Models/MilkModel');

router.get('/', async (req, res) => {
  try {
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0');
    var yyyy = date.getFullYear();
    var today = yyyy + '-' + mm + '-' + dd;
    const milk = await MilkModel.find({ date: today }).sort({
      date: 1,
      time: 1,
    });

    res.json(milk);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
router.delete('/:from/:to/:id', async (req, res) => {
  if (req.params.id && req.params.from && req.params.to) {
    try {
      let milkdata = await MilkModel.find({
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
      console.log(milkdata);
      if (milkdata.length === 0) return res.json({ msg: 'milkdata not found' });

      await MilkModel.deleteMany({
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

      res.json({ msg: 'milkdata removed', data: milkdata });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
});

module.exports = router;
