import Payment from "../models/payments.model.js";
import User from "../models/user.model.js"; // Ensure you have a User model
import crypto from "crypto";
import md5 from "crypto-js/md5.js";



export const createPaymentIntent = async (req, res, next) => {
  try {
    const { amount, currency } = req.body;

    if (!amount || !currency) {
      return res.status(400).json({ error: "Amount and currency are required" });
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
    });

    res.status(200).json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    next(error); // Forward error to the error handler middleware
  }
};
