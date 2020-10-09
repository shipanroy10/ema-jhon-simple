import React from 'react';

import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Review from './components/Review/Review';
import Inventory from './components/Inventory/Inventory';
import NotFound from './components/NotFound/NotFound';
import ProductDetail from './components/ProductDetail/ProductDetail';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import { createContext } from 'react';
import { useState } from 'react';
import Private from './components/Private/Private';
import PrivateRoute from './components/Private/Private';
export const userContext = createContext();
function App() {
const [loggedInUser,setLoggedInUser] = useState({})

  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser]}>
      <h2>email : {loggedInUser.email} </h2>
          
        
     <Router>
     <Header></Header>
        <Switch>
            <Route path="/shop">
              <Shop></Shop>
               </Route>
                 <Route path="/review">
                <Review></Review>
            </Route>
            <Private path="/inventory">
            <Inventory></Inventory>
        </Private>
        <Route path="/login">
           <Login></Login>
        </Route>
        <Private path="/shipment">
            <Shipment></Shipment>
        </Private>
        <Route exact path="/">
        <Shop></Shop>
        </Route>
        <Route path="/product/:productKey">
          <ProductDetail></ProductDetail>
        </Route>
        <Route path="*">
        <NotFound></NotFound>
        </Route>
        </Switch>
     </Router>
 
    
    </userContext.Provider>
  );
}

export default App;
