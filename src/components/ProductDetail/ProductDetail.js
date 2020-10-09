import React from 'react';
import './ProductDetail.css'
import { useParams } from 'react-router-dom';

import Product from '../Product/Product';
import { useEffect } from 'react';
import { useState } from 'react';
const ProductDetail = () => {
const {productKey} = useParams()
const [product,setProduct]= useState({});
useEffect(()=>{
fetch(`https://tranquil-eyrie-60041.herokuapp.com/product/`+productKey)
.then(res=>res.json())
.then(data=>setProduct(data))


},[productKey])
// const product =fakeData.find(pd => pd.key === productKey)
console.log(product)
document.title = 'Product Detail'
    return (
        <div>
            {/* <h3> {productKey} is coming soooon</h3> */}
            <h2>product detail is .</h2>
            <Product 
            showAddToCart={false}
            product={product}></Product>
        </div>
    );
};

export default ProductDetail;