import React, { Component } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'

import Login from './components/Login'
import Dashboard from './components/Dashboard'
import TopNav from './components/TopNav'
import CheckAuth from './components/CheckAuth'

export class App extends Component {

  render() {
    return (
      <Router>
        <div>
          <TopNav />

          <Route exact path="/" component={Login}/>
          <Route path="/dashboard" component={Dashboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
