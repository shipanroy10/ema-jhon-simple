import React, { useState } from 'react';


import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebaseConfig';
import { useContext } from 'react';
import { userContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);


function Login() {

  const provider = new firebase.auth.GoogleAuthProvider();
  const [newUser,setNewUser] = useState(false)
const [user,setUser]= useState({
isSignedIn: false,
name : '',
photo : '',
email: '',
password : '',

})

const [loggedInUser,setLoggedInUser] = useContext(userContext);

const history = useHistory();
const location = useLocation();
let { from } = location.state || { from: { pathname: "/" } };

const handleSignIn = () =>{
 firebase.auth().signInWithPopup(provider)
 .then(res =>{
   const {displayName,photoURL,email} = res.user;

const signedInUser = {
  isSignedIn : true,
  name : displayName,
  photo : photoURL,
  email : email
};
fireToken()
setUser(signedInUser)
setLoggedInUser(signedInUser)
history.replace(from);

console.log(displayName,email,photoURL)
 })
 .catch(err => {
   console.log(err);
   console.log(err.message)
 })
}

const handleSignOut = ()=>{
  firebase.auth().signOut()
  .then(res =>{
const signedOutUser = {
  isSignedIn : false,
  name: '',
  photo : '',
  email : '',
  error : '',
  success : false,
}
setUser(signedOutUser)
  })
  .catch (err =>{

  })
}
const handleBlur = (e)=>{
  let isFieldValid = true;
// console.log(e.target.name,e.target.value)
if(e.target.name === 'email'){
  isFieldValid= /\S+@\S+\.\S+/.test(e.target.value)

}
if(e.target.name === 'password'){
const isPasswordValid = e.target.value.length > 6 ;
const passwordCheck =  /\d{1}/.test(e.target.value) 

isFieldValid = isPasswordValid && passwordCheck;
}
if(isFieldValid){
const newUserInfo = {...user}
newUserInfo[e.target.name] = e.target.value;
setUser(newUserInfo)
}

}
const handleSubmit = (e)=>{
  console.log(user.email,user.password)
  if( newUser && user.email && user.password){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
    .then(res =>{
      const newUserInfo = {...user}
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo)
      updateUserName(user.name)
      setLoggedInUser(newUserInfo)
      history.replace(from);
      // console.log(res)
    })
    .catch(error => {
      // Handle Errors here.
      // var errorCode = error.code;
    
      // var errorMessage = error.message;
      // ...
      const newUserInfo = {...user}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo)
     
    });
  }
  if(!newUser && user.email && user.password){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password)
    .then(res =>{
      const newUserInfo = {...user}
      newUserInfo.error = '';
      newUserInfo.success = true;
      setUser(newUserInfo);
      setLoggedInUser(newUserInfo)
      history.replace(from);
      console.log('sign in user',res.user)
    })
    
    .catch(error=> {
      // Handle Errors here.
    
      const newUserInfo = {...user}
      newUserInfo.error = error.message;
      newUserInfo.success = false;
      setUser(newUserInfo)
    });
  }
 e.preventDefault() 
}

const updateUserName = name =>{
  const user = firebase.auth().currentUser;

  user.updateProfile({
    displayName: name
   
  }).then(function() {
    console.log('user name update successfully')
  }).catch(error => {
    console.log(error)

  });
}
document.title = 'Login';
const fireToken = ()=>{
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    sessionStorage.setItem('token',idToken)
 
  }).catch(function(error) {
    // Handle error
  });
}
  return (
    <div style={{textAlign : 'center'}}>
      { user.isSignedIn ?
     <button onClick={handleSignOut}>sign out</button> : 
     <button onClick={handleSignIn}>sign in</button>

      }
     {
       user.isSignedIn && 
       <div>
       
       <p>  welcome, {user.name} </p>
        <h6> {user.email}  </h6>
        <img src={user.photo} alt=""/>

       </div>
     }

     <h2>our own authentication</h2>
  
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser"> New User Sign Up</label>
     <form onSubmit={handleSubmit}>
  {newUser &&    <input type="text" name="name" onBlur={handleBlur} placeholder="enter your name"/> }
     <br/>
     <input type="text" name="email" onBlur={handleBlur} placeholder="enter your email" required  />
     <br/>
     <input type="password" onBlur={handleBlur} name="password" id="" placeholder= "your password" required />
     <br/>
   <input type="submit" value={newUser ? 'sign up' : 'sign in'}/>

     </form>
     <p  style={{color :'red'}}>  {user.error} </p>
{
    
     user.success &&  <p  style={{color :'green'}}>  the user  {newUser ? 'created' : 'logged In'} successfully </p>
}
    </div>
  );
}

export default Login;
