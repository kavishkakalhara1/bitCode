// routes/payment.route.js
import express from 'express';
import {notifyPayment, getMerchantSecret, getUserPayments, getMerchantId} from '../controllers/payment.controller.js';

const router = express.Router();

router.post('/notify',notifyPayment);
// router.post('/generate-hash', generateHash);
router.get('/get-merchantt-secrett', getMerchantSecret);
router.get('/get-merchantt-idd', getMerchantId);
router.get('/user/:userId', getUserPayments); // New route to fetch user payments

export default router;