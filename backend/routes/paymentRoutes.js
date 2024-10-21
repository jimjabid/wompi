import express from "express";
const router = express.Router();
import {
  getIntegritySignature,
  getTransactionStatus,
  handleWebhook,
} from "../controllers/paymentController.js";

// Route to generate the integrity signature
router.post("/integrity-signature", getIntegritySignature);

// Route to get the transaction status
router.get("/transaction-status", getTransactionStatus);

// Route to handle webhooks from Wompi
router.post("/webhook", handleWebhook);

export default router;
