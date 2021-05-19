const express = require('express');
const router = express.Router();
const Customer = require('../Models/CustomerModel');

router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find().sort({ name: 1 });

    res.json(customers);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});
router.get('/:_id', async (req, res) => {
  try {
    const customer = await Customer.findById(req.params._id);

    res.json(customer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

router.post('/', async (req, res) => {
  try {
    const customers = await Customer.find({
      mobile_no: req.body.mobile_no,
    });

    if (customers.length > 0) {
      res.status(500).send('Customer Code and Mobile Number Should be Unique');
      return;
    }
    const newCustomer = new Customer(req.body);
    const customer = await newCustomer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route     PUT api/contacts/:id
// @desc      Update customer
// @access    public
router.put('/:id', async (req, res) => {
  // Build contact object

  const { name, mobile_no, customer_type, cow, bufflo, code, fathername } =
    req.body;

  const updatedFields = {
    name,
    mobile_no,
    customer_type,
    cow,
    code,
    fathername,
    bufflo,
  };

  try {
    let customer = await Customer.findById(req.params.id);

    if (!customer) return res.status(404).json({ msg: 'Customer not found' });

    customer = await Customer.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }
    );

    res.json(customer);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/contacts/:id
// @desc      Delete customer
// @access    public
router.delete('/:id', async (req, res) => {
  try {
    let customer = await Customer.findById(req.params.id);

    if (!Customer) return res.status(404).json({ msg: 'Customer not found' });

    await Customer.findByIdAndRemove(req.params.id);

    res.status(200).send('Customer removed');
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
