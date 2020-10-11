import React from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import SimpleCardForm from './SimpleCardForm';
const stripePromise = loadStripe('pk_test_51HadCBIZRS1T1nQJK0MJPpbRf7QcbDoM9zuleZGxrJvLJa57E7v5JIWRV4toulnV1XlML61BNXJ9umA8rkqP5v6I00ZkjuqApJ');
const ProcessPayment = ({handlePayment}) => {
    return (
    <div>
          <h2>pay here</h2>
             <Elements stripe={stripePromise}>
       <SimpleCardForm handlePayment={handlePayment}></SimpleCardForm>
                  </Elements>
    </div>
        
    );
};

export default ProcessPayment;