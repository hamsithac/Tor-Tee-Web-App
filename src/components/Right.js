import React from 'react';
import '../css/left.css';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

function Right({user_name,question,answer,id,code}) {
    return (
        <div className="left">
            <div className="left_box">
                <div className="left_header">
                        <Avatar alt="Remy Sharp" src="https://lh3.googleusercontent.com/DLZyYvAeND4XualoY10jkBcTRCfGiJCgDmyQWDuIMSoDEz4vGqUwPxZJ3OJqT6ZBlnHJkrZAPuvoSsR5O0BWHxCk" />

                <div className="name_header">
                    {user_name}
                </div>

                </div>
                <div className="right_body">
                    <div className="right_body_1">
                        <div style={{fontWeight:'600'}}>
                            Q :
                        </div>

                        <div className='left_question' style={{fontSize:'23px'}}>
                            {question}
                        </div>

                    </div>

                    <div className="right_body_2">
                        <div style={{fontWeight:'600'}}>
                            A :
                        </div>

                        <div className='left_question'>
                            {answer}
                        </div>

                    </div>
                   

                    
                </div>

                <div className="left_footer">
                    <div>

                    </div>
                    <div>
                    <Button color="secondary"></Button>

                    </div>
                    

                </div>

                
            </div>

            
        </div>
    )
}

export default Right
