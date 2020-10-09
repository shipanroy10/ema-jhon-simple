import React from 'react';
import './Review.css'
import { useState } from 'react';
import { useEffect } from 'react';
import { getDatabaseCart, removeFromDatabaseCart, handleProceedCheckout } from '../../utilities/databaseManager';

import ReviewItem from '../ReviewItems/ReviewItem';
import Cart from '../Cart/Cart';

import { useHistory } from 'react-router-dom';
const Review = () => {
    const [cart,setCart] = useState([])

// const [placeOrder,setPlaceOrder] = useState(false)

const history = useHistory()
const handleProceedCheckout= ()=>{
history.push('/shipment');

  }


const removeHandle = (productKey)=>{

console.log('click remove',productKey)
const newCart = cart.filter(pd => pd.key !== productKey)
setCart(newCart)
removeFromDatabaseCart(productKey)
}

    useEffect( ()=> {
                //cart
                const savedCart = getDatabaseCart();
                const productKeys = Object.keys(savedCart)

        fetch('https://tranquil-eyrie-60041.herokuapp.com/productsByKey',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(productKeys)

        })
        .then(res=>res.json())
        .then(data=>setCart(data))

             
    } ,[]);

    // let thankYou;
    //     if (placeOrder) {
    //         thankYou = <img src={happyImage} alt=""/>
    //     }
    
document.title = 'order review'
    return (
        <div className="shop-container">
            
        <div className="product-container">
        {
              cart.map(pd =>   <ReviewItem key={pd.key} product={pd}
              
                removeHandle={removeHandle}
              
              
              ></ReviewItem>)
          }
          {/* {
              thankYou
          } */}
        </div>
        <div className="cart-container">
            {console.log(cart)}
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-button">proceed checkout</button>

                </Cart>

        </div>
        </div>
    );
};

export default Review;