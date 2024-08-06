// checkout.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// Define the checkout schema
const checkoutSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  address: String,
  address2: String,
  country: String,
  state: String,
  zip: String,
  shippingMethod: String,
  paymentMethod: String,
  totalCost: Number,
});

// Create the Checkout model
const Checkout = mongoose.model('Checkout', checkoutSchema);

// Define the checkout route
router.post('/checkout', async (req, res) => {
  try {
    const checkoutData = new Checkout(req.body.Checkout);
    await checkoutData.save();
    res.status(200).send('Checkout data saved successfully');
  } catch (error) {
    console.error('Error saving checkout data:', error);
    res.status(500).send('Error saving checkout data');
  }
});

module.exports = router;
