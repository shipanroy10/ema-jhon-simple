import React from 'react';
import './ReviewItem.css'
const ReviewItem = (props) => {
    // console.log(props)
    const {name,quantity,key,price} = props.product;
    return (
        <div className="review-item">
            <h3 className="product-name">product name : {name} </h3>
            <p>quantity : {quantity} </p>
            <p>price : {price} </p>
            <br/>
            <button 
            onClick={ ()=> props.removeHandle(key)}
            className="main-button">remove</button>
        </div>
    );
};

export default ReviewItem;