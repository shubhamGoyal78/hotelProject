const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/shubham', {})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('Error connecting to MongoDB', err));

// Define schema for Payment
const paymentSchema = new mongoose.Schema({
  userName: String,
  selectedRoom: String,
 
  adults: Number,
  children: Number,
  price: Number,
  userEmail: String,
  userPhone: String,
  userMessage: String,
  bookingId : String,
  startDate: Date,
  endDate: Date,
}, { collection: 'payments' });

const Payment = mongoose.model('Payment', paymentSchema);

// Create a new payment
app.post('/api/login', async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const user = await User.findOne({ 
      $or: [{ email: identifier }, { mobileNumber: identifier }]
    });

    if (user && user.password === password) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid username or password' });
    }
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});


const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  mobileNumber: String,
}, { collection: 'users' });

const User = mongoose.model('User', userSchema);

// Signup endpoint
app.post('/api/signup', async (req, res) => {
  try {
    const { name, email, password, mobileNumber } = req.body;
    const newUser = new User({ name, email, password, mobileNumber });
    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    console.error('Error in signup:', err);
    res.status(500).json({ message: 'Error registering new user' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && user.password === password) {
      // Implement token generation or session management as needed
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error in login:', err);
    res.status(500).json({ message: 'Error logging in' });
  }
});

// Contact form schema
const contactFormSchema = new mongoose.Schema({
  name: String,
  message: String,
  email: String,
  phone: String,
}, { collection: 'contactForms' });

const ContactForm = mongoose.model('ContactForm', contactFormSchema);
app.post('/api/contact', async (req, res) => {
  try {
    const newContactForm = new ContactForm(req.body);
    await newContactForm.save();
    res.status(201).json({ message: 'Form submitted successfully' });
  } catch (err) {
    console.error('Error in form submission:', err);
    res.status(500).json({ message: 'Error submitting form' });
  }
});
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});