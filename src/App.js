import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar.js';
import Home from './pages/home';
import Profile from './pages/profile';

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
