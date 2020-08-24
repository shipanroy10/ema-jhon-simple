import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';
const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""/>
            <nav className="nav">
                <a href="/shop">Shop</a>
                <a href="/order">Order Product</a>
                <a href="/manage">Manage Inventory Here</a>
            </nav>
        </div>
    );
};

export default Header;