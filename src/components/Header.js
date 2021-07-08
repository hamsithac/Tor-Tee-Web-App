import React ,{useState,useEffect} from 'react';
import db from "../firebase";
import '../css/header.css';
import {auth, provider} from '../firebase';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import {
    login, logout 
} from '../features/User/userSlice';
import {  useHistory } from "react-router-dom";
import { selectUser } from '../features/User/userSlice';
function Header() {
    const dispatch = useDispatch();
    const Logout=()=>{
        auth.signOut()
        dispatch(logout({
           
      
      }))
        
    }
    const Login=()=>{
        auth
        .signInWithPopup(provider)
        .then((result)=>{  
            const unsubscribe = auth.onAuthStateChanged((authUser) => {
                if (authUser) {
                  // user is logged in...
                  console.log(authUser);
                  dispatch(login({
                      user:authUser
                
                }))
                }
            
                else {
                    
                  
                }
              });     
            
            
            
         
        })
        .catch((error)=>alert(error.message))
    
     
    
      }
      const user =useSelector(selectUser)
      
    return (
        <div className="header">
            <div className="header_name">
                Project H
            </div>
            <div className="header_name">
                {
                    user?(
                        <div>
                            <h3>
                               Hey {user.user?.displayName}

                            </h3>
                            <button className="login_button" onClick={Logout}>Logout</button>
                           
                        </div>

                        
                        

                    ):(
                        <button className="login_button" onClick={Login}>Login with Google</button>

                    )
                }
                
            </div>
            
        </div>
    )
}

export default Header
