// const express = require('express');
// const bodyParser = require('body-parser');
// const path = require('path');
// const mongoose = require('mongoose');
// // const bcrypt = require('bcrypt');
// const cors = require('cors');

// // const { Parser } = require('json2csv');
// const connectDB = require('./router/db');
// // const checkout = require('./router/checkout');
// // const detect = require('detect-port');


// const app = express();
// const port = process.env.PORT || 3000;



// // Middleware to parse JSON bodies
// app.use(cors());
// app.use(bodyParser.json());
// app.use(express.static('public'));
// // Middleware to serve static files from 'public' directory
// // app.use(express.static(path.join(__dirname, 'public')));



// // HOME PAGE
// app.get('/', (req, res) => {
//   const filePath = path.join(__dirname, 'public', 'index.html');
//   // console.log(`Serving: ${filePath}`);
//   res.sendFile(filePath);
// });

// // LOGIN PAGE
// app.get('/newLogin', (req, res) => {
//   const filePath = path.join(__dirname, 'public', 'newLogin.html');
//   // console.log(`Serving: ${filePath}`);
//   res.sendFile(filePath);
// });

// // PACKAGE PAGE
// app.get('/package', (req, res) => {
//   const filePath = path.join(__dirname, 'public', 'package.html');
//   // console.log(`Serving: ${filePath}`);
//   res.sendFile(filePath);
// });

// // TRENDING PAGE
// app.get('/trending', (req, res) => {
//   const filePath = path.join(__dirname, 'public', 'trending.html');
//   // console.log(`Serving: ${filePath}`);
//   res.sendFile(filePath);
// });

// app.get('/checkout', (req, res) => {
//   const filePath = path.join(__dirname, 'public', 'payment_checkout.html');
//   // console.log(`Serving: ${filePath}`);
//   res.sendFile(filePath);
// });



// // Connect to MongoDB
// connectDB();

// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

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

const checkinSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  roomType: String,
  checkinDate: Date,
  checkoutDate: Date
});

// Define Model
const Checkin = mongoose.model('Checkin', checkinSchema);


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
