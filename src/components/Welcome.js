import React,{useState,useEffect} from 'react';
import '../css/welcome.css';
import Header from './Header';
import Button from '@material-ui/core/Button';
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
import { selectAdmins } from '../features/User/admins_slice';
import {
    adminOn,adminOff
} from '../features/User/adminSlice';
import {
    push_admins
} from '../features/User/admins_slice';
import { selectAdmin } from '../features/User/adminSlice';
function Welcome() {

    const dispatch = useDispatch();
    var emails={

    }

    const[code,setCode]=useState('');
    const[Codes,setCodes]=useState([]);
    const[ids,setIds]=useState([]);
    const user =useSelector(selectUser);
    let history = useHistory();
    const list =useSelector(selectAdmins)
    const[name,setName]=useState('');
    var lengthq=Codes.length
    

    useEffect(() => {
        //This is where the code runs
        db.collection('session').onSnapshot(snapshot =>{
          //Whenever a new session comes this section refershes 
          setCodes(snapshot.docs.map(doc => ({
            id: doc.id,
            code: doc.data()
            
          })));

          dispatch(push_admins({
              emails
           
      
      }))
          
         

        })

        

      }, [lengthq]);

    
    console.log(list['emails'])
    console.log(names)
    var names=[];
  

      for (var i = 0; i < Codes.length; i++) {
         names.push(Codes[i].code.name)
         emails[ Codes[i].id]=Codes[i].code.name

      }

      

    


    var listofadmins=list['emails']

    
    var IDs=[];

    for (var i = 0; i < Codes.length; i++) {
       IDs.push(Codes[i].id)
    }
    var available=false;

      const sendcode=e=>{
             e.preventDefault();

             if(code in listofadmins){
                 var adminname=listofadmins[code]

                 available=true

                     dispatch(adminOn({
                         admin:adminname
                     
                
                }))

                 




             }
             else{
                 alert('Please check your code')

             }

             


        
        
        
        
                 
        if(available===true){
            history.push(`/${code}`);    
         }else{             
            alert("Please check your code!");
         }
        
    }


    return (

        <>

        <div>
            <Header/>
        </div>
        <div className="welcome"> 
            <div className="welcome_page">
            <div className="title">
             
            </div>
            <br/>
            <br/>

            <div classname="code_part">
                {
                    user?(
                        <>
                        <input className="welcome_textarea" onChange ={e=>setCode(e.target.value)} value={code} placeholder="Enter code"/> 
                            <center>

                            <Button variant="contained" 
                            style={{marginLeft:'20px'}} onClick={sendcode}
                            > Submit ! </Button>   

                            <Link to="/admin">
                    <h3>Click here to create a session</h3>

                </Link> 

                            </center>
                        </>
                    ):(
                        <>
                        <input className="welcome_textarea" onChange ={e=>setCode(e.target.value)} value={code} disabled={true} placeholder="Login to enter code"/> 
                        </>

                        
                        

                    )

                   
                    
                } 
                
                 
                    
                
               


                

                


               
                <br/>
            <br/>          
            
            </div>  
            <br/>
            <br/>  
            
            <div className="admin_link" style={{marginTop:'20px', fontSize:'20px'}}>
                
              

                

             

              <br>
              </br>
              <br>
              </br>

            </div>  
            

           
        </div>
            
        </div>
        </>
    )
}

export default Welcome
