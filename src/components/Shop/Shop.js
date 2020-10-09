import React, { useState } from 'react';
import './Shop.css';

import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@material-ui/core';

const Shop = () => {


 const [products,setProducts] = useState([])
 const [cart,setCart] = useState([])

 useEffect(()=>{
fetch('https://tranquil-eyrie-60041.herokuapp.com/products')
.then(res=>res.json())
.then(data=>setProducts(data))


 },[])

            useEffect(()=>{
            const savedCart = getDatabaseCart();
            const productKeys = Object.keys(savedCart);
            fetch('https://tranquil-eyrie-60041.herokuapp.com/productsByKey',{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(productKeys)
        
                })
                .then(res=>res.json())
                .then(data=>setCart(data))
            },[])


 const handleAddProduct = (product)=>{
    //  console.log('hey',product)
    const toBeAddedKey = product.key;
     const sameProduct = cart.find(pd => pd.key === toBeAddedKey)
     let count = 1 ;
     let newCart;
            if(sameProduct){
                    count = sameProduct.quantity + 1;
                    sameProduct.quantity = count;
                    const others = cart.filter(pd => pd.key !==toBeAddedKey)
                    newCart = [...others,sameProduct]

            }else{
                product.quantity = 1;
                newCart = [...cart,product]
            }
            setCart(newCart)

            addToDatabaseCart(product.key,count);
  
   
  
     
 }
 document.title = 'Shop'
    return (
        <div className="shop-container">
          
        <div className="product-container">
       {
           products.length === 0 && <CircularProgress />
       }
             {products.map(pd=><Product product={pd}
             key={pd.key}
                    showAddToCart={true}
                handleAddProduct={handleAddProduct}

             >
              
             </Product>)}
          
        </div>
            <div className="cart-container">
               <Cart cart={cart} >

               <Link to="/review"> <button className="main-button">Review Order</button></Link>


               </Cart>
            </div>
        </div>
    );
};

export default Shop;