
import React from "react";
import "./App.css";

import SearchBar from './components/SearchBar/SearchBar.jsx';
import Product from "./components/Product"




import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./components/HomeScreen";
import FormCategories from './components/FormCategories/FormCategories';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import data from "./data"



function App() {

  // let mapeo = data.products.map(ele => ele.id == props.match.params.id)
  //  console.log()
  return (
    <div>
      <SearchBar />
      {/* <ProductCard2/> */}
      <Router>
        
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
