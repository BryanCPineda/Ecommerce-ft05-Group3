
import React from "react";
import "./App.css";
import logo from './logo.svg';
import ProductCard2 from "./components/ProductCard2";
import SearchBar from './components/SearchBar/SearchBar.jsx';
import Product from "./components/Product"




import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./components/HomeScreen";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";




function App() {


  return (
    <div>
      <SearchBar />
      <ProductCard2/>
      <Router>
        {"aca va la navbar"}
        <Switch>
          <Route exact path="/" component={HomeScreen} />
          <Route path="/product/:id" component={Product}/>
        </Switch>
        {"aca va el footer"}
      
      </Router>

    </div>
  );

}

export default App;
