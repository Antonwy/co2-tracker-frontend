import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import LoginComponent from './Components/LoginComponent';
import RegisterComponent from './Components/RegisterComponent';
import Dashboard from './Components/Dashboard';
import Settings from './Components/Settings';

class App extends React.Component {
  
  render() {
    return (
      <Router>
        <Route path="/login" component={LoginComponent} />
        <Route path="/register" component={RegisterComponent} />
        <Route path="/settings" component={Settings} />
        <Route exact path="/" component={Dashboard} />
      </Router>
    )
  }
}

export default App;
