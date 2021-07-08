import React,{useState} from 'react';
import '../css/center.css';
import Button from '@material-ui/core/Button';
import { selectUser } from '../features/User/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';

function Central_Admin() {
    const [answer,setAnswer]=useState('')
    return (
        <div className="central_admin">
            <div className="center">

            <div className="center_question" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
                      <div style={{fontSize:'20px'}}>
                          Q :
                      </div>
                      <div style={{fontWeight:'700',fontSize:'25px',marginLeft:'20px'}}>
                      Wassup Preetham

                      </div>
                        

            </div>
            <textarea className="text_area_answer" onChange ={e=>setAnswer(e.target.value)} value={answer} placeholder="Enter your answer">

            </textarea>
            <div>
                <div className="center_footer">
                    

                    <div>
                        

                    </div>

                    <div>
                    <Button variant="outlined" >POST</Button>

                    </div>
                </div>
            
           
            </div>
            
        </div>
            
        </div>
    )
}

export default Central_Admin;
