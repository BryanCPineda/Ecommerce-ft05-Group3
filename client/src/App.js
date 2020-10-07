

import logo from './logo.svg';
import './App.css';

import SearchBar from './components/SearchBar/SearchBar.jsx';


import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <div>

      <SearchBar />
     

      <Router>
        {"aca va la navbar"}
        <Switch>
          <Route exact path="/" component={HomeScreen} />
        </Switch>
        {"aca va el footer"}
      </Router>

    </div>
  );
}

export default App;
