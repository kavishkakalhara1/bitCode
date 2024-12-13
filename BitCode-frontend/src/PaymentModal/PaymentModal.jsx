import React from "react";
import md5 from "crypto-js/md5";
import { Button } from "flowbite-react";

const PaymentModal = ({
  orderId,
  amount,
  firstname,
  lastname,
  email,
  items,
  phone,
  agreeTerms,
}) => {
  // const merchantId = import.meta.env.VITE_MERCHANT_ID;

 

  const handlePayment = async () => {
    let currency = "LKR";
    let address = "Sri Lanka";
    let city = "Colombo";
    let country = "Sri Lanka";


    //Retrieving merchant secret from the server
    const secretResponse = await fetch("/api/payment/get-merchantt-secrett");
    const secretData = await secretResponse.json();
    const merchantSecret = secretData.merchantSecret;
    
    //Retrieving merchant id from the server
    const idResponse = await fetch("/api/payment/get-merchantt-idd");
    const idData = await idResponse.json();
    const merchantId = idData.merchantId;
    

    let hashedSecret = md5(merchantSecret).toString().toUpperCase();
    let amountFormatted = parseFloat(amount).toFixed(2).replaceAll(",", "");
    let hash = md5(
      merchantId + orderId + amountFormatted + currency + hashedSecret
    )
      .toString()
      .toUpperCase();

    let form = document.createElement("form");
    form.method = "POST";
    // form.action = "https://sandbox.payhere.lk/pay/checkout";
    form.action = "https://www.payhere.lk/pay/checkout";

    const params = {
      merchant_id: merchantId,
      // return_url: "http://localhost:5173/",
      // cancel_url: "http://localhost:5173/",
      // notify_url: "http://localhost:3000/api/payment/notify",
      return_url: 'https://refaa.lk/',
      cancel_url: 'https://refaa.lk/',
      notify_url: 'https://refaa.lk/api/payment/notify',
      order_id: orderId,
      items: items,
      currency: currency,
      amount: amountFormatted,
      first_name: firstname,
      last_name: lastname,
      email: email,
      phone: phone,
      address: address,
      city: city,
      country: country,
      hash: hash,
    };

    for (const key in params) {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = params[key];
      form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Button
      className="w-full mt-20 bg-refaa-red hover:bg-red-800 hover:shadow-xl ring-0 focus:ring-transparent"
      pill
      onClick={handlePayment}
    >
      Proceed to Pay Rs. {amount}/=
    </Button>
  );
};

export default PaymentModal;
