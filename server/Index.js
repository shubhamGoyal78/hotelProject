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

// Define a schema for Payment
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
app.post('/api/payment', (req, res) => {
  const paymentData = req.body; 
  console.log('Received payment data:', paymentData);
  const newPayment = new Payment(paymentData);
  newPayment.save()
    .then(item => {
      console.log('Saved payment:', item);
      res.status(200).json(item);
    })
    .catch(err => {
      console.error('Error saving payment:', err);
      res.json({ status: 'error', message: 'Unable to save payment data to the database' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
