import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useLocation } from "react-router-dom";

const CheckoutPage = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [productId, setProductId] = useState(null);
  const [amount, setAmount] = useState(0);

  // Extract query params from URL
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const fetchedProductId = queryParams.get("productId");
  const fetchedPrice = queryParams.get("price");

  useEffect(() => {
    if (fetchedProductId && fetchedPrice) {
      setProductId(fetchedProductId);
      setAmount(parseFloat(fetchedPrice));
    }
  }, [fetchedProductId, fetchedPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    const { data } = await axios.post(
      "http://localhost:3000/api/payment/create-payment-intent",
      {
        amount: amount * 100, // Convert amount to cents
        currency: "usd",
      }
    );

    const clientSecret = data.clientSecret;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentIntent } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card: cardElement,
        },
      }
    );

    if (error) {
      setError(`Payment failed: ${error.message}`);
      setProcessing(false);
    } else {
      setError(null);
      setProcessing(false);
      setSucceeded(true);
    }
  };

  return (
    <form
      className="max-w-md min-h-screen p-8 mx-auto mt-10 space-y-6 bg-white rounded-lg shadow-lg"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-center">
        Complete Your Payment
      </h2>
      
        <div className="flex justify-between">Product Price : {`$${fetchedPrice}`}</div>
        <div className="flex justify-between">Product ID : {`${fetchedProductId}`}</div>

      <div className="stripe-card-element">
        <CardElement className="p-4 border border-gray-300 rounded-md shadow-sm" />
      </div>

      <button
        type="submit"
        disabled={!stripe || processing || succeeded}
        className="w-full px-4 py-2 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? "Processing..." : "Pay"}
      </button>

      {error && <div className="text-sm text-center text-red-500">{error}</div>}
      {succeeded && (
        <div className="text-sm text-center text-green-500">
          Payment succeeded!
        </div>
      )}
    </form>
  );
};

export default CheckoutPage;
