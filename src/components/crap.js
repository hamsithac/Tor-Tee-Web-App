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


  {answers.map(({q_id,answer}) => (
    <Right
      
      question={answer.QUESTION}
    
      code={code}
      answer={answer.ANSWER}
      
      
     
     />
  ))}
      


  useEffect(() => {
    db.collection("session")
        .doc(code)
        .collection("answers")
        .orderBy("timestamp", "dsc")
        .onSnapshot((snapshot) =>
         setAnswers(snapshot.docs.map((doc) => (
          { a_id: doc.id, 
            answer: doc.data() 
          })))
      );
},[lengtha] )




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