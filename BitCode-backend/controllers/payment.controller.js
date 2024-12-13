import Payment from "../models/payments.model.js";
import User from "../models/user.model.js"; // Ensure you have a User model
import crypto from "crypto";
import md5 from "crypto-js/md5.js";



// Function to update payments table
export const getUserPayments = async (req, res) => {
  try {
    const { userId } = req.params;
    const payments = await Payment.find({ userId });

    if (!payments) {
      return res
        .status(404)
        .json({ message: "No payments found for this user." });
    }

    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching user payments:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Function to get merchant secret
export const getMerchantSecret = async (req, res) => {
  try {
    const merchantSecret = process.env.MERCH_SECRET;
    res.json({ merchantSecret });
  } catch (error) {
    console.error("Error retrieving merchant secret:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// Function to get merchant id
export const getMerchantId = async (req, res) => {
  try {
    const merchantId = process.env.MERCHANT_ID;
    res.json({ merchantId });
  } catch (error) {
    console.error("Error retrieving merchant id:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//Payment notification listening function

export const notifyPayment = async (req, res) => {
  try {
    const {
      merchant_id,
      order_id,
      payment_id,
      payhere_amount,
      payhere_currency,
      status_code,
      md5sig
    } = req.body;

    const merchantSecret = process.env.MERCH_SECRET;


  

    const localMd5sig = md5(
        merchant_id +
          order_id +
          payhere_amount +
          payhere_currency +
          status_code +
          md5(merchantSecret)
            .toString()
            .toUpperCase()
      )
      .toString()
      .toUpperCase();

     

      


    if (localMd5sig !== md5sig) {
      return res.status(400).send("Invalid MD5 signature");
    }

    // Find the user by orderId
    const user = await User.findById(order_id); // Assuming order_id is the user's _id

    if (!user) {
      return res.status(404).send("User not found");
    }

    // Create and save the payment
    const payment = new Payment({
      userId: user._id,
      orderId: order_id,
      paymentId: payment_id,
      status: status_code,
      amount: payhere_amount,
      currency: payhere_currency,
      
    });

    await payment.save();

    

    if (status_code == "2") {
      if (payhere_amount == 1000) {
        user.isMember = "Ordinary";
      }
    }
    if (status_code == "2") {
      if (payhere_amount == 10000) {
        user.isMember = "Life";
      }
    }
    
    await user.save();

    if (status_code == "2") {
      if (payhere_amount == 1000) {
        payment.items = "Ordinary";
      }
    }
    if (status_code == "2") {
      if (payhere_amount == 10000) {
        payment.items = "Life";
      }
    }

    await payment.save();

  

    res.status(200).send("Payment notification received");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error processing payment notification");
  }
};
