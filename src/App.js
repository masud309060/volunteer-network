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
import RegisterList from './components/RegisterList/RegisterList';
import Register from './components/Resigter/Register';


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
    fetch('http://localhost:5000/events')
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
            <RegisterList></RegisterList>
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
