import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Home from './home';
import Profile from './profile';

function App() {
  return (
    <div className="App">
      <Router>

        <Navbar />

        <Switch>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route path='/profile'>
            <Profile />
          </Route>

        </Switch>

      </Router>
    </div>
  );
}

export default App;
