const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/tourguide', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// User Schema
const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const User = mongoose.model('User', userSchema);

// Register
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });

    await user.save();
    res.status(201).send('Account created successfully');
  } catch (error) {
    res.status(500).send('Error creating account');
  }
});

// Login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && await bcrypt.compare(password, user.password)) {
      const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
      res.status(200).json({ message: 'Logged in successfully', token });
    } else {
      res.status(400).send('Invalid email or password');
    }
  } catch (error) {
    res.status(500).send('Error logging in');
  }
});

// Forgot Password
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate({ email }, { password: hashedPassword });

    if (user) {
      res.status(200).send('Password reset successfully');
    } else {
      res.status(400).send('Error resetting password');
    }
  } catch (error) {
    res.status(500).send('Error resetting password');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
