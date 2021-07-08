import React from 'react';
import logo from './logo.svg';

import './App.css';
import Welcome from './components/Welcome'
import Main from './components/Main';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Admin from './components/Admin';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from './features/User/userSlice';

function App() {
  const user =useSelector(selectUser);
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <Welcome/>
          </Route>
          {
            user==null?(
              <>
              </>

            ):(
              <>
              <Route path="/admin">
                <Admin/>
              </Route>
              <Route path="/:code">
                <Main/>
              </Route>

              </>
              

            )

          }
          
          

        </Switch>
      </Router>
      

      
    
    </div>
  );
}
export default App;
