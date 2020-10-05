import React, { createContext, useEffect, useState } from 'react';
import './App.css';
import Home from './components/Home/Home';
import Login from './components/Login/Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Events from './components/Events/Events';
import NoMatch from './components/NoMatch/NoMatch';
import Register from './components/Resigter/Register';
import Admin from './components/Admin/Admin';
import AddEvent from './components/AddEvent/AddEvent';


export const userContext = createContext()

function App() {
  const [events, setEvents] = useState([])
  const [joinEvent, setJoinEvent] = useState([])
  const [loginUser, setLoginUser] = useState({
    isSignIn: false,
    email: "",
    name: "",
    error: ""
  })
  useEffect(() => {
    fetch('https://enigmatic-meadow-20556.herokuapp.com/events')
    .then(res => res.json())
    .then(data => setEvents(data))
  },[])

  return (
    <userContext.Provider 
    value={{user:[loginUser,setLoginUser], 
            allEvents:[events, setEvents], 
            join:[joinEvent, setJoinEvent] 
            }}>

      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>

          <Route path="/login">
            <Login></Login>
          </Route>

          <PrivateRoute path="/Register/:eventId">
            <Register></Register>
          </PrivateRoute>

          <PrivateRoute path="/admin">
            <Admin></Admin>
          </PrivateRoute>

          <Route path="/events">
            <Events></Events>
          </Route>
          <Route exact path="/">
            <Home></Home>
          </Route>
          <Route path="*">
            <NoMatch></NoMatch>
          </Route>
        </Switch>
      </Router>
    </userContext.Provider>
  );
}

export default App;
