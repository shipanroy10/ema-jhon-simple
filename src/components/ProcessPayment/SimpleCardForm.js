import React from 'react';
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js';
import { useState } from 'react';

const SimpleCardForm = ({handlePayment}) => {
  const stripe = useStripe();
  const elements = useElements();
const [paymentErr,setPaymentErr] = useState(null);
const [paymentSuccess,setPaymentSuccess] = useState(null);
  const handleSubmit = async (event) => {
    // Block native form submission.
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const {error, paymentMethod} = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      setPaymentErr(error.message)
      setPaymentSuccess(null)
    } else {
    setPaymentSuccess(paymentMethod.id)
    setPaymentErr(null)
    handlePayment(paymentMethod.id)
    }
  };

  return (
   <div>
        <form onSubmit={handleSubmit}>
      <CardElement />
      <br/>
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  <p style={{color:'red'}}>{paymentErr}</p>
  {
      paymentSuccess && <p style={{color:'green'}}>your payment was successful</p>
  }
   </div>
  );
};
export default SimpleCardForm;