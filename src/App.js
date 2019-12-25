import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import firebase from 'firebase/app';
import './App.css';
import { setUserInFirestore } from './lib/firebase.js';
import AppContext from './contexts/AppContext.js';
import Navbar from './components/Navbar.js';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);
  const [isAuthCompleted, setIsAuthCompleted] = useState(false);

  const authListener = function () {
    const unsuscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUserInFirestore(user);
      }
      setUser(user);
      setIsAuthCompleted(true);
    });
    return () => unsuscribe();
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
      {isAuthCompleted &&
        <Router>

          <Navbar isSignedIn={!!user} signOut={signOut} />

          {!user && <Login />}

          {user &&
            <Switch>

              <Route exact path='/'>
                <Home />
              </Route>

              <Route path='/profile'>
                <AppContext.Provider value={{ user: user, setUser: setUser }}>
                  <Profile />
                </AppContext.Provider>
              </Route>

            </Switch>
          }

        </Router>
      }
    </div>
  );
}

export default App;
