import React from 'react';

import './Inventory.css'
const Inventory = () => {

const product = {};
const handleAddProduct = ()=>{
    fetch('https://tranquil-eyrie-60041.herokuapp.com/addProduct',{
        method: 'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(product)
    })
}
document.title = 'Inventory'

    return (
        <div>


            <form action="">
            <p><span></span>Name:<input type="text"/></p>
            <p><span></span>Price:<input type="text"/></p>
            <p><span></span>Quantity:<input type="text"/></p>
            <p><span>Upload Image:</span><input type="file"/></p>
            <button onClick={handleAddProduct}>add product</button>

            </form>
        </div>
    );
};

export default Inventory;