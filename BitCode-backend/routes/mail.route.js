import express from 'express';
import { sendEmail } from '../controllers/mail.controller.js';


const router = express.Router();

router.post('/mail2all', sendEmail);

export default router;