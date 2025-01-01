const express = require('express');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
// const Feedback = require('./router/Feedback');

const app = express();
const PORT =process.env.PORT || 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files from the 'public' directory

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tourguide')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// MongoDB schema and model
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
  ccName: String,
  ccNumber: String,
  ccExpiration: String,
  ccCVV: String,
  packageCost: String,
  discount: String,
  totalCost: String
});

const Checkout = mongoose.model('Checkout', checkoutSchema);

// const checkinSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   roomType: String,
//   checkinDate: Date,
//   checkoutDate: Date
// });

// // Define Model
// const Checkin = mongoose.model('Checkin', checkinSchema);

// Define feedback schema and model
const feedbackSchema = new mongoose.Schema({
  navEase: Number,
  bookingProcess: Number,
  paymentOptions: Number,
  customerSupport: Number,
  recommendation: Number,
  packageTour: Number,
  feedbackText: String,
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

// Handle POST request for feedback submission
app.post('/submitFeedback', async (req, res) => {
  const { navEase, bookingProcess, paymentOptions, customerSupport, recommendation, packageTour, feedbackText } = req.body;

  const newFeedback = new Feedback({
      navEase,
      bookingProcess,
      paymentOptions,
      customerSupport,
      recommendation,
      packageTour,
      feedbackText,
  });

  try {
      await newFeedback.save();
      res.status(200).json({ message: 'Feedback submitted successfully' });
  } catch (error) {
      console.error('Error saving feedback:', error);
      res.status(500).json({ error: 'Failed to submit feedback' });
  }
});


// Define a schema for the purchase
const purchaseSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  email: String,
  address: String,
  country: String,
  state: String,
  paymentMethod: String,
  cardName: String,
  cardNumber: String,
  expiration: String,
  cvv: String,
  packageType: String,
  packagePrice: String
});

// Create a model from the schema
const Purchase = mongoose.model('Purchase', purchaseSchema);

// POST endpoint to handle form submission
app.post('/submitPurchase', (req, res) => {
  const purchaseData = new Purchase(req.body);

  purchaseData.save()
      .then(() => {
          res.json({ message: 'Purchase successfully!' });
      })
      .catch(err => {
          res.status(500).json({ error: 'Failed to purchase.. Try again after sone time..' });
          console.error('Error:', err);
      });
});


// Serve the HTML file at the root route
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'checkout.html')); // Adjust the path to your HTML file
// });

// HOME PAGE
app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'index.html');
  // console.log(`Serving: ${filePath}`);
  res.sendFile(filePath);
});

// LOGIN PAGE
app.get('/newLogin', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'newLogin.html');
  // console.log(`Serving: ${filePath}`);
  res.sendFile(filePath);
});

// PACKAGE PAGE
app.get('/package', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'package.html');
  // console.log(`Serving: ${filePath}`);
  res.sendFile(filePath);
});

// TRENDING PAGE
app.get('/trending', (req, res) => {
  const filePath = path.join(__dirname, 'public', 'trending.html');
  // console.log(`Serving: ${filePath}`);
  res.sendFile(filePath);
});

//CHECK OUT 
app.post('/checkout', (req, res) => {
  const checkoutData = new Checkout(req.body);
  
  checkoutData.save()
});

// app.post('/feedback', (req, res) => {
//   const feedbackData = new Feedback(req.body);
  
//   feedbackData.save()
// });
app.post('/checkin', async (req, res) => {
  try {
      const newCheckin = new Checkin(req.body);
      await newCheckin.save();
      res.status(201).json(newCheckin);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});
   
 app.listen(PORT, () => {
   console.log(`Server running at http://localhost:${PORT}`);
 });
