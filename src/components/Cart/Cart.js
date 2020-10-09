import React from 'react';
import './Cart.css'

const Cart = (props) => {
    const cart = props.cart
   console.log(cart)
    const allTotal = cart.reduce( (total,prd) => total + prd.price ,0)
    let total = 0;
    // for (let i = 0; i < cart.length; i++) {
    //     const product = cart[i];
    //     total = total + product.price * product.quantity ;
        
    // }
    console.log(cart.length)
let shiping = 0;
if(total>35){
    shiping = 0;
}else if(total > 15){
    shiping = 4.99;
}else if(total > 0) {
    shiping = 12.99;
}
let tax = Math.round(allTotal / 10);

    return (
        <div className="cart">
           
           <h3>  Order summary </h3>
           <h5>items order :{cart.length} </h5>
           <h5>Product Price : $ {allTotal} </h5>
           <p> shiping cost : $ {shiping} </p>
           <p> tax + vat : $ {tax} </p>
           <h5>Total Price : $  {allTotal + shiping + tax} </h5>
         {props.children}
        </div>
    );
};

export default Cart;