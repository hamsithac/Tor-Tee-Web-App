import React,{useState,useEffect} from 'react';
import '../css/main.css';
import Left from './Left';
import Center from './Center';
import Right from './Right';
import { useParams } from 'react-router-dom';
import db from '../firebase';
import Central_Admin from './Central_Admin';
import { selectUser } from '../features/User/userSlice';
import { useSelector, useDispatch } from 'react-redux';
import { selectAdmin } from '../features/User/adminSlice';
import Button from '@material-ui/core/Button';
import Header from './Header';




function Main() {
    const { code } = useParams()
    const [questions,setQuestions]=useState([])
    var lengthq=questions.length 
    const[answers,setAnswers]=useState([])
    const lengtha=answers.length
    const admin_name =useSelector(selectAdmin);
    


    useEffect(() => {
        db.collection("session")
            .doc(code)
            .collection("questions")
            .orderBy("timestamp", "asc")
            .onSnapshot((snapshot) =>
             setQuestions(snapshot.docs.map((doc) => (
              { q_id: doc.id, 
                x: doc.data() 
              })))
          );
    },[lengthq] )

    console.log(questions)

    useEffect(() => {
        db.collection("session")
            .doc(code)
            .collection("answers")
            .orderBy("timestamp", "desc")
            .onSnapshot((snapshot) =>
             setAnswers(snapshot.docs.map((doc) => (
              { a_id: doc.id, 
                answer: doc.data() 
              })))
          );
    },[lengtha] )

    console.log(answers)
    console.log(admin_name)

    return (
      <>
      <Header/>
        <div className="main">
          
            
            <div className="main_left">
            {questions.map(({q_id,x}) => (
          <Left
            user_name={x.name}
            photoURL={x.photoURL}
            question={x.question}
            id={q_id}
            key={q_id}
            code={code}
            
            
           
           />
        ))}
                


            </div>
            <div className="main_center">
              
                 
                  
                    <div>
                      <Center code={code}/>

                    </div>

              
              
                 
            </div>

            <div className="main_right">
            {answers.map(({q_id,answer}) => (
    <Right
      
      question={answer.QUESTION}
    
      code={code}
      answer={answer.ANSWER}
      
      
     
     />
  ))}
                


            </div>
            
        </div>
        </>
    )
}

export default Main
