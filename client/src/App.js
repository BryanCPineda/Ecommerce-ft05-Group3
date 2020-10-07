
import React from "react";
import "./App.css";

import ProductCard2 from "./components/ProductCard2";


import SearchBar from './components/SearchBar/SearchBar.jsx';


import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./components/HomeScreen";
import FormCategories from './components/FormCategories/FormCategories';
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
          <Route exact path="/admin/createCategories" component={FormCategories} />
        </Switch>
        {"aca va el footer"}
      </Router>

    </div>
  );

}

export default App;
