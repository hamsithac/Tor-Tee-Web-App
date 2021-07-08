import React from 'react';
import '../css/left.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { selectUser } from '../features/User/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmin } from '../features/User/adminSlice';
import db from '../firebase';
import firebase from 'firebase';
function Left({user_name,photoURL,question,id,code}) {

    const admin_name =useSelector(selectAdmin);
    const user=useSelector(selectUser)
    const user_email=user.user?.email
    console.log(user_email)
    

    const answer=()=>{
        
        db.collection("session")
        .doc(code)
        .collection("middle").
        add({
         
          atoq:question,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         
        })
    console.log('button clicked')

    db.collection("session").doc(code).collection("questions").doc(id).delete().then(() => {
        console.log("Document successfully deleted!");
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    }

    

  
   
    return (
        <div className="left">
            <div className="left_box">
                <div className="left_header">
                <   Avatar alt="Remy Sharp" src={photoURL} />

                <div className="name_header">
                    {user_name}
                </div>

                </div>
                <div className="left_body">
                    <div style={{fontWeight:'600'}}>
                        Q :
                    </div>

                    <div className='left_question'>
                    {question}
                    </div>
                </div>

                <div className="left_footer">
                    <div>

                    </div>
                    <div>
                        {
                            user_email==admin_name['admin']?(
                                <>
                                <Button color="secondary" onClick={answer}>Answer</Button>
                                </>

                            ):(
                                <>
                              
                                </>


                            )
                        }
                    

                    </div>
                    

                </div>

                
            </div>

            
        </div>
    )
}

export default Left
