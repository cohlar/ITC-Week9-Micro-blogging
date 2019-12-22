import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import firebase from 'firebase/app';
import Navbar from './components/Navbar.js';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  const authListener = function () {
    firebase.auth().onAuthStateChanged((user) => {
      setIsSignedIn(!!user);
      if (user && !localStorage.getItem('savedUsername')) {
        localStorage.setItem('savedUsername', user.displayName);
      }
    });
    return () => setIsSignedIn(false);
  };

  const signOut = function () {
    firebase.auth().signOut()
    .catch(function (error) {
      alert('Sign out error:', error.toString());
    });
  };

  useEffect(authListener, []);

  return (

    <div className="App">
      <Router>

        <Navbar isSignedIn={isSignedIn} signOut={signOut} />

        {!isSignedIn && <Login />}

        {isSignedIn &&
          <Switch>

            <Route exact path='/'>
              <Home />
            </Route>

            <Route path='/profile'>
              <Profile />
            </Route>

          </Switch>
        }

      </Router>
    </div>
  );
}

export default App;
