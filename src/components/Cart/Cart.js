import React from 'react';
import './Cart.css'
const Cart = (props) => {
    const cart = props.cart
    console.log(cart)
    // const allTotal = cart.reduce( (total,prd) => total + prd.price ,0)
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = total + product.price
        
    }
let shiping = 0;
if(total>35){
    shiping = 0;
}else if(total > 15){
    shiping = 4.99;
}else if(total > 0) {
    shiping = 12.99;
}
let tax = Math.round(total / 10);

    return (
        <div className="cart">
           
           <h3>  Order summary </h3>
           <h5>items order :{cart.length} </h5>
           <h5>Product Price : $ {total} </h5>
           <p> shiping cost : $ {shiping} </p>
           <p> tax + vat : $ {tax} </p>
            <br/>
           <h3>Total Price : $  {total + shiping + tax} </h3>
        </div>
    );
};

export default Cart;