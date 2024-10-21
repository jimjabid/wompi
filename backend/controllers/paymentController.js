// controllers/paymentController.js
import dotenv from "dotenv";
dotenv.config();
import crypto from 'crypto';
import axios from 'axios';

const integritySecret =process.env.WOMPI_INTEGRITY_SECRET; // Set in your .env file
const privateKey =process.env.WOMPI_PRIVATE_KEY; // Set in your .env file



// Controller to generate integrity signature
const getIntegritySignature = (req, res) => {
  const { reference, amountInCents, currency } = req.body;

  // Input validation
  if (!reference || !amountInCents || !currency) {
    return res.status(400).json({ error: 'Missing required fields: reference, amountInCents, currency' });
  }

  // Concatenate values as per Wompi's requirements
  const signatureString = `${reference}${amountInCents}${currency}${integritySecret}`;


  // Generate SHA256 hash
  const integritySignature = crypto
    .createHash('sha256')
    .update(signatureString)
    .digest('hex');

  // Send the signature back to the frontend
  res.json({ integritySignature });
};

// @desc    Fetch transaction Status
// @route   GET api/transaction-status
// @access  Public
const getTransactionStatus = async (req, res) => {
  const transactionId = req.query.id;

  // Input validation
  if (!transactionId) {
    return res.status(400).json({ error: 'Transaction ID is required' });
  }

  try {
    const response = await axios.get(`https://api-sandbox.wompi.co/v1/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${privateKey}`,
      },
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching transaction status:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch transaction status' });
  }
};

// Controller to handle webhook events
const handleWebhook = (req, res) => {
  const event = req.body;

  // Input validation
  if (!event || !event.event || !event.data) {
    return res.status(400).json({ error: 'Invalid webhook data' });
  }

  // Optionally verify the webhook signature here

  // Process the event (e.g., update order status in your database)
  console.log('Received webhook event:', event);

  // Respond to Wompi to acknowledge receipt
  res.sendStatus(200);
};

export { getIntegritySignature, getTransactionStatus, handleWebhook };