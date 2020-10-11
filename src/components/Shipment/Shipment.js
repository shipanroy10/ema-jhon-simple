import React, { useContext } from 'react';
import { useState } from 'react';
import { useForm } from "react-hook-form";
import { userContext } from '../../App';
import { getDatabaseCart, processOrder } from '../../utilities/databaseManager';
import ProcessPayment from '../ProcessPayment/ProcessPayment';
import './Shipment.css'
const Shipment = () => {
    const { register, handleSubmit, watch, errors } = useForm();
    const [loggedInUser,setLoggedInUser] = useContext(userContext);
    const [shipmentData,setShipmentData]= useState(null);
  const onSubmit = data => {
    setShipmentData(data)
   
};
const handlePaymentSuccess = paymentId =>{
  const savedCart = getDatabaseCart();
  const orderDetails = {...loggedInUser,
    products:savedCart,
    paymentId,
    shipment:shipmentData,
    time:new Date()}
fetch('https://tranquil-eyrie-60041.herokuapp.com/addOrder',{
method:'POST',
headers:{'Content-Type':'application/json'},
body:JSON.stringify(orderDetails)
}).then(res=>res.json())
.then(data=>{
if(data){
  processOrder()
  alert('your order is successful')
}
})
}

  console.log(watch("example")); // watch input value by passing the name of it

  return (
 <div className="container">
 <div className="row">
    <div style={{display: shipmentData ? 'none' : 'block'}}className="col-md-6">


    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
 

      <input name="name" defaultValue={loggedInUser.name} placeholder="your name" ref={register({ required: true })  } />
      {errors.name && <span className="error">This name is required</span>}

      <input name="address" placeholder="your address" ref={register({ required: true })} />
      {errors.address && <span className="error">This address is required</span>}

      <input name="email" defaultValue={loggedInUser.email} placeholder="your email" ref={register({ required: true })} />
      {errors.email && <span className="error">This email is required</span>}

      <input name="phone"  placeholder="your phone" ref={register({ required: true })} />
      {errors.phone && <span className="error">This phone is required</span>}
      
      <input type="submit" />
    </form>

    </div>
    <div style={{display: shipmentData ? 'block' : 'none'}} className="col-md-6">

      <ProcessPayment handlePayment={handlePaymentSuccess}></ProcessPayment>
    </div>
  </div>
 </div>
  );
};

export default Shipment;