import React,{useState,useEffect} from 'react';
import '../css/admin.css';
import { selectUser } from '../features/User/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";
import db from '../firebase';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import {
    adminOn,adminOff
} from '../features/User/adminSlice';
import {
    push_admins
} from '../features/User/admins_slice';


function Admin() {
    const user =useSelector(selectUser);
    let history = useHistory();
    const dispatch = useDispatch();
    const[name,setName]=useState('');
    const[Codes,setCodes]=useState([]);
    var emails={

    }

    var lengthc=Codes.length

    console.log(names)

    console.log(Codes)


    const startsession=e=>{
        e.preventDefault();
        db.collection('session').add({
          name:user.user?.email
        })  
      }

    
      useEffect(() => {
        //This is where the code runs
        db.collection('session').onSnapshot(snapshot =>{
          //Whenever a new session comes this section refershes 
          setCodes(snapshot.docs.map(doc => ({
            id: doc.id,
            code: doc.data()
            
          })));
        })
      }, [lengthc]);

      console.log(Codes)


    var names=[];

      for (var i = 0; i < Codes.length; i++) {
         names.push(Codes[i].code.name)
         emails[ Codes[i].id]=Codes[i].code.name
      }      

      var id=0;

      for (var i = 0; i < Codes.length; i++) {
        if(Codes[i].code.name === user.user?.email){
               id=Codes[i].id;
               dispatch(adminOn({
               admin:user.user?.email          
          }))
        }
      }
    return (
        <div className="Admin">
            {
                    user?(                        
                            id!=0 ? (
                                <center>
                                <Button variant="contained"  disabled={true}>Your session is  active</Button>

                                <div style={{marginTop:'20px',marginBottom:'40PX'}}>
                                YOUR CODE IS : <span style={{fontWeight:'700'}}>{id}</span>

                                </div>
                                <Link to={`/${id}`}>
                                <Button color="secondary"  >Click here to go to your session</Button>

                                </Link>
                                </center>
                              
                            ): 
                            (
                                <center>
                                <button className="admin_button" onClick={startsession}>Click here to get the code for the session.</button>
                                <br/>
                    
                                {
                                id === 0 ? (
                                    <>
                                    
                                    </>
                                ):(
                                <div style={{marginTop:'20px'}}>
                                YOUR CODE IS : <span style={{fontWeight:'700'}}>{id}</span>
                                <Button color="secondary" >Click here to go to your session</Button>
                                    
                                </div>

                                )
                                }
                          </center>
              
                            )
             
                    ):(
                        <div>
                            <center className="pls_login">
                            Please login to create a session

                            </center>
                           
                        </div>

                    )
            }
        
        </div>
    )
}

export default Admin
