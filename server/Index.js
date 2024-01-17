  const express = require('express');
  const mongoose = require('mongoose');
  const bodyParser = require('body-parser');
  const cors = require('cors');
  const app = express();
  const port = 5000;
  const Razorpay = require('razorpay');

  app.use(cors());
  app.use(bodyParser.json());

  // Define Payment Schema
  const paymentSchema = new mongoose.Schema({
    selectedRoom: String,
    adults: Number,
    children: Number,
    price: Number,
    userName:String,
    userEmail: String,
    userPhone: String,
    userMessage: String,
    startDate: Date,
    endDate: Date,
  }, { collection: 'payments' });

  const Payment = mongoose.model('Payment', paymentSchema);

  const razorpay = new Razorpay({
    key_id: 'rzp_test_wFFALgHfXOrETo',
    key_secret: 'eFPoYaAC7JBMDTbxmUO2HdVE',
  });

  // Connect to MongoDB
  mongoose.connect('mongodb://localhost:27017/shubham', {})
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('Error connecting to MongoDB', err));

  // Razorpay endpoint
  app.post('/api/razorpay', async (req, res) => {
    try {
      const { amount, currency, receipt, payment_capture } = req.body;

      const options = {
        amount: amount,
        currency: currency,
        receipt: receipt,
        payment_capture: payment_capture,
      };

      const response = await razorpay.orders.create(options);
      res.json(response);
    } catch (err) {
      console.error('Error creating Razorpay order:', err);
      res.status(500).json({ message: 'Error creating Razorpay order' });
    }
  });

  // Endpoint to store booking information in the database
  app.post('/api/booking', async (req, res) => {
    try {
      const {
        selectedRoom,
        adults,
        children,
        price,
        userName,
        userEmail,
        userPhone,
        userMessage,
        startDate,
        endDate,
      } = req.body;

      const newBooking = new Payment({
        selectedRoom,
        adults,
        children,
        price,
        userName,
        userEmail,
        userPhone,
        userMessage,
        startDate,
        endDate,
      });

      await newBooking.save();
      res.status(201).json({ message: 'Booking details stored successfully' });
    } catch (err) {
      console.error('Error storing booking details:', err);
      res.status(500).json({ message: 'Error storing booking details' });
    }
  });


  // Endpoint to fetch booking details
  app.get('/api/bookings', async (req, res) => {
    try {
      const bookings = await Payment.find({});
      res.status(200).json(bookings);
    } catch (err) {
      console.error('Error fetching booking details:', err);
      res.status(500).json({ message: 'Error fetching booking details' });
    }
  });


  // Create a new payment
  app.post('/api/login', async (req, res) => {
    try {
      const { identifier, password } = req.body;
      const user = await User.findOne({ 
        $or: [{ email: identifier }, { mobileNumber: identifier }]
      });

      if (user && user.password === password) {
        res.json({ message: 'Login successful', data: user });
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


  app.get('/api/signup-details', async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json(users);
    } catch (err) {
      console.error('Error fetching users:', err);
      res.status(500).json({ message: 'Error fetching user data' });
    }
  });

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

  // Signup endpoint



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

  app.get('/api/contact-form-details', async (req, res) => {
    try {
      const contactForms = await ContactForm.find({});
      res.status(200).json(contactForms);
    } catch (err) {
      console.error('Error fetching contact forms:', err);
      res.status(500).json({ message: 'Error fetching contact forms' });
    }
  });



  app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });