import React,{useState,useEffect} from 'react';
import '../css/center.css';
import Button from '@material-ui/core/Button';
import { selectUser } from '../features/User/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import db from '../firebase';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';


import { selectAdmin } from '../features/User/adminSlice';
import { useHistory } from "react-router-dom";

function Center() {
    let history = useHistory();
    const user =useSelector(selectUser);
    const[question,setQuestion]=useState('');
    const[ANSWER,SETANSWER]=useState('');

    const[qns,setQuestions]=useState([]);

    const lengthofq=qns.length
    const admin_name =useSelector(selectAdmin);
    
    const user_email=user.user?.email;
    const [answer,setAnswer]=useState('');

  const { code } = useParams()
    const askquestion=e=>{
        e.preventDefault();
        
        db.collection("session")
            .doc(code)
            .collection("questions").
            add({
              name:user.user?.displayName,
              photoURL:user.user?.photoURL,
              question:question,
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
       
    
        setQuestion('')
        
        
      }

      console.log(code)

      

      


      useEffect(() => {
        db.collection("session")
            .doc(code)
            .collection("middle")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
             setQuestions(snapshot.docs.map((doc) => (
              { q_id: doc.id, 
                q_question: doc.data() 
              })))
          );
    },[lengthofq] )


  
        const sendanswer=e=>{
            e.preventDefault();
            
            db.collection("session")
                .doc(code)
                .collection("answers").
                add({
                  QUESTION:qns[0].q_question.atoq,
                  ANSWER:ANSWER,
                  timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                })
            console.log('button clicked')
        
            SETANSWER('')

            
            
            
          }

    const delete_section=()=>{
        db.collection('session').doc(code).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        history.push('/')


        

    }


    

    
    
    

    
  
    
    return (
        <div className="center">
            {
                admin_name['admin']!=null?(
                    <>
                    {
  user_email==admin_name['admin']?(
      <div className="central_admin">
<div className="center">

<div className="center_question" style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
<div style={{fontSize:'20px'}}>
Q :
</div>
<div style={{fontWeight:'700',fontSize:'25px',marginLeft:'20px'}}>
{
    qns==0?(
        <h3>Choose a question</h3>
    )
     

    :(
        qns[0].q_question.atoq


    )
}


</div>


</div>
<textarea className="text_area_answer" onChange ={e=>SETANSWER(e.target.value)} value={ANSWER} placeholder="Enter your answer">

</textarea>
<div>
<div className="center_footer">



<div>


</div>

<div>
{
  qns.length!=0?(
      <>
      <Button variant="outlined" onClick={sendanswer} >POST</Button>
      </>
  ):(
      <>
      </>
  )
}




</div>
</div>


</div>
<center style={{marginTop:'30px'}}>
<Button variant="outlined" color="secondary" onClick={delete_section}>
  Delete
</Button>

</center>


</div>


</div>

  ):(
      <>
      <textarea className="text_area" onChange ={e=>setQuestion(e.target.value)} value={question} placeholder="Enter your question">

</textarea>
<div>
<div className="center_footer">
<div>


</div>

<div>
   
<Button variant="outlined"  onClick={askquestion}>POST</Button>

</div>

<div>

</div>
</div>


</div>
    
      </>


  )
}
                   
                    </>

                ):(
                    <>
                    hellooo
                    </>
                )

            }
        </div>
    )
}

export default Center
